/**
 * Consentimento de cookies (PRD 12.1 e ADR-LP-07): Google Consent Mode v2, padrão `denied`.
 * A escolha fica no cookie `ov_consent` por 12 meses.
 */

export type ConsentChoice = { analytics: boolean; ads: boolean };

export const CONSENT_COOKIE = 'ov_consent';
export const CONSENT_EVENT = 'ov:consent';
export const CONSENT_OPEN_EVENT = 'ov:consent-open';
const MAX_AGE = 60 * 60 * 24 * 365;

export function readConsent(): ConsentChoice | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)ov_consent=([^;]+)/);
  if (!match) return null;
  const [analytics, ads] = decodeURIComponent(match[1]!).split(',');
  if (analytics === undefined || ads === undefined) return null;
  return { analytics: analytics === '1', ads: ads === '1' };
}

type Gtag = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  if (w.gtag) w.gtag(...args);
  else (w.dataLayer = w.dataLayer ?? []).push(args);
}

export function consentModeState(choice: ConsentChoice) {
  const ads = choice.ads ? 'granted' : 'denied';
  return {
    analytics_storage: choice.analytics ? 'granted' : 'denied',
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

export function saveConsent(choice: ConsentChoice): void {
  const value = `${choice.analytics ? 1 : 0},${choice.ads ? 1 : 0}`;
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  gtag('consent', 'update', consentModeState(choice));
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}

/**
 * Script inline do <head>: define o padrão `denied` antes de qualquer tag e reaplica uma
 * escolha já salva. Fica inline para rodar antes do GTM.
 */
export const CONSENT_DEFAULT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var m=document.cookie.match(/(?:^|;\\s*)ov_consent=([^;]+)/);if(m){var p=decodeURIComponent(m[1]).split(','),a=p[1]==='1'?'granted':'denied';gtag('consent','update',{analytics_storage:p[0]==='1'?'granted':'denied',ad_storage:a,ad_user_data:a,ad_personalization:a});}}catch(e){}`;
