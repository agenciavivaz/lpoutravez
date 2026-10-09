import { cn } from '@/lib/utils';

type LoopProps = {
  /** Cor do anel (a parte que "sai"). A ponta que volta é sempre coral-500. */
  ringColor?: string;
  /** Espessura do traço, em unidades do viewBox (diâmetro = 76). */
  thickness?: number;
  className?: string;
  /**
   * Anima a ponta coral "completando a volta" (600 ms, o máximo para celebração) depois
   * deste atraso, em ms. Com prefers-reduced-motion, mostra direto o estado final.
   */
  drawTipDelayMs?: number;
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
  drawTipDelayMs,
}: LoopProps) {
  const animated = drawTipDelayMs !== undefined;
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 100 100"
      className={cn('pointer-events-none block', className)}
    >
      <circle cx="50" cy="50" r="38" fill="none" stroke={ringColor} strokeWidth={thickness} />
      <path
        d="M 63 14.29 A 38 38 0 0 1 84.44 66.06"
        fill="none"
        stroke="var(--color-coral-500)"
        strokeWidth={thickness}
        pathLength={100}
        strokeDasharray={animated ? 100 : undefined}
        className={animated ? 'animate-[loop-draw_600ms_var(--ease-brand)_both]' : undefined}
        style={animated ? { animationDelay: `${drawTipDelayMs}ms` } : undefined}
      />
      <path
        d="M 95.3 71.1 L 73.6 61 L 78.6 79.6 Z"
        fill="var(--color-coral-500)"
        className={animated ? 'animate-wa-in' : undefined}
        style={animated ? { animationDelay: `${(drawTipDelayMs ?? 0) + 450}ms` } : undefined}
      />
    </svg>
  );
}
