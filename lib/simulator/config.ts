/**
 * Premissas e faixas do simulador "Quanto pode voltar" (PRD_LP 8.1 e 8.2).
 * Editáveis pelo Diego. Aparecem para o visitante em "Ver as contas".
 * [confirmar Diego] preço do crédito e preços da Meta antes de publicar (PRD 17, pergunta 8).
 */

export const inputs = {
  orders: { default: 2000, min: 200, max: 30000, step: 100 },
  ticket: { default: 150, min: 30, max: 1000, step: 10 },
  /** Em %, ex.: 3 = 3%. */
  rate: { default: 3, min: 1, max: 8, step: 0.5 },
} as const;

export const assumptions = {
  /** Clientes com WhatsApp encontrado (meta do PRD do produto). */
  whatsappFound: 0.6,
  /** Clientes que aceitam novidades (meta do PRD do produto). */
  acceptNews: 0.25,
  /** Preço da Busca de WhatsApp por cliente (sugestão de preço do crédito). */
  lookupPrice: 0.3,
  /** Mensagem de aviso do pedido (tabela Meta Brasil — verificar antes de publicar). */
  utilityMessagePrice: 0.035,
  /** Mensagem de novidade (tabela Meta Brasil — verificar antes de publicar). */
  marketingMessagePrice: 0.3217,
  /** Mensagens de novidade por cliente que aceitou, por mês (régua padrão). */
  marketingMessagesPerMonth: 2,
} as const;

export type Assumptions = typeof assumptions;
