/** Configuração pública do site, lida das envs NEXT_PUBLIC_* (ver .env.example). */

function flag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === '') return fallback;
  return value === 'true';
}

/** Endereço canônico da LP (PRD v2 10). Não depende de env: preview e produção apontam para cá. */
export const CANONICAL_URL = 'https://www.outravez.com.br';

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_URL).replace(/\/$/, ''),
  /** Link "Entrar" no header só aparece quando existe. */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || null,
  /** E.164 sem "+" (ex.: 5511987654321). [confirmar Diego] Sem número, os links de WhatsApp somem. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  /** Evento do Cal.com (ex.: diego/demo-outra-vez). Sem ele, o passo do calendário mostra o WhatsApp. */
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || null,
  /** [confirmar Diego] E-mail de contato para a política de privacidade. */
  contactEmail: null as string | null,
  /** [confirmar Diego] CNPJ da Vivaz: PRD seção 17, pergunta 6. */
  cnpj: null as string | null,
  features: {
    simulator: flag(process.env.NEXT_PUBLIC_FEATURE_SIMULATOR, true),
    pilot: flag(process.env.NEXT_PUBLIC_FEATURE_PILOT, false),
    /** [confirmar Diego] Card "Eu mesmo faço a demo": PRD 17, pergunta 4. */
    hostCard: false,
  },
} as const;

export const isProduction = process.env.VERCEL_ENV === 'production';

/**
 * Link do WhatsApp (PRD v2 9.13): `wa.me/55DDDNUMERO?text=...`. Sem número configurado devolve
 * null, e quem chama não mostra o link (um `wa.me/` sem número não leva a lugar nenhum).
 */
export function whatsappHref(
  message: string,
  number: string | null = site.whatsappNumber,
): string | null {
  const digits = number?.replace(/\D/g, '') ?? '';
  if (digits.length < 12) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
