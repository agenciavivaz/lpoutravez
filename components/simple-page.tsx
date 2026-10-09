import type { ReactNode } from 'react';
import { copy } from '@/lib/copy/pt-BR';
import { Logo } from '@/components/brand/logo';
import { Footer } from '@/components/sections/footer';
import Link from 'next/link';

/** Casca das páginas internas: logo no topo, conteúdo central e rodapé. */
export function SimplePage({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <>
      <header className="border-border bg-background border-b">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label={copy.a11y.home}
            className="flex min-h-11 items-center rounded-[10px]"
          >
            <Logo alt="" height={28} />
          </Link>
        </div>
      </header>
      <main
        id="conteudo"
        className={`mx-auto px-4 py-16 sm:px-6 lg:py-24 ${wide ? 'max-w-[760px]' : 'max-w-[640px]'}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
