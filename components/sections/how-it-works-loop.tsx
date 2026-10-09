'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Stage = 'static' | 'armed' | 'done';

/**
 * Microinteração do "Como funciona" (PRD 6.4): quando o nó 5 entra na tela, o laço completa a
 * volta e o nó 1 pulsa uma vez. Sem JS ou com prefers-reduced-motion, mostra o estado final.
 */
export function LoopStage({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>('static');

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const last = root.querySelector('[data-step="5"]');
    if (!last) return;
    setStage('armed');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStage('done');
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(last);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-loop-stage={stage} className={className}>
      {children}
    </div>
  );
}
