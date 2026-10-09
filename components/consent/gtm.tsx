'use client';

import { useEffect } from 'react';
import { CONSENT_EVENT, readConsent } from '@/lib/consent';

/**
 * Google Tag Manager (ADR-LP-07). Só carrega depois que a pessoa escolhe no banner (qualquer
 * escolha), e em tempo ocioso. Antes disso nenhuma tag existe na página. O Consent Mode já está
 * em `denied` pelo script inline do layout; dentro do GTM, Meta Pixel e Google Ads devem exigir
 * `ad_storage` (consentimento adicional).
 */
export function Gtm({ id }: { id: string }) {
  useEffect(() => {
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const run = () => {
        const w = window as unknown as { dataLayer: unknown[] };
        w.dataLayer = w.dataLayer ?? [];
        w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
        document.head.appendChild(script);
      };
      if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 });
      else setTimeout(run, 1500);
    };
    if (readConsent()) load();
    window.addEventListener(CONSENT_EVENT, load);
    return () => window.removeEventListener(CONSENT_EVENT, load);
  }, [id]);
  return null;
}
