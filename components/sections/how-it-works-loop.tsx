'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Stage = 'static' | 'armed' | 'done';

/**
 * Microinteração do "Como funciona" (PRD v2 11.3.3): quando o passo 5 entra na tela, a seta de
 * retorno se desenha até o passo 3 e ele pulsa uma vez. Sem JS ou com prefers-reduced-motion,
 * mostra o estado final.
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
