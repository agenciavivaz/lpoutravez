import { cn } from '@/lib/utils';

/**
 * Sublinhado em laço coral para uma palavra do H1 (PRD 6.1). Decorativo: o texto continua
 * legível sem ele. Usa coral-500 só como traço gráfico (permitido pelo PRD 4.3).
 */
export function LoopUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 300 44"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute -bottom-[0.22em] left-0 h-[0.36em] w-full', className)}
    >
      <path
        className="loop-underline-path"
        d="M4 30 C 70 38, 160 38, 236 27 C 266 22, 286 11, 274 5 C 260 -1, 248 19, 266 28 C 278 34, 290 32, 296 27"
        fill="none"
        stroke="var(--color-coral-500)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
