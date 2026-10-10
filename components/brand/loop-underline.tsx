import { cn } from '@/lib/utils';

/**
 * Arco coral sob "outra vez." (PRD v2 11.3.1): o traço se desenha uma vez no carregamento e termina
 * voltando para cima, o gesto de retorno da marca. Decorativo. Com prefers-reduced-motion aparece
 * pronto (a regra global zera a duração).
 */
export function LoopUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 300 40"
      preserveAspectRatio="none"
      className={cn(
        'pointer-events-none absolute -bottom-[0.24em] left-0 h-[0.34em] w-full overflow-visible',
        className,
      )}
    >
      <path
        className="hero-arc"
        d="M4 14 C 60 36, 190 40, 262 22 C 280 17, 292 9, 296 3"
        fill="none"
        stroke="var(--color-coral-500)"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={100}
      />
    </svg>
  );
}
