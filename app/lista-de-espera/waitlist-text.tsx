'use client';

import { useSearchParams } from 'next/navigation';
import { copy, fill } from '@/lib/copy/pt-BR';

export function WaitlistText() {
  const erp = (useSearchParams().get('erp') ?? '').slice(0, 60).trim();
  // Sem ERP na URL, usa um termo neutro para a frase continuar correta.
  return (
    <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
      {fill(copy.waitlist.text, { erp: erp || 'seu ERP' })}
    </p>
  );
}
