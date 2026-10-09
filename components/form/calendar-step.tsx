'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { MessageCircle } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { site, whatsappHref } from '@/lib/site';
import { track } from '@/lib/analytics/events';
import { cn } from '@/lib/utils';

const t = copy.form.calendar;
const FALLBACK_MS = 8000;

type CalProps = {
  namespace: string;
  calLink: string;
  style?: React.CSSProperties;
  config?: Record<string, string>;
};

export type BookingInfo = { start: string | null; uid: string | null };

/**
 * Calendário (PRD 9.4): embed inline do Cal.com, carregado só neste passo. Sem
 * NEXT_PUBLIC_CAL_LINK, ou se o embed não abrir em 8 s, mostra o fallback com WhatsApp.
 */
export function CalendarStep({
  prefill,
  onBooked,
}: {
  prefill: { name: string; email: string; whatsapp: string; store: string; requestId: string };
  onBooked: (booking: BookingInfo) => void;
}) {
  const calLink = site.calLink;
  const [Cal, setCal] = useState<ComponentType<CalProps> | null>(null);
  const [failed, setFailed] = useState(!calLink);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!calLink) return;
    let cancelled = false;
    const readyRef = { current: false };
    const timer = setTimeout(() => {
      if (!cancelled && !readyRef.current) setFailed(true);
    }, FALLBACK_MS);

    import('@calcom/embed-react')
      .then(async (mod) => {
        if (cancelled) return;
        setCal(() => mod.default as unknown as ComponentType<CalProps>);
        const cal = await mod.getCalApi({ namespace: 'demo' });
        const mobile = window.matchMedia('(max-width: 767px)').matches;
        cal('ui', {
          cssVarsPerTheme: { light: { 'cal-brand': '#1F2A6B' }, dark: { 'cal-brand': '#9FAAE5' } },
          layout: mobile ? 'column_view' : 'month_view',
          hideEventTypeDetails: false,
        });
        cal('on', {
          action: 'linkReady',
          callback: () => {
            readyRef.current = true;
            setReady(true);
          },
        });
        cal('on', {
          action: 'bookingSuccessful',
          callback: (event: { detail?: { data?: Record<string, unknown> } }) => {
            const data = (event.detail?.data ?? {}) as {
              date?: string;
              booking?: { uid?: string; startTime?: string };
            };
            track({ event: 'demo_scheduled' });
            onBooked({
              start: data.date ?? data.booking?.startTime ?? null,
              uid: data.booking?.uid ?? null,
            });
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [calLink, onBooked]);

  return (
    <div>
      <h3
        tabIndex={-1}
        data-step-heading
        className="text-foreground text-xl font-extrabold outline-none"
      >
        {t.title}
      </h3>
      <p className="text-muted-foreground mt-1 text-sm">{t.subtitle}</p>
      {failed ? (
        <div className="mt-6">
          <p className="text-foreground leading-relaxed">{t.fallback}</p>
          <a
            href={whatsappHref(copy.finalCta.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track({ event: 'whatsapp_click', location: 'calendar_fallback' })}
            className="bg-whatsapp mt-4 inline-flex min-h-12 items-center gap-2 rounded-[12px] px-5 font-extrabold text-[#0B2E17]"
          >
            <MessageCircle className="size-5" aria-hidden />
            {t.fallbackButton}
          </a>
        </div>
      ) : (
        <div
          className={cn(
            'mt-4 min-h-[560px] overflow-hidden rounded-[14px]',
            !ready && 'bg-muted animate-pulse',
          )}
        >
          {Cal && calLink ? (
            <Cal
              namespace="demo"
              calLink={calLink}
              style={{ width: '100%', height: '100%', overflow: 'auto' }}
              config={{
                name: prefill.name,
                email: prefill.email,
                whatsapp: prefill.whatsapp,
                loja: prefill.store,
                'metadata[demo_request_id]': prefill.requestId,
              }}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
