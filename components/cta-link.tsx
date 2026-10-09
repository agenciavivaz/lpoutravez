'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CtaLocation =
  'header' | 'hero' | 'tour' | 'benefits' | 'demo' | 'final' | 'mobile_bar' | 'simulator';

type CtaLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  location: CtaLocation;
  /** Âncora de destino. Padrão: formulário de agendamento. */
  target?: `#${string}`;
  variant?: 'default' | 'outline';
  size?: 'default' | 'lg';
};

/**
 * CTA que rola até a âncora e, no caso de #agendar, foca o primeiro campo do formulário
 * (elemento marcado com `data-first-field`). Funciona sem JS como link de âncora comum.
 */
export function CtaLink({
  location,
  target = '#agendar',
  variant = 'default',
  size = 'default',
  className,
  onClick,
  children,
  ...props
}: CtaLinkProps) {
  return (
    <a
      href={target}
      data-cta-location={location}
      className={cn(buttonVariants({ variant, size }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const section = document.querySelector<HTMLElement>(target);
        if (!section) return;
        event.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', target);
        const focusTarget =
          section.querySelector<HTMLElement>('[data-first-field]') ??
          section.querySelector<HTMLElement>('h2');
        if (focusTarget) {
          if (!focusTarget.hasAttribute('tabindex') && focusTarget.tagName === 'H2') {
            focusTarget.setAttribute('tabindex', '-1');
          }
          focusTarget.focus({ preventScroll: true });
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
