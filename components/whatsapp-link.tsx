'use client';

import type { ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { whatsappHref } from '@/lib/site';
import { track } from '@/lib/analytics/events';
import { cn } from '@/lib/utils';

/**
 * Link "Prefere falar pelo WhatsApp?" (PRD 6.12): abre em nova aba e dispara `whatsapp_click`.
 * O número vem de NEXT_PUBLIC_WHATSAPP_NUMBER (a definir).
 */
export function WhatsAppLink({
  location,
  className,
  children,
}: {
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={whatsappHref(copy.finalCta.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-location={location}
      onClick={() => track({ event: 'whatsapp_click', location })}
      className={cn('inline-flex min-h-11 items-center gap-3 font-bold', className)}
    >
      <span className="bg-whatsapp grid size-9 shrink-0 place-items-center rounded-full text-[#0B2E17]">
        <MessageCircle className="size-5" aria-hidden />
      </span>
      <span className="underline underline-offset-4">{children}</span>
    </a>
  );
}
