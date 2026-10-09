/** Configuração pública do site, lida das envs NEXT_PUBLIC_* (ver .env.example). */

function flag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === '') return fallback;
  return value === 'true';
}

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://lpoutravez-d6bn.vercel.app').replace(
    /\/$/,
    '',
  ),
  /** Link "Entrar" no header só aparece quando existe. */
  appUrl: process.env.NEXT_PUBLIC_APP_URL || null,
  /** E.164 sem "+". [confirmar Diego] Sem número, o link abre o WhatsApp só com a mensagem. */
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

/** Link do WhatsApp (PRD 6.12). Sem número configurado, abre o WhatsApp só com a mensagem. */
export function whatsappHref(message: string, number: string | null = site.whatsappNumber): string {
  return `https://wa.me/${number ?? ''}?text=${encodeURIComponent(message)}`;
}
