'use client';

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';

/**
 * Carregamento tardio do tour (PRD 7.4): até a seção chegar a ~600 px da viewport, mostra a
 * versão estática renderizada no servidor (aba Início, indexável). Depois troca pelo tour
 * interativo, que tem a mesma marcação.
 */
export function TourLoader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [Interactive, setInteractive] = useState<ComponentType | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        import('./tour-interactive').then((mod) => {
          if (!cancelled) setInteractive(() => mod.TourInteractive);
        });
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} data-tour-ready={Interactive ? 'true' : 'false'}>
      {Interactive ? <Interactive /> : children}
    </div>
  );
}
