import { assumptions as defaults, type Assumptions } from './config';

export type SimulatorInput = {
  /** Pedidos por mês. */
  orders: number;
  /** Ticket médio em R$. */
  ticket: number;
  /** Clientes que compram de novo depois das réguas, em % (ex.: 3). */
  rate: number;
};

export type SimulatorResult = {
  withWhatsapp: number;
  accepted: number;
  boughtAgain: number;
  revenue: number;
  lookupCost: number;
  utilityCost: number;
  marketingCost: number;
  totalCost: number;
  /** Vendas para cada R$ 1 investido. */
  perReal: number;
};

const cents = (value: number) => Math.round(value * 100) / 100;

/** Contas do PRD_LP 8.3. */
export function simulate(input: SimulatorInput, a: Assumptions = defaults): SimulatorResult {
  const withWhatsapp = input.orders * a.whatsappFound;
  const accepted = withWhatsapp * a.acceptNews;
  const boughtAgain = withWhatsapp * (input.rate / 100);
  const revenue = boughtAgain * input.ticket;

  const lookupCost = cents(input.orders * a.lookupPrice);
  const utilityCost = cents(withWhatsapp * a.utilityMessagePrice);
  const marketingCost = cents(accepted * a.marketingMessagesPerMonth * a.marketingMessagePrice);
  const totalCost = cents(lookupCost + utilityCost + marketingCost);

  return {
    withWhatsapp,
    accepted,
    boughtAgain,
    revenue,
    lookupCost,
    utilityCost,
    marketingCost,
    totalCost,
    perReal: totalCost > 0 ? revenue / totalCost : 0,
  };
}

export type OrdersRange = 'ate_300' | '300_1000' | '1000_3000' | '3000_10000' | '10000_mais';

/** Faixa do formulário (etapa 2) a partir dos pedidos por mês do simulador. */
export function ordersRange(orders: number): OrdersRange {
  if (orders <= 300) return 'ate_300';
  if (orders <= 1000) return '300_1000';
  if (orders <= 3000) return '1000_3000';
  if (orders <= 10000) return '3000_10000';
  return '10000_mais';
}

export function clamp(value: number, min: number, max: number, step: number): number {
  if (!Number.isFinite(value)) return min;
  const stepped = Math.round((value - min) / step) * step + min;
  return Math.min(max, Math.max(min, Math.round(stepped * 100) / 100));
}

/** Chave do sessionStorage que leva os valores do simulador para o formulário (PRD 8.4). */
export const SIMULATOR_SNAPSHOT_KEY = 'ov_simulator_snapshot';
