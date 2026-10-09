'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/analytics/events';
import { CtaLink } from '@/components/cta-link';

/** Evento disparado para o formulário marcar "Outro" no campo de ERP (PRD v2 6). */
export const ERP_OTHER_EVENT = 'ov:erp-other';
export const ERP_OTHER_KEY = 'ov_erp_other';

/** "Usa outro sistema? Me conta qual": leva ao formulário com o ERP "outro" pré-escolhido. */
export function ErpOtherLink({ children }: { children: ReactNode }) {
  return (
    <CtaLink
      location="integrations"
      variant="outline"
      className="self-start lg:self-auto"
      onClick={() => {
        track({ event: 'erp_other_click' });
        try {
          sessionStorage.setItem(ERP_OTHER_KEY, '1');
        } catch {
          // sessionStorage indisponível: o formulário só não vem pré-preenchido.
        }
        window.dispatchEvent(new CustomEvent(ERP_OTHER_EVENT));
      }}
    >
      {children}
    </CtaLink>
  );
}
