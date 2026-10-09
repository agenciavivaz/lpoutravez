'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CalendarPlus } from 'lucide-react';
import { copy, fill } from '@/lib/copy/pt-BR';
import { DEFAULT_TZ } from '@/lib/format';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import Link from 'next/link';

const t = copy.thankYou;
export const THANK_YOU_KEY = 'ov_demo_thank_you';

function formatWhen(iso: string | null): { data: string; hora: string } | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  const data = new Intl.DateTimeFormat('pt-BR', {
    timeZone: DEFAULT_TZ,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
  const hora = new Intl.DateTimeFormat('pt-BR', {
    timeZone: DEFAULT_TZ,
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
  return { data, hora };
}

/** Texto com e-mail (da sessão, não da URL), data/hora e link de calendário do Cal.com. */
export function ThankYouDetails() {
  const params = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const when = formatWhen(params.get('inicio'));
  const uid = params.get('uid');

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(THANK_YOU_KEY) ?? '{}') as { email?: string };
      if (saved.email) setEmail(saved.email);
    } catch {
      // sem e-mail salvo
    }
  }, []);

  const [before, after] = t.text.split('{email}');
  return (
    <>
      <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
        {before}
        <b className="text-foreground">{email ?? ''}</b>
        {after}
      </p>
      {when ? (
        <p className="text-ink-900 mt-6 text-2xl font-extrabold tabular-nums">
          {fill(t.when, when)}
        </p>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {uid ? (
          <a
            href={`https://app.cal.com/booking/${encodeURIComponent(uid)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            <CalendarPlus className="size-5" aria-hidden />
            {t.addToCalendar}
          </a>
        ) : null}
        <Link
          href="/"
          className="text-primary inline-flex min-h-11 items-center font-bold underline underline-offset-4"
        >
          {t.back}
        </Link>
      </div>
    </>
  );
}
