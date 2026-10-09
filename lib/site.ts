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
  /** E.164 sem "+". Sem número, o link de WhatsApp não aparece. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  /** [confirmar Diego] CNPJ da Vivaz — PRD seção 17, pergunta 6. */
  cnpj: null as string | null,
  features: {
    simulator: flag(process.env.NEXT_PUBLIC_FEATURE_SIMULATOR, true),
    pilot: flag(process.env.NEXT_PUBLIC_FEATURE_PILOT, false),
    /** [confirmar Diego] Card "Eu mesmo faço a demo" — PRD 17, pergunta 4. */
    hostCard: false,
  },
} as const;

export const isProduction = process.env.VERCEL_ENV === 'production';

export function whatsappHref(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
