'use client';

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/brand/logo';
import { CtaLink } from '@/components/cta-link';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Header({ appUrl }: { appUrl: string | null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-150',
        scrolled
          ? 'border-border bg-warm-100/85 backdrop-blur-[18px]'
          : 'bg-background border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <a
          href="#inicio"
          aria-label={copy.a11y.home}
          className="-ml-1 flex min-h-11 shrink-0 items-center rounded-[10px] px-1"
        >
          <Logo alt="" priority height={28} />
        </a>

        <nav aria-label={copy.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {copy.header.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:bg-secondary hover:text-foreground flex min-h-11 items-center rounded-[10px] px-3 text-sm font-semibold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          {appUrl ? (
            <a
              href={appUrl}
              className="text-muted-foreground hover:text-foreground hidden min-h-11 items-center rounded-[10px] px-3 text-sm font-semibold sm:flex"
            >
              {copy.header.signIn}
            </a>
          ) : null}
          <CtaLink location="header" className="px-3 sm:px-4">
            {copy.cta.header}
          </CtaLink>
          <Sheet>
            <SheetTrigger
              aria-label={copy.a11y.openMenu}
              className="hover:bg-secondary grid size-11 place-items-center rounded-[10px] lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="bg-card w-[min(20rem,85vw)] p-6 pt-16">
              <SheetTitle className="sr-only">{copy.a11y.menuTitle}</SheetTitle>
              <nav aria-label={copy.a11y.mainNav}>
                <ul className="flex flex-col gap-1">
                  {copy.header.nav.map((item) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <a
                          href={item.href}
                          className="hover:bg-secondary flex min-h-12 items-center rounded-[10px] px-3 text-base font-semibold"
                        >
                          {item.label}
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                  {appUrl ? (
                    <li>
                      <a
                        href={appUrl}
                        className="text-muted-foreground hover:bg-secondary flex min-h-12 items-center rounded-[10px] px-3 text-base font-semibold"
                      >
                        {copy.header.signIn}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
