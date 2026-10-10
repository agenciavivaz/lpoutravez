import { copy } from '@/lib/copy/pt-BR';
import {
  bulkSend,
  customer,
  customerTotal,
  dashboard,
  journey,
  onboarding,
  percent,
} from '@/lib/mock/loja-exemplo';
import { formatMoney, formatNumber } from '@/lib/format';

export type TabId = (typeof copy.tour.tabs)[number]['id'];
export type Device = 'mobile' | 'desktop';
export type Theme = 'light' | 'dark';
export type Position = { x: number; y: number };

export const TABS = copy.tour.tabs;

/**
 * Posição dos marcadores ①②③ em % da área da tela, por aba e por moldura (PRD 7.2).
 * A aba WhatsApp é sempre celular.
 */
export const HOTSPOTS: Record<TabId, { desktop: Position[]; mobile: Position[] }> = {
  inicio: {
    desktop: [
      { x: 36.4, y: 12.6 },
      { x: 63.7, y: 58.5 },
      { x: 96.6, y: 30.2 },
    ],
    mobile: [
      { x: 90, y: 15.5 },
      { x: 90, y: 66.5 },
      { x: 90, y: 47.5 },
    ],
  },
  clientes: {
    desktop: [
      { x: 44.6, y: 15.3 },
      { x: 29.1, y: 20.1 },
      { x: 96.6, y: 20.5 },
    ],
    mobile: [
      { x: 74, y: 18.3 },
      { x: 48, y: 26.6 },
      { x: 94, y: 56 },
    ],
  },
  reguas: {
    desktop: [
      { x: 55.8, y: 16.5 },
      { x: 55.8, y: 35 },
      { x: 55.8, y: 56 },
    ],
    mobile: [
      { x: 90, y: 23 },
      { x: 90, y: 47 },
      { x: 90, y: 71 },
    ],
  },
  whatsapp: {
    desktop: [],
    mobile: [
      { x: 90, y: 13 },
      { x: 90, y: 32 },
      { x: 90, y: 70.5 },
    ],
  },
  envio: {
    desktop: [
      { x: 75, y: 41.8 },
      { x: 41.2, y: 47 },
      { x: 75.5, y: 49.7 },
    ],
    mobile: [
      { x: 92.7, y: 57.3 },
      { x: 92.7, y: 64.2 },
      { x: 92.7, y: 69.7 },
    ],
  },
  bling: {
    desktop: [
      { x: 24.6, y: 14.9 },
      { x: 61.2, y: 19 },
      { x: 85.8, y: 38.4 },
    ],
    mobile: [
      { x: 94, y: 9 },
      { x: 90, y: 29.7 },
      { x: 94, y: 51.5 },
    ],
  },
};

/** A aba usa moldura de celular mesmo com "Computador" ativo? */
export function alwaysPhone(tab: TabId): boolean {
  return tab === 'whatsapp';
}

/** Descrição completa de cada tela para o aria-label da moldura (PRD 7.3). */
export function describeScreen(tabId: TabId): string {
  const tab = TABS.find((t) => t.id === tabId)!;
  const intro = `${tab.title} ${tab.text}`;
  const d = dashboard;
  const numbers: Record<TabId, string> = {
    inicio: `${d.revenue.label}: ${formatMoney(d.revenue.value)}. ${d.customers.label}: ${formatNumber(d.customers.total)}. ${d.withWhatsapp.label}: ${percent(d.withWhatsapp.count, d.customers.total)}%. ${d.acceptedNews.label}: ${percent(d.acceptedNews.count, d.customers.total)}%. ${d.opportunity.title}.`,
    clientes: `${customer.name}, ${customer.city}. ${customer.channels.join(' e ')}. ${customer.labels.totalSpent}: ${formatMoney(customerTotal)}. Última compra: Comprou de novo na Shopee, Kit Refil Lavanda.`,
    reguas: `${journey.title}, ${journey.status}. ${formatNumber(journey.inJourney)} ${journey.labels.inJourney}; ${journey.boughtAgain30d} ${journey.labels.boughtAgain}.`,
    whatsapp:
      'Conversa da Casa Lavanda com Maria: aviso do pedido faturado com os botões Quero receber e Não, obrigado; Maria responde Quero receber; 42 dias depois, aviso de reposição do Kit Refil Lavanda com o botão Ver produto.',
    envio: `Enviar "${bulkSend.template}" para ${formatNumber(bulkSend.recipients)} clientes? Custo estimado no WhatsApp: ${formatMoney(bulkSend.estimatedCost)}. ${bulkSend.excluded} clientes ficam de fora.`,
    bling: `${onboarding.title}: passo ${onboarding.current} de ${onboarding.steps.length}. ${onboarding.ready}`,
  };
  return `${intro} ${numbers[tabId]} ${copy.tour.sampleLabel}`;
}
