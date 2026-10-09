import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { copy, fill } from '@/lib/copy/pt-BR';
import { privacy, terms } from '@/lib/copy/legal';

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

const strings = allStrings(copy);
/** Textos legais: não precisam estar no PRD, mas seguem glossário e tom (4.4 e 4.5). */
const glossaryStrings = [...strings, ...allStrings(privacy), ...allStrings(terms)];

/** Desvios conscientes do texto do PRD, cada um registrado em docs/adr/. */
const DEVIATIONS = new Set([
  // ADR-LP-10: PRD 7.5 usa "segmento", proibido pelo glossário 4.5.
  'total gasto, pedidos e tipo de cliente.',
]);
const source = readFileSync(join(process.cwd(), 'lib/copy/pt-BR.ts'), 'utf8');

describe('lib/copy/pt-BR.ts', () => {
  it('não usa termos proibidos do glossário (PRD 4.5)', () => {
    const forbidden = [
      /\blead(s)?\b/i,
      /\bopt-?in\b/i,
      /enriquecimento/i,
      /\benrichment\b/i,
      /convers[ãa]o|conversões|\bconversion\b/i,
      /\bjourney\b/i,
      /\bsegment(o|os|ation)?\b/i,
      /CRM de funil/i,
      /\bgrowth\b/i,
    ];
    for (const text of glossaryStrings) {
      for (const pattern of forbidden) {
        expect(text, `"${text}" contém ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it('não tem emoji nem exclamação fora de comemoração (PRD 4.4)', () => {
    // As únicas exclamações permitidas são as saudações das mensagens de WhatsApp da loja de exemplo.
    const allowed = /^(Oi, Maria!|Combinado, Maria!)/;
    for (const text of strings) {
      expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
      if (text.includes('!')) expect(text, text).toMatch(allowed);
    }
  });

  it('não cita marcas de concorrentes nem números de prova social', () => {
    expect(source).not.toMatch(/\+\s?\d+\s*sellers/i);
    expect(source).not.toMatch(/depoimento/i);
  });

  it('todo texto visível existe literalmente no PRD (seções 6, 12.1 e 13)', () => {
    const prd = readFileSync(join(process.cwd(), 'docs/PRD_LP.md'), 'utf8');
    // Chaves que não são texto do PRD: ícones, ids, âncoras, valores internos e rótulos de acessibilidade.
    const skipKeys = new Set([
      'icon',
      'id',
      'href',
      'value',
      'kind',
      'cells',
      'a11y',
      'ui',
      'whatsappMessage',
    ]);
    const missing: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === 'string') {
        if (value.trim() && !prd.includes(value) && !DEVIATIONS.has(value))
          missing.push(`${path}: "${value}"`);
        return;
      }
      if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${path}[${i}]`));
      if (value && typeof value === 'object') {
        for (const [key, v] of Object.entries(value)) {
          if (!skipKeys.has(key)) walk(v, path ? `${path}.${key}` : key);
        }
      }
    };
    walk(copy, '');
    expect(missing).toEqual([]);
    // No PRD a mensagem do WhatsApp aparece já codificada na URL.
    expect(prd).toContain(encodeURIComponent(copy.finalCta.whatsappMessage));
  });

  it('cards de número leem como no PRD', () => {
    const prd = readFileSync(join(process.cwd(), 'docs/PRD_LP.md'), 'utf8');
    for (const card of copy.benefits.cards) {
      if (card.kind !== 'icon') expect(prd).toContain(`${card.number} ${card.title}`);
    }
    expect(`${copy.hero.h1Before}${copy.hero.h1Highlight}`).toBe(copy.meta.slogan);
  });
});

describe('fill', () => {
  it('substitui chaves conhecidas e mantém as desconhecidas', () => {
    expect(fill('{data} às {hora}', { data: '20/10/2026', hora: '14:30' })).toBe(
      '20/10/2026 às 14:30',
    );
    expect(fill('CNPJ {cnpj}', {})).toBe('CNPJ {cnpj}');
  });
});
