import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';

type SalesChartProps = {
  values: readonly number[];
  className?: string;
  /** Mostra o valor de cada barra acima dela. */
  showValues?: boolean;
};

/** Barras de vendas por semana. A última barra (semana atual) é coral: o momento do retorno. */
export function SalesChart({ values, className, showValues = true }: SalesChartProps) {
  const max = Math.max(...values);
  return (
    <div data-slot="sales-chart" className={cn('flex h-36 items-end gap-2', className)}>
      {values.map((value, index) => {
        const last = index === values.length - 1;
        return (
          <div key={index} className="flex h-full flex-1 flex-col justify-end gap-1">
            {showValues ? (
              <span className="text-muted-foreground text-center text-[9px] font-semibold tabular-nums">
                {formatMoney(value).replace(',00', '')}
              </span>
            ) : null}
            <span
              className={cn(
                'block min-h-1 rounded-t-[7px] rounded-b-[2px]',
                last ? 'bg-accent' : 'bg-primary',
              )}
              style={{ height: `${(value / max) * 100}%` }}
            />
          </div>
        );
      })}
    </div>
  );
}
