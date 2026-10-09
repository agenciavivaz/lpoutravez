'use client';

import { useEffect, useState } from 'react';
import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';
import { CtaLink } from '@/components/cta-link';

/**
 * Barra de CTA fixa, só no mobile (PRD 6, "Barra de CTA fixa"): aparece depois que o hero sai
 * da tela e some quando #agendar chega na tela (e daí para baixo).
 */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    const target = document.getElementById('agendar');
    if (!hero || !target) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const heroGone = hero.getBoundingClientRect().bottom <= 0;
      const targetReached = target.getBoundingClientRect().top <= window.innerHeight;
      setVisible(heroGone && !targetReached);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      data-slot="mobile-cta-bar"
      data-visible={visible}
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        'bg-warm-50 border-border fixed inset-x-0 bottom-0 z-30 border-t px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-250 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <CtaLink location="mobile_bar" size="lg" className="w-full">
        {copy.cta.primary}
      </CtaLink>
      <p className="text-muted-foreground mt-1.5 text-center text-xs tabular-nums">
        {copy.mobileBar.support}
      </p>
    </div>
  );
}
