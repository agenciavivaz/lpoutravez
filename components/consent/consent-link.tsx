'use client';

import { copy } from '@/lib/copy/pt-BR';
import { CONSENT_OPEN_EVENT } from '@/lib/consent';

/** "Preferências de cookies" no rodapé: reabre o banner para mudar a escolha. */
export function ConsentLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={className}
    >
      {copy.consent.ui.footerLink}
    </button>
  );
}
