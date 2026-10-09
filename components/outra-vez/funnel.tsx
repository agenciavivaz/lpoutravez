import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

type FunnelProps = {
  steps: readonly { label: string; value: number }[];
  className?: string;
};

/** Funil (registry/funnel.json): número + texto + forma, do WhatsApp encontrado à recompra. */
export function Funnel({ steps, className }: FunnelProps) {
  const max = steps[0]?.value ?? 1;
  return (
    <ol data-slot="funnel" className={cn('grid gap-2.5', className)}>
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li
            key={step.label}
            className="grid grid-cols-[minmax(0,9.5rem)_1fr_3.5rem] items-center gap-3 text-xs"
          >
            <span className="text-muted-foreground truncate font-semibold">{step.label}</span>
            <span className="bg-muted h-3 overflow-hidden rounded-full">
              <span
                className={cn('block h-full rounded-full', last ? 'bg-money' : 'bg-primary')}
                style={{ width: `${Math.max(2, (step.value / max) * 100)}%` }}
              />
            </span>
            <span className={cn('text-right font-extrabold tabular-nums', last && 'text-money')}>
              {formatNumber(step.value)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
