import { Circle, CircleCheck, LoaderCircle } from 'lucide-react';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

type ImportItem = {
  label: string;
  status: 'done' | 'running' | 'pending';
  done?: number;
  total?: number;
};

/** Progresso de importação (registry/import-progress.json): etapas e estado já-dá-pra-usar. */
export function ImportProgress({
  items,
  doneLabel,
  className,
}: {
  items: readonly ImportItem[];
  doneLabel: string;
  className?: string;
}) {
  return (
    <ul data-slot="import-progress" className={cn('grid gap-3', className)}>
      {items.map((item) => {
        const Icon =
          item.status === 'done' ? CircleCheck : item.status === 'running' ? LoaderCircle : Circle;
        const pct = item.total ? Math.round(((item.done ?? 0) / item.total) * 100) : 0;
        return (
          <li key={item.label} className="grid grid-cols-[20px_1fr] gap-3">
            <Icon
              className={cn(
                'mt-0.5 size-5',
                item.status === 'done' && 'text-success',
                item.status === 'running' && 'text-primary',
                item.status === 'pending' && 'text-muted-foreground',
              )}
              aria-hidden
            />
            <div className="min-w-0">
              <p
                className={cn(
                  'text-sm',
                  item.status === 'pending' ? 'text-muted-foreground font-semibold' : 'font-bold',
                )}
              >
                {item.label}
                {item.status === 'done' ? (
                  <span className="text-success font-semibold"> {doneLabel}</span>
                ) : null}
                {item.status === 'running' && item.total ? (
                  <span className="tabular-nums">
                    {' '}
                    {formatNumber(item.done ?? 0)} de {formatNumber(item.total)}
                  </span>
                ) : null}
              </p>
              {item.status === 'running' ? (
                <span className="bg-muted mt-2 block h-2 overflow-hidden rounded-full">
                  <span
                    className="bg-primary block h-full rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
