import { cn } from '@/lib/utils';

type LoopProps = {
  /** Cor do anel (a parte que "sai"). A ponta que volta é sempre coral-500. */
  ringColor?: string;
  /** Espessura do traço, em unidades do viewBox (diâmetro = 76). */
  thickness?: number;
  className?: string;
  /** Classe extra para a ponta coral (usada na animação de "completar a volta"). */
  tipClassName?: string;
};

/**
 * Laço do retorno (`.loop` / `.loop-art` do design-system-v2.html): o "O" que volta ao ponto
 * de partida, com a ponta coral. Decorativo. Use no máximo em 3 momentos: hero,
 * "Como funciona" e CTA final (PRD 4.1). O tamanho vem do `className` (ex.: `size-40`).
 */
export function Loop({
  ringColor = 'rgb(255 255 255 / 0.9)',
  thickness = 12,
  className,
  tipClassName,
}: LoopProps) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 100 100"
      className={cn('pointer-events-none block', className)}
    >
      <circle cx="50" cy="50" r="38" fill="none" stroke={ringColor} strokeWidth={thickness} />
      <g className={tipClassName}>
        <path
          d="M 63 14.29 A 38 38 0 0 1 84.44 66.06"
          fill="none"
          stroke="var(--color-coral-500)"
          strokeWidth={thickness}
        />
        <path d="M 95.3 71.1 L 73.6 61 L 78.6 79.6 Z" fill="var(--color-coral-500)" />
      </g>
    </svg>
  );
}
