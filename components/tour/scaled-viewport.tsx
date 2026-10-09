'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type ScaledViewportProps = {
  /** Tamanho em que a tela é desenhada (ex.: 1440×900 ou 390×780). */
  width: number;
  height: number;
  /** Descrição completa da tela para leitor de tela (PRD 7.3). */
  label: string;
  className?: string;
  /** Tela de demonstração: fica `inert` (não focável nem clicável). */
  children: ReactNode;
  /** Camada por cima da tela, sem escala (marcadores). */
  overlay?: ReactNode;
};

/**
 * Mostra uma tela desenhada em tamanho real reduzida por `transform: scale()`, calculado com
 * ResizeObserver (PRD 7.2). O tamanho da caixa vem só do CSS (aspect-ratio), então a escala não
 * mexe no layout (zero CLS).
 */
export function ScaledViewport({
  width,
  height,
  label,
  className,
  children,
  overlay,
}: ScaledViewportProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setScale(element.clientWidth / width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div role="img" aria-label={label} className="absolute inset-0">
        <div
          inert
          className="absolute top-0 left-0 origin-top-left select-none"
          style={{
            width,
            height,
            transform: `scale(${scale ?? 0})`,
            opacity: scale ? 1 : 0,
          }}
        >
          {children}
        </div>
      </div>
      {overlay}
    </div>
  );
}
