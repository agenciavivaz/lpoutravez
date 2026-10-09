/**
 * Origem da visita (PRD 3 e 11.1): UTMs, gclid, fbclid, referrer e página de entrada.
 * Primeira origem da sessão em sessionStorage. Cookie de 30 dias (`ov_utm`) só depois do
 * consentimento de análise — entra na Fase 5 com o banner.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_path?: string;
};

const KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const;
const STORAGE_KEY = 'ov_attribution';
const MAX = 300;

export function parseAttribution(search: string, referrer: string, path: string): Attribution {
  const params = new URLSearchParams(search);
  const result: Attribution = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) result[key] = value.slice(0, MAX);
  }
  if (referrer) result.referrer = referrer.slice(0, MAX);
  result.landing_path = path.slice(0, MAX);
  return result;
}

/** Guarda a primeira origem da sessão e devolve a que vale. */
export function captureAttribution(): Attribution {
  const current = parseAttribution(location.search, document.referrer, location.pathname);
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Attribution;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // sessionStorage indisponível: usa só a URL atual.
  }
  return current;
}
