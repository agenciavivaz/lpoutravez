import type { Metadata } from 'next';
import { Suspense } from 'react';
import { copy } from '@/lib/copy/pt-BR';
import { SimplePage } from '@/components/simple-page';
import { WaitlistText } from './waitlist-text';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `${copy.waitlist.h1} · Outra Vez`,
  robots: { index: false, follow: false },
};

/** Confirmação para quem não usa Bling (PRD 6 "/lista-de-espera"). */
export default function WaitlistPage() {
  return (
    <SimplePage>
      <h1 className="text-ink-900 text-[40px] font-extrabold sm:text-5xl">{copy.waitlist.h1}</h1>
      <Suspense fallback={null}>
        <WaitlistText />
      </Suspense>
      <Link
        href="/"
        className="text-primary mt-8 inline-flex min-h-11 items-center font-bold underline underline-offset-4"
      >
        {copy.waitlist.back}
      </Link>
    </SimplePage>
  );
}
