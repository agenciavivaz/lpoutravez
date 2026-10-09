'use client';

import { useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';

/**
 * Menu do mobile (PRD 6.0) com `<dialog>` nativo: modal de verdade (fundo inerte, Esc fecha,
 * foco volta ao botão) sem carregar biblioteca.
 */
export function MobileMenu({ appUrl }: { appUrl: string | null }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label={copy.a11y.openMenu}
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
        className="hover:bg-secondary grid size-11 place-items-center rounded-[10px] lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>
      <dialog
        ref={dialog}
        aria-label={copy.a11y.menuTitle}
        onClick={(event) => {
          // Clique no fundo (fora do painel) fecha.
          if (event.target === dialog.current) close();
        }}
        className="bg-card text-foreground fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(20rem,85vw)] max-w-none border-l p-6 pt-16 shadow-lg backdrop:bg-black/50"
      >
        <button
          type="button"
          aria-label={copy.a11y.closeMenu}
          onClick={close}
          className="hover:bg-secondary absolute top-3 right-3 grid size-11 place-items-center rounded-[10px]"
        >
          <X className="size-5" aria-hidden />
        </button>
        <nav aria-label={copy.a11y.mainNav}>
          <ul className="flex flex-col gap-1">
            {copy.header.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="hover:bg-secondary flex min-h-12 items-center rounded-[10px] px-3 text-base font-semibold"
                >
                  {item.label}
                </a>
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
      </dialog>
    </>
  );
}
