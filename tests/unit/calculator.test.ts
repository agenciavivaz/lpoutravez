import { describe, expect, it } from 'vitest';
import {
  ASSUMPTIONS,
  INPUTS,
  SLIDER_STEPS,
  calculate,
  clampInput,
  formatCompactMoney,
  formatPercent,
  fromSlider,
  ordersRange,
  toSlider,
  type CategoryId,
} from '@/lib/calculator';

/** Tabela da PRD v2 8.5. Tolerância ±1 real; contagens arredondadas. */
const CASES: {
  orders: number;
  ticket: number;
  category: CategoryId;
  ownChannel: number;
  revenue12m: number;
  revenueMonth: number;
  pct: string;
  customersBack: number;
  extraOrders: number;
  commission: number;
}[] = [
  {
    orders: 2000,
    ticket: 150,
    category: 'media',
    ownChannel: 20,
    revenue12m: 230247,
    revenueMonth: 19187,
    pct: '6,4%',
    customersBack: 1279,
    extraOrders: 1535,
    commission: 7368,
  },
  {
    orders: 2000,
    ticket: 150,
    category: 'suplementos',
    ownChannel: 20,
    revenue12m: 295974,
    revenueMonth: 24664,
    pct: '8,2%',
    customersBack: 1315,
    extraOrders: 1973,
    commission: 9471,
  },
  {
    orders: 500,
    ticket: 90,
    category: 'beleza',
    ownChannel: 20,
    revenue12m: 31720,
    revenueMonth: 2643,
    pct: '5,9%',
    customersBack: 294,
    extraOrders: 352,
    commission: 1015,
  },
  {
    orders: 5000,
    ticket: 60,
    category: 'reposicao',
    ownChannel: 30,
    revenue12m: 408240,
    revenueMonth: 34020,
    pct: '11,3%',
    customersBack: 4536,
    extraOrders: 6804,
    commission: 19596,
  },
  {
    orders: 1000,
    ticket: 800,
    category: 'alto_valor',
    ownChannel: 0,
    revenue12m: 179626,
    revenueMonth: 14969,
    pct: '1,9%',
    customersBack: 225,
    extraOrders: 225,
    commission: 0,
  },
];

describe('calculadora (PRD v2 8.5)', () => {
  for (const c of CASES) {
    it(`${c.orders} pedidos × R$ ${c.ticket}, ${c.category}, canal ${c.ownChannel}%`, () => {
      const r = calculate(c);
      expect(Math.abs(r.revenue12m - c.revenue12m)).toBeLessThanOrEqual(1);
      expect(Math.abs(r.revenueMonth - c.revenueMonth)).toBeLessThanOrEqual(1);
      expect(formatPercent(r.shareOfRevenue)).toBe(c.pct);
      expect(Math.round(r.customersBack)).toBe(c.customersBack);
      expect(Math.round(r.extraOrders)).toBe(c.extraOrders);
      expect(Math.abs(r.commissionKept - c.commission)).toBeLessThanOrEqual(1);
      expect(r.capped).toBe(false);
    });
  }

  it('limita a receita a 12% do faturamento anual', () => {
    const r = calculate(
      { orders: 1000, ticket: 100, category: 'reposicao', ownChannel: 0 },
      { ...ASSUMPTIONS, capture: 1 },
    );
    expect(r.capped).toBe(true);
    expect(r.shareOfRevenue).toBeCloseTo(0.12, 10);
    expect(r.revenue12m).toBeCloseTo(1000 * 12 * 100 * 0.12, 6);
  });

  it('com as premissas atuais nenhuma categoria passa de 12%', () => {
    for (const category of ['media', 'suplementos', 'beleza', 'reposicao', 'alto_valor'] as const) {
      expect(calculate({ orders: 2000, ticket: 150, category, ownChannel: 0 }).capped).toBe(false);
    }
  });

  it('padrões da tela: 2.000 pedidos, R$ 150, média, canal desligado', () => {
    expect(INPUTS.orders.default).toBe(2000);
    expect(INPUTS.ticket.default).toBe(150);
    expect(INPUTS.category.default).toBe('media');
    expect(INPUTS.ownChannel.default).toBe(0);
    expect(INPUTS.ownChannel.defaultWhenOn).toBe(20);
  });
});

describe('slider logarítmico', () => {
  const { min, max } = INPUTS.orders;
  it('vai das pontas e volta', () => {
    expect(toSlider(min, min, max)).toBe(0);
    expect(toSlider(max, min, max)).toBe(SLIDER_STEPS);
    expect(fromSlider(0, min, max)).toBe(min);
    expect(fromSlider(SLIDER_STEPS, min, max)).toBe(max);
  });
  it('2.000 pedidos fica longe da esquerda (log, não linear)', () => {
    expect(toSlider(2000, min, max) / SLIDER_STEPS).toBeGreaterThan(0.45);
  });
  it('ida e volta em 2.000 e R$ 150 devolve o mesmo valor', () => {
    expect(fromSlider(toSlider(2000, min, max), min, max)).toBe(2000);
    const t = INPUTS.ticket;
    expect(fromSlider(toSlider(150, t.min, t.max), t.min, t.max)).toBe(150);
  });
  it('limita o que é digitado', () => {
    expect(clampInput(50, min, max)).toBe(100);
    expect(clampInput(99999, min, max)).toBe(50000);
    expect(clampInput(Number.NaN, min, max)).toBe(100);
  });
});

describe('formato', () => {
  it('dinheiro compacto', () => {
    expect(formatCompactMoney(230247)).toBe('R$ 230 mil');
    expect(formatCompactMoney(19187)).toBe('R$ 19 mil');
    expect(formatCompactMoney(2643)).toBe('R$ 2,6 mil');
    expect(formatCompactMoney(998_400)).toBe('R$ 998 mil');
    expect(formatCompactMoney(1_234_000)).toBe('R$ 1,2 mi');
    expect(formatCompactMoney(850)).toBe('R$ 850');
  });
  it('faixa do formulário', () => {
    expect(ordersRange(100)).toBe('ate_300');
    expect(ordersRange(2000)).toBe('1000_3000');
    expect(ordersRange(50000)).toBe('10000_mais');
  });
});
