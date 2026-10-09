import { describe, expect, it } from 'vitest';
import { clamp, ordersRange, simulate } from '@/lib/simulator/calc';
import { inputs } from '@/lib/simulator/config';
import { formatMoney } from '@/lib/format';

describe('simulador (PRD 8.3)', () => {
  it('reproduz o exemplo com os padrões', () => {
    const r = simulate({
      orders: inputs.orders.default,
      ticket: inputs.ticket.default,
      rate: inputs.rate.default,
    });
    expect(r.withWhatsapp).toBe(1200);
    expect(r.accepted).toBe(300);
    expect(r.boughtAgain).toBeCloseTo(36, 10);
    expect(r.revenue).toBeCloseTo(5400, 10);
    expect(r.lookupCost).toBe(600);
    expect(r.utilityCost).toBe(42);
    expect(r.marketingCost).toBe(193.02);
    expect(r.totalCost).toBe(835.02);
    expect(formatMoney(r.totalCost)).toBe('R$ 835,02');
    expect(r.perReal.toFixed(2)).toBe('6.47');
  });

  it('mapeia pedidos por mês para a faixa do formulário', () => {
    expect(ordersRange(200)).toBe('ate_300');
    expect(ordersRange(300)).toBe('ate_300');
    expect(ordersRange(2000)).toBe('1000_3000');
    expect(ordersRange(10000)).toBe('3000_10000');
    expect(ordersRange(30000)).toBe('10000_mais');
  });

  it('limita e arredonda ao passo', () => {
    expect(clamp(50, 200, 30000, 100)).toBe(200);
    expect(clamp(2049, 200, 30000, 100)).toBe(2000);
    expect(clamp(99999, 200, 30000, 100)).toBe(30000);
    expect(clamp(3.3, 1, 8, 0.5)).toBe(3.5);
    expect(clamp(Number.NaN, 1, 8, 0.5)).toBe(1);
  });
});
