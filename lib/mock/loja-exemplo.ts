/**
 * Loja de exemplo do tour "Conheça por dentro" e do hero (PRD_LP 7.5).
 * Os números FECHAM entre si: tests/unit/loja-exemplo.test.ts confere. Não altere um sem
 * ajustar os outros. Textos de interface do produto seguem o PRD do app (seções 14.2 a 14.10).
 * Toda tela que usa estes dados leva o rótulo "Dados de uma loja de exemplo."
 */

export type Channel = 'Mercado Livre' | 'Shopee' | 'Amazon';

export const store = {
  name: 'Casa Lavanda',
  user: 'Diego',
  channels: ['Mercado Livre', 'Shopee', 'Amazon'] as Channel[],
  period: 'Últimos 30 dias',
} as const;

/** Navegação do app (design-system-v2.html, telas de referência). */
export const appNav = {
  sidebar: ['Início', 'Clientes', 'Réguas', 'Envios', 'Integrações', 'Configurações'],
  bottom: ['Início', 'Clientes', 'Réguas', 'Envios', 'Mais'],
} as const;

// --- Aba 1: Início ---
export const dashboard = {
  pageLabel: 'Início',
  greeting: 'Bom dia, Diego',
  addCredits: 'Adicionar créditos',
  revenue: { label: 'Vendas geradas pelo Outra Vez', value: 4820, previousMonth: 3900 },
  customers: { label: 'Clientes', total: 3214, newInPeriod: 184 },
  withWhatsapp: { label: 'Com WhatsApp', count: 2186 },
  acceptedNews: { label: 'Aceitaram novidades', count: 868 },
  funnel: [
    { label: 'Clientes', value: 3214 },
    { label: 'Com WhatsApp', value: 2186 },
    { label: 'Contatados', value: 1902 },
    { label: 'Aceitaram novidades', value: 868 },
    { label: 'Clicaram', value: 241 },
    { label: 'Compraram de novo', value: 37 },
  ],
  funnelTitle: 'Do WhatsApp encontrado à recompra',
  weeklySalesTitle: 'Vendas por semana',
  weeklySales: [410, 560, 520, 790, 690, 930, 920],
  opportunity: {
    eyebrow: 'Oportunidade',
    count: 312,
    product: 'Kit Refil',
    title: '312 clientes na hora de repor o Kit Refil',
    text: 'Clientes cuja próxima compra prevista está chegando.',
    action: 'Ver clientes',
  },
  credits: { balance: 1380, days: 21, label: 'Créditos' },
  integrations: [
    { name: 'Bling', status: 'connected' as const },
    { name: 'WhatsApp', status: 'connected' as const },
  ],
} as const;

export function percent(part: number, total: number): number {
  return Math.round((part / total) * 100);
}

// --- Aba 2: Clientes ---
export type TimelineEvent = {
  date: string; // ISO yyyy-mm-dd
  kind: 'repurchase' | 'click' | 'message' | 'order' | 'consent';
  title: string;
  channel?: Channel;
  product?: string;
  amount?: number;
  /** Nome do template de WhatsApp. */
  template?: string;
  detail?: string;
};

export const customer = {
  pageLabel: 'Cliente',
  name: 'Maria Silva',
  cpfMasked: '***.456.789-**',
  city: 'Campinas/SP',
  channels: ['Mercado Livre', 'Shopee'] as Channel[],
  rfm: 'Leais',
  consent: 'opted_in' as const,
  whatsappMasked: '(19) 9••••-4321',
  whatsappSource: 'Busca de WhatsApp',
  lastPurchase: '2026-09-04',
  nextPurchase: '2026-10-19',
  labels: {
    totalSpent: 'Total gasto',
    orders: 'Pedidos',
    avgTicket: 'Ticket médio',
    lastPurchase: 'Última compra',
    nextPurchase: 'Próxima compra prevista',
    whatsapp: 'WhatsApp',
    source: 'origem',
    history: 'Histórico',
  },
  // Mais recente no topo.
  timeline: [
    {
      date: '2026-09-04',
      kind: 'repurchase',
      title: 'Comprou de novo',
      channel: 'Shopee',
      product: 'Kit Refil Lavanda',
      amount: 149.9,
    },
    { date: '2026-09-03', kind: 'click', title: 'Clicou em "Ver produto"' },
    {
      date: '2026-09-02',
      kind: 'message',
      title: 'Mensagem enviada',
      template: 'hora_de_repor',
      detail: 'lida',
    },
    {
      date: '2026-07-23',
      kind: 'order',
      title: 'Pedido',
      channel: 'Mercado Livre',
      product: 'Kit Refil Lavanda',
      amount: 129.9,
    },
    {
      date: '2026-06-14',
      kind: 'order',
      title: 'Pedido',
      channel: 'Mercado Livre',
      product: 'Vela Aromática',
      amount: 125.9,
    },
    {
      date: '2026-05-15',
      kind: 'order',
      title: 'Pedido',
      channel: 'Shopee',
      product: 'Difusor 250 ml',
      amount: 189.9,
    },
    {
      date: '2026-04-18',
      kind: 'order',
      title: 'Pedido',
      channel: 'Shopee',
      product: 'Kit Refil Lavanda',
      amount: 126.8,
    },
    { date: '2026-03-14', kind: 'consent', title: 'Aceitou novidades' },
    {
      date: '2026-03-14',
      kind: 'message',
      title: 'Mensagem enviada',
      template: 'pedido_faturado_optin',
      detail: 'lida',
    },
    {
      date: '2026-03-12',
      kind: 'order',
      title: 'Primeiro pedido',
      channel: 'Mercado Livre',
      product: 'Kit Refil Lavanda',
      amount: 119.9,
    },
  ] satisfies TimelineEvent[],
};

