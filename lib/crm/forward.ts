import 'server-only';

/**
 * Ponto único de saída dos pedidos de demo. A LP não guarda dados: tudo vai para o CRM.
 * Hoje: POST JSON para `DEMO_WEBHOOK_URL` (Make, DataCrazy ou o CRM), se estiver definida.
 * Quando o CRM tiver API própria, troque só esta função.
 */

export type DemoStatus = 'started' | 'qualified' | 'waitlist' | 'spam';

export type DemoRequestPayload = {
  request_id: string;
  status: DemoStatus;
  step: 1 | 2;
  submitted_at: string;
  contact: {
    name: string;
    whatsapp_e164: string;
    email: string;
    consent_contact: boolean;
    consent_text_version: string;
  };
  store?: {
    store_name: string;
    marketplaces: string[];
    orders_range: string;
    erp: string;
    erp_other: string | null;
    /** Campos ocultos da calculadora, quando a pessoa veio por ela. */
    calculator: { calc_pedidos: number; calc_ticket: number; calc_categoria: string } | null;
  };
  attribution: Record<string, string>;
  user_agent: string | null;
};

const TIMEOUT_MS = 2500;

export async function forwardDemoRequest(
  payload: DemoRequestPayload,
): Promise<{ delivered: boolean }> {
  const url = process.env.DEMO_WEBHOOK_URL;
  if (!url) {
    // Sem destino configurado: nada é guardado. Log sem dados pessoais.
    console.warn(
      `[demo] DEMO_WEBHOOK_URL ausente — pedido ${payload.request_id} (${payload.status}) não foi entregue a nenhum CRM.`,
    );
    return { delivered: false };
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok)
      console.error(`[demo] CRM respondeu ${response.status} para ${payload.request_id}`);
    return { delivered: response.ok };
  } catch (error) {
    console.error(`[demo] falha ao entregar ${payload.request_id}:`, (error as Error).name);
    return { delivered: false };
  }
}
