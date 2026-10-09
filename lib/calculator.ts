/**
 * Calculadora "Quanto pode voltar em um ano" (PRD v2 seção 8). Função pura: sem estado, sem DOM.
 * Premissas e faixas ficam nos objetos exportados e aparecem para o visitante em "Ver as contas".
 * [validar] `capture` (35%) é hipótese até termos dados dos primeiros clientes (PRD v2 12).
 */

export type CategoryId = 'media' | 'suplementos' | 'beleza' | 'reposicao' | 'alto_valor';

export type Category = {
  /** Taxa de recompra de loja própria usada como teto (0 a 1). */
  benchmark: number;
  /** Pedidos extras por cliente que volta, em 12 meses. */
  extras: number;
  source: string;
};

/** PRD v2 8.3. A ordem é a dos chips na tela. */
export const CATEGORIES: Record<CategoryId, Category> = {
  media: { benchmark: 0.282, extras: 1.2, source: 'Rivo/Opensend' },
  suplementos: { benchmark: 0.29, extras: 1.5, source: 'Rivo/Opensend' },
  beleza: { benchmark: 0.259, extras: 1.2, source: 'Rivo/Opensend' },
  reposicao: { benchmark: 0.4, extras: 1.5, source: 'Focus Digital: consumíveis acima de 40%' },
  alto_valor: { benchmark: 0.099, extras: 1.0, source: 'Rivo/Opensend' },
};

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

/** Premissas globais (PRD v2 8.3), editáveis só no código. */
export const ASSUMPTIONS = {
  /** Clientes únicos por pedido. */
  uniqueCustomers: 0.9,
  /** Compradores com contato válido encontrado. */
  validContact: 0.6,
  /** Parte do benchmark que o Outra Vez captura. Hipótese a validar. */
  capture: 0.35,
  /** Comissão média de marketplace evitada nas recompras no canal próprio. */
  commission: 0.16,
  /** Guard-rail: a receita nunca passa desta fração do faturamento anual. */
  maxShareOfRevenue: 0.12,
} as const;

export type Assumptions = Record<keyof typeof ASSUMPTIONS, number>;

/** Entradas (PRD v2 8.2). `ownChannel` em pontos percentuais (0 a 50). */
export const INPUTS = {
  orders: { min: 100, max: 50_000, default: 2_000 },
  ticket: { min: 20, max: 2_000, default: 150 },
  category: { default: 'media' as CategoryId },
  ownChannel: { min: 0, max: 50, step: 5, default: 0, defaultWhenOn: 20 },
} as const;

export type CalculatorInput = {
  orders: number;
  ticket: number;
  category: CategoryId;
  /** Recompras no seu canal, em % (0 a 50). 0 quando o toggle está desligado. */
  ownChannel: number;
};

export type CalculatorResult = {
  customersPerYear: number;
  reachable: number;
  returnRate: number;
  customersBack: number;
  extraOrders: number;
  revenue12m: number;
  revenueMonth: number;
  /** Fração do faturamento anual (0 a 1). */
  shareOfRevenue: number;
  commissionKept: number;
  /** O guard-rail de 12% foi aplicado. */
  capped: boolean;
};

/** Fórmula da PRD v2 8.4. */
export function calculate(
  input: CalculatorInput,
  a: Assumptions = ASSUMPTIONS,
  categories: Record<CategoryId, Category> = CATEGORIES,
): CalculatorResult {
  const category = categories[input.category] ?? categories.media;
  const customersPerYear = input.orders * 12 * a.uniqueCustomers;
  const reachable = customersPerYear * a.validContact;
  const returnRate = category.benchmark * a.capture;
  const customersBack = reachable * returnRate;
  const extraOrders = customersBack * category.extras;
  const yearlyRevenue = input.orders * 12 * input.ticket;

  let revenue12m = extraOrders * input.ticket;
  const cap = yearlyRevenue * a.maxShareOfRevenue;
  const capped = revenue12m > cap;
  if (capped) revenue12m = cap;

  return {
    customersPerYear,
    reachable,
    returnRate,
    customersBack,
    extraOrders,
    revenue12m,
    revenueMonth: revenue12m / 12,
    shareOfRevenue: yearlyRevenue > 0 ? revenue12m / yearlyRevenue : 0,
    commissionKept: revenue12m * (input.ownChannel / 100) * a.commission,
    capped,
  };
}