/** Pedidos da Maria (inclui a recompra). Somam R$ 842,30. */
export const customerOrders = customer.timeline.filter(
  (event) => event.kind === 'order' || event.kind === 'repurchase',
);
export const customerTotal =
  Math.round(customerOrders.reduce((sum, e) => sum + (e.amount ?? 0), 0) * 100) / 100;
export const customerAvgTicket = Math.round((customerTotal / customerOrders.length) * 100) / 100;

// --- Aba 3: Réguas ---
export const journey = {
  pageLabel: 'Régua',
  title: 'Reposição: Kit Refil',
  status: 'Ligada',
  pause: 'Pausar régua',
  trigger: { type: 'Gatilho', text: 'Quando estiver perto da próxima compra prevista' },
  steps: [
    { type: 'Esperar', text: '0 dias' },
    { type: 'Condição', text: 'Aceitou novidades?', yes: 'Sim → segue', no: 'Não → Sair' },
    { type: 'Enviar', text: '"hora_de_repor"' },
    { type: 'Sair', text: 'Ao comprar' },
  ],
  inJourney: 312,
  boughtAgain30d: 29,
  sendWindow: '9h às 20h',
  labels: {
    inJourney: 'clientes na régua',
    boughtAgain: 'compraram de novo nos últimos 30 dias',
    sendWindow: 'Horário de envio',
  },
} as const;

// --- Aba 4: WhatsApp (PRD do app 14.10, com as variáveis da loja de exemplo) ---
export const whatsapp = {
  firstName: 'Maria',
  product: 'Kit Refil Lavanda',
  cycleDays: 45,
  pedidoFaturadoOptin: [
    'Oi, Maria! Aqui é da Casa Lavanda.',
    'Seu pedido Kit Refil Lavanda foi faturado e já está seguindo para entrega.',
    'Se tiver qualquer problema com a entrega, é só responder esta mensagem.',
    'Você também quer receber dicas e ofertas da Casa Lavanda por aqui?',
  ],
  optinButtons: ['Quero receber', 'Não, obrigado'],
  customerReply: 'Quero receber',
  autoReply:
    'Combinado, Maria! Vamos mandar só o que vale a pena. Se quiser parar, é só enviar SAIR.',
  horaDeRepor: [
    'Oi, Maria! O Kit Refil Lavanda que você comprou costuma durar cerca de 45 dias. Já está na hora de repor?',
    'Ele está aqui na nossa loja: link do produto',
    'Para não receber mais, responda SAIR.',
  ],
  horaDeReporButton: 'Ver produto',
  daysLater: '42 dias depois',
} as const;

// --- Aba 5: Envio em massa (PRD do app 14.7) ---
export const WHATSAPP_MARKETING_PRICE = 0.3217;

export const bulkSend = {
  pageLabel: 'Envios em massa',
  template: 'sentimos_sua_falta',
  recipients: 1240,
  excluded: 316,
  /** 1.240 × R$ 0,3217 = R$ 398,908 → R$ 398,91 */
  estimatedCost: 398.91,
  confirm: 'Enviar para 1.240 clientes',
  back: 'Voltar e revisar',
} as const;

// --- Aba 6: Bling (PRD do app 14.3) ---
export const onboarding = {
  steps: ['Boas-vindas', 'Conectar Bling', 'Importando', 'Canais', 'WhatsApp', 'Primeira régua'],
  current: 3,
  title: 'Trazendo seus clientes',
  import: [
    { label: 'Lendo seus contatos do Bling…', status: 'done' as const },
    {
      label: 'Importando pedidos dos últimos 30 dias…',
      status: 'running' as const,
      done: 1284,
      total: 2010,
    },
    { label: 'Últimos 90 dias', status: 'pending' as const },
    { label: 'Histórico completo', status: 'pending' as const },
  ],
  ready: 'Pronto para começar. O restante do histórico continua carregando em segundo plano.',
  action: 'Ver meus clientes',
  labels: { step: 'Passo', of: 'de', done: 'concluído' },
} as const;
