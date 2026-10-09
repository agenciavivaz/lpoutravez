import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { copy, fill } from '@/lib/copy/pt-BR';

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

const strings = allStrings(copy);
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
    for (const text of strings) {
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

  it('mantém textos-chave da seção 6 exatamente como no PRD', () => {
    const prd = readFileSync(join(process.cwd(), 'docs/PRD_LP.md'), 'utf8');
    const exact = [
      copy.hero.eyebrow,
      copy.hero.subtitle,
      copy.hero.microcopy,
      copy.problem.h2,
      copy.howItWorks.h2,
      copy.tour.subtitle,
      copy.safety.subtitle,
      copy.simulator.disclaimer,
      copy.finalCta.h2,
      copy.footer.trademarks,
      ...copy.faq.items.map((item) => item.q),
    ];
    for (const text of exact) expect(prd, text).toContain(text);
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