// --- Slider logarítmico (PRD v2 8.2) ---

/** Resolução do slider: posições inteiras de 0 a SLIDER_STEPS. */
export const SLIDER_STEPS = 1000;

/** Valor → posição do slider (escala log). */
export function toSlider(value: number, min: number, max: number): number {
  const v = Math.min(max, Math.max(min, value));
  return Math.round((Math.log(v / min) / Math.log(max / min)) * SLIDER_STEPS);
}

/** Posição do slider → valor "redondo" (escala log). */
export function fromSlider(position: number, min: number, max: number): number {
  const p = Math.min(SLIDER_STEPS, Math.max(0, position)) / SLIDER_STEPS;
  return Math.min(max, Math.max(min, niceRound(min * (max / min) ** p)));
}

/** Arredonda para números que uma pessoa digitaria: 37 → 37, 1.234 → 1.250, 23.456 → 23.500. */
export function niceRound(value: number): number {
  const step = value < 100 ? 1 : value < 1_000 ? 10 : value < 10_000 ? 50 : 500;
  return Math.round(value / step) * step;
}

/** Limita um número digitado à faixa; não finito vira o mínimo. */
export function clampInput(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

// --- Formato da saída (PRD v2 8.6) ---

const decimal1 = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
const integer = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });

/**
 * Dinheiro compacto: "R$ 230 mil", "R$ 2,6 mil", "R$ 1,2 mi", "R$ 850".
 * Até R$ 999 mil arredonda para "mil"; acima, "mi" com uma casa.
 */
export function formatCompactMoney(value: number): string {
  const v = Math.max(0, value);
  if (v >= 999_500) return `R$ ${decimal1.format(v / 1_000_000)} mi`;
  if (v >= 10_000) return `R$ ${integer.format(v / 1_000)} mil`;
  if (v >= 1_000) return `R$ ${decimal1.format(v / 1_000)} mil`;
  return `R$ ${integer.format(v)}`;
}

/** 0.064 → "6,4%". */
export function formatPercent(fraction: number): string {
  return `${decimal1.format(fraction * 100)}%`;
}

/** Chave do sessionStorage que leva os valores da calculadora para o formulário. */
export const CALCULATOR_SNAPSHOT_KEY = 'ov_calculator_snapshot';

export type CalculatorSnapshot = Pick<CalculatorInput, 'orders' | 'ticket' | 'category'>;

export type OrdersRange = 'ate_300' | '300_1000' | '1000_3000' | '3000_10000' | '10000_mais';

/** Faixa do formulário (etapa 2) a partir dos pedidos por mês da calculadora. */
export function ordersRange(orders: number): OrdersRange {
  if (orders <= 300) return 'ate_300';
  if (orders <= 1000) return '300_1000';
  if (orders <= 3000) return '1000_3000';
  if (orders <= 10000) return '3000_10000';
  return '10000_mais';
}

/** Fontes dos benchmarks e das comissões (PRD v2 2.3 e "Fontes"). Nomes próprios, não são copy. */
export const SOURCES = [
  { name: 'Rivo', url: 'https://rivo.io/blog/repeat-purchase-rate-complete-guide' },
  {
    name: 'Sender',
    url: 'https://www.sender.net/marketing-glossary/repeat-purchase-rate/statistics/',
  },
  { name: 'Focus Digital', url: 'https://focus-digital.co/average-returning-customer-percentage/' },
  { name: 'UpSeller', url: 'https://upseller.com/pt/blog-article-929' },
  { name: 'E-commerce na Prática', url: 'https://ecommercenapratica.com/blog/taxa-shopee/' },
  { name: 'YAV', url: 'https://yav.com.br/comissoes-marketplace/' },
] as const;
