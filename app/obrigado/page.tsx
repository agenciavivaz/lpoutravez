import type { Metadata } from 'next';
import { Suspense } from 'react';
import { copy } from '@/lib/copy/pt-BR';
import { Loop } from '@/components/brand/loop';
import { SimplePage } from '@/components/simple-page';
import { ThankYouDetails } from './thank-you-details';

export const metadata: Metadata = {
  title: `${copy.thankYou.h1} · Outra Vez`,
  robots: { index: false, follow: false },
};

/** Confirmação pós-agendamento (página de conversão, PRD 6 "/obrigado"). */
export default function ThankYouPage() {
  return (
    <SimplePage>
      <Loop
        ringColor="var(--color-ink-100)"
        thickness={11}
        drawTipDelayMs={150}
        className="size-24"
      />
      <h1 className="text-ink-900 mt-8 text-[40px] font-extrabold sm:text-5xl">
        {copy.thankYou.h1}
      </h1>
      <Suspense fallback={null}>
        <ThankYouDetails />
      </Suspense>
    </SimplePage>
  );
}
