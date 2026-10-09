/**
 * Origem da visita (PRD 3 e 11.1): UTMs, gclid, fbclid, referrer e página de entrada.
 * Primeira origem da sessão em sessionStorage. Com consentimento de análise, a primeira origem
 * também fica no cookie `ov_utm` por 30 dias (PRD 11.1).
 */
import { readConsent } from '@/lib/consent';

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
const COOKIE = 'ov_utm';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
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

function readCookie(): Attribution | null {
  const match = document.cookie.match(/(?:^|;\s*)ov_utm=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]!)) as Attribution;
  } catch {
    return null;
  }
}

function hasCampaign(a: Attribution): boolean {
  return Boolean(a.utm_source || a.utm_medium || a.utm_campaign || a.gclid || a.fbclid);
}

/** Guarda a primeira origem e devolve a que vale (cookie de 30 dias > sessão > URL atual). */
export function captureAttribution(): Attribution {
  const current = parseAttribution(location.search, document.referrer, location.pathname);
  let session: Attribution | null = null;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) session = JSON.parse(saved) as Attribution;
    else sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // sessionStorage indisponível: usa só a URL atual.
  }
  const firstTouch = session ?? current;

  if (readConsent()?.analytics) {
    const stored = readCookie();
    if (stored) return stored;
    if (hasCampaign(firstTouch)) {
      const secure = location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(firstTouch))}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    }
  }
  return firstTouch;
}
