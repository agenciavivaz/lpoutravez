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
  // ADR-LP-14: PRD v2 usa "segmento" (5.2 e FAQ 4); o glossário do DS manda "lista de clientes".
  'Por produto, margem ou lista de clientes',
  'Você escolhe. O padrão é o seu anúncio no marketplace. Se você tem loja virtual ou vende pelo WhatsApp, pode levar clientes que aceitaram novidades para o seu canal, por produto ou por lista de clientes.',
  // ADR-LP-14: linha da comparação reescrita sem "a partir da nota" (PRD v2 5.1, "O que NÃO dizer").
  'Encontra um contato válido para cada comprador',
  // ADR-LP-14: passo 2 da demo sem restringir ao Bling (PRD v2 6).
  'Da conexão com o ERP até a primeira venda que volta.',
  // ADR-LP-14: hero com nome de loja fictícia (PRD v2 9.2, "Casa Lavanda").
  'Oi, Maria! Aqui é da Casa Lavanda. Seu pedido Kit Refil Lavanda foi faturado e já está seguindo para entrega. Se tiver qualquer problema com a entrega, é só responder esta mensagem. Você também quer receber dicas e ofertas da Casa Lavanda por aqui?',
  // ADR-LP-14: título da aba Envio usa o benefício "Custo antes de enviar." da antiga "O que muda".
  'Você vê quanto o WhatsApp vai cobrar e quantos clientes ficam de fora antes de confirmar qualquer envio em massa.',
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

  it('não tem travessão (PRD v2 4.2)', () => {
    for (const text of glossaryStrings) expect(text, text).not.toMatch(/[\u2013\u2014]/);
  });

  it('não usa padrões proibidos da PRD v2 4.2 e 13', () => {
    const all = strings.join('\n');
    expect(all).not.toMatch(/Não precisava ser assim/);
    expect(all).not.toMatch(/\bjornada\b/i);
    expect(all).not.toMatch(/integração nativa/i);
    expect(all.match(/no automático/gi) ?? []).toHaveLength(0);
    expect(all.match(/na demo mostramos/gi)?.length ?? 0).toBeLessThanOrEqual(2);
  });

  it('todo texto visível existe literalmente no PRD (v2, ou v1 onde o v2 não redefine)', () => {
    const prd =
      readFileSync(join(process.cwd(), 'docs/PRD_LP_v2.md'), 'utf8') +
      readFileSync(join(process.cwd(), 'docs/PRD_LP.md'), 'utf8');
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
      'storeName',
      'cnpj',
    ]);
    const missing: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === 'string') {
        // Títulos ganham ponto final na página; no PRD às vezes aparecem sem ele, entre aspas.
        const bare = value.replace(/\.$/, '');
        if (value.trim() && !prd.includes(value) && !prd.includes(bare) && !DEVIATIONS.has(value))
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

  it('o H1 é o slogan', () => {
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
