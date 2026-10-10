'use server';

import { headers } from 'next/headers';
import { parseBrPhone } from '@/lib/phone';
import {
  MIN_FILL_MS,
  validateContact,
  validateStore,
  type ContactInput,
  type FieldErrors,
  type StoreInput,
} from '@/lib/validation/demo';
import { CATEGORY_IDS } from '@/lib/calculator';
import { forwardDemoRequest, type DemoRequestPayload } from '@/lib/crm/forward';

/** Versão do texto da caixa de aceite (PRD 11.1, consent_text_version). */
const CONSENT_TEXT_VERSION = '2026-10-08';

type Meta = {
  requestId: string;
  /** Momento em que o formulário apareceu (ms). */
  renderedAt: number;
  /** Honeypot: campo `company_website`, invisível para pessoas. */
  honeypot: string;
  attribution: Record<string, string>;
};

export type ActionResult<T> =
  { ok: true; next?: 'calendar' } | { ok: false; errors: FieldErrors<T> };

const UUID = /^[0-9a-f-]{36}$/i;

function isBot(meta: Meta): boolean {
  return meta.honeypot.trim() !== '' || Date.now() - meta.renderedAt < MIN_FILL_MS;
}

function cleanAttribution(input: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(input ?? {})) {
    if (
      /^(utm_[a-z]+|gclid|fbclid|referrer|landing_path)$/.test(key) &&
      typeof value === 'string'
    ) {
      out[key] = value.slice(0, 300);
    }
  }
  return out;
}

function contactPayload(contact: ContactInput) {
  return {
    name: contact.name.trim().slice(0, 120),
    whatsapp_e164: parseBrPhone(contact.whatsapp)!.e164,
    email: contact.email.trim().toLowerCase().slice(0, 200),
    consent_contact: contact.consent,
    consent_text_version: CONSENT_TEXT_VERSION,
  };
}

/** Etapa 1 (PRD 9.2): contato. Conversão secundária. */
export async function submitContact(
  contact: ContactInput,
  meta: Meta,
): Promise<ActionResult<ContactInput>> {
  const errors = validateContact(contact);
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  if (!UUID.test(meta.requestId)) return { ok: false, errors: {} };
  // Bot: responde como sucesso e não encaminha nada (PRD 9.6).
  if (isBot(meta)) return { ok: true };

  const payload: DemoRequestPayload = {
    request_id: meta.requestId,
    status: 'started',
    step: 1,
    submitted_at: new Date().toISOString(),
    contact: contactPayload(contact),
    attribution: cleanAttribution(meta.attribution),
    user_agent: (await headers()).get('user-agent'),
  };
  await forwardDemoRequest(payload);
  return { ok: true };
}

/** Etapa 2 (PRD v2 9.13): site, ERP e pedidos. Sempre segue para o calendário. */
export async function submitStore(
  contact: ContactInput,
  store: StoreInput,
  calculator: { orders: number; ticket: number; category: string } | null,
  meta: Meta,
): Promise<ActionResult<StoreInput>> {
  const errors = validateStore(store);
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  if (Object.keys(validateContact(contact)).length > 0 || !UUID.test(meta.requestId)) {
    return { ok: false, errors: {} };
  }
  // Todo ERP segue para o calendário: o Bling já está ativo, os demais conectamos na implantação.
  const next = 'calendar' as const;
  if (isBot(meta)) return { ok: true, next };

  // Campos ocultos da calculadora (PRD v2 8.6).
  const calc =
    calculator &&
    [calculator.orders, calculator.ticket].every(
      (n) => typeof n === 'number' && Number.isFinite(n),
    ) &&
    (CATEGORY_IDS as readonly string[]).includes(calculator.category)
      ? {
          calc_pedidos: Math.round(calculator.orders),
          calc_ticket: Math.round(calculator.ticket),
          calc_categoria: calculator.category,
        }
      : null;

  const payload: DemoRequestPayload = {
    request_id: meta.requestId,
    status: 'qualified',
    step: 2,
    submitted_at: new Date().toISOString(),
    contact: contactPayload(contact),
    store: {
      site: store.site.trim().slice(0, 200) || null,
      orders_range: store.ordersRange,
      erp: store.erp,
      erp_other: store.erp === 'outro' ? store.erpOther.trim().slice(0, 80) || null : null,
      calculator: calc,
    },
    attribution: cleanAttribution(meta.attribution),
    user_agent: (await headers()).get('user-agent'),
  };
  await forwardDemoRequest(payload);
  return { ok: true, next };
}
