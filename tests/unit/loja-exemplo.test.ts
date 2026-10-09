import { describe, expect, it } from 'vitest';
import {
  WHATSAPP_MARKETING_PRICE,
  bulkSend,
  customer,
  customerAvgTicket,
  customerOrders,
  customerTotal,
  dashboard,
  percent,
} from '@/lib/mock/loja-exemplo';
import { formatMoney } from '@/lib/format';

describe('lib/mock/loja-exemplo.ts — os números fecham (PRD 7.5)', () => {
  it('as barras de vendas por semana somam R$ 4.820', () => {
    expect(dashboard.weeklySales.reduce((a, b) => a + b, 0)).toBe(4820);
    expect(dashboard.revenue.value).toBe(4820);
    expect(dashboard.revenue.value - dashboard.revenue.previousMonth).toBe(920);
  });

  it('os 6 pedidos da Maria somam R$ 842,30', () => {
    expect(customerOrders).toHaveLength(6);
    expect(customerTotal).toBe(842.3);
    expect(formatMoney(customerAvgTicket)).toBe('R$ 140,38');
  });

  it('R$ 398,91 = 1.240 × R$ 0,3217 arredondado', () => {
    const cost = Math.round(bulkSend.recipients * WHATSAPP_MARKETING_PRICE * 100) / 100;
    expect(cost).toBe(bulkSend.estimatedCost);
  });

  it('percentuais do Início batem com as contagens', () => {
    expect(percent(dashboard.withWhatsapp.count, dashboard.customers.total)).toBe(68);
    expect(percent(dashboard.acceptedNews.count, dashboard.customers.total)).toBe(27);
    expect(dashboard.funnel[0]?.value).toBe(dashboard.customers.total);
    expect(dashboard.funnel[1]?.value).toBe(dashboard.withWhatsapp.count);
    expect(dashboard.funnel[3]?.value).toBe(dashboard.acceptedNews.count);
  });

  it('o funil só diminui', () => {
    const values = dashboard.funnel.map((step) => step.value);
    expect([...values].sort((a, b) => b - a)).toEqual(values);
  });

  it('linha do tempo da Maria está em ordem (mais recente no topo)', () => {
    const dates = customer.timeline.map((event) => event.date);
    expect([...dates].sort().reverse()).toEqual(dates);
    expect(customer.timeline[0]?.date).toBe(customer.lastPurchase);
  });
});
