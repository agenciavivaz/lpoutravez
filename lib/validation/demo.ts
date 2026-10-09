/**
 * Validação do formulário de demo (PRD 9.2 e 9.3). Sem dependências: a mesma função roda no
 * navegador (feedback imediato) e na server action (fonte da verdade).
 */
import { copy } from '@/lib/copy/pt-BR';
import { parseBrPhone } from '@/lib/phone';

const e1 = copy.form.step1.errors;
const e2 = copy.form.ui.errors;

export const ORDERS_RANGES = copy.form.step2.ordersOptions.map((o) => o.value);
export const ERPS = copy.form.step2.erpOptions.map((o) => o.value);
export const MARKETPLACES = copy.form.step2.marketplaceOptions;

export type OrdersRange = (typeof ORDERS_RANGES)[number];
export type Erp = (typeof ERPS)[number];

export type ContactInput = {
  name: string;
  whatsapp: string;
  email: string;
  consent: boolean;
};

export type StoreInput = {
  storeName: string;
  marketplaces: string[];
  ordersRange: string;
  erp: string;
  erpOther: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): FieldErrors<ContactInput> {
  const errors: FieldErrors<ContactInput> = {};
  if (input.name.trim().length < 2) errors.name = e1.name;
  // DDD válido + 9 dígitos começando com 9, como a pessoa digitou (o parser do app completaria o 9).
  const typed = input.whatsapp.replace(/\D/g, '').replace(/^55(?=\d{11}$)/, '');
  const phone = parseBrPhone(typed);
  if (typed.length !== 11 || typed[2] !== '9' || phone?.type !== 'mobile')
    errors.whatsapp = e1.whatsapp;
  if (!EMAIL.test(input.email.trim())) errors.email = e1.email;
  if (!input.consent) errors.consent = e1.consent;
  return errors;
}

export function validateStore(input: StoreInput): FieldErrors<StoreInput> {
  const errors: FieldErrors<StoreInput> = {};
  if (input.storeName.trim().length < 1) errors.storeName = e2.storeName;
  const valid = input.marketplaces.filter((m) => (MARKETPLACES as readonly string[]).includes(m));
  if (valid.length === 0) errors.marketplaces = e2.marketplaces;
  if (!(ORDERS_RANGES as readonly string[]).includes(input.ordersRange))
    errors.ordersRange = e2.orders;
  if (!(ERPS as readonly string[]).includes(input.erp)) errors.erp = e2.erp;
  return errors;
}

/** Bling ou "Não sei" seguem para o calendário; o resto vai para a lista de espera (PRD 9.1). */
export function isQualified(erp: string): boolean {
  return erp === 'bling' || erp === 'nao_sei';
}

/** Tempo mínimo entre renderizar e enviar (anti-spam, PRD 9.6). */
export const MIN_FILL_MS = 3000;
