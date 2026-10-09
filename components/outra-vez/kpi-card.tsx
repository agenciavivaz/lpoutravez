import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type KpiCardProps = {
  label: string;
  value: string;
  /** Comparação ou contexto do número (ex.: "184 novos no período"). */
  delta?: string;
  /** money = valores em reais positivos (`--money`). */
  tone?: 'default' | 'money';
  /** Variação positiva ganha cor de sucesso. */
  deltaTone?: 'muted' | 'good';
  compact?: boolean;
  /** Origem do dado ou chip de canal. */
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** KPI Card (registry/kpi-card.json): rótulo, valor tabular, comparação e origem do dado. */
export function KpiCard({
  label,
  value,
  delta,
  tone = 'default',
  deltaTone = 'muted',
  compact,
  footer,
  className,
  style,
}: KpiCardProps) {
  return (
    <div
      data-slot="kpi-card"
      style={style}
      className={cn(
        'bg-card text-card-foreground border-border rounded-[20px] border',
        compact ? 'p-4' : 'p-5',
        className,
      )}
    >
      <p className="text-muted-foreground text-xs font-bold">{label}</p>
      <p
        className={cn(
          'leading-[1.05] font-extrabold tracking-[-0.02em] tabular-nums',
          compact ? 'mt-2 text-2xl' : 'mt-3 mb-2 text-[31px]',
          tone === 'money' && 'text-money',
        )}
      >
        {value}
      </p>
      {delta ? (
        <p
          className={cn(
            'text-xs tabular-nums',
            deltaTone === 'good' ? 'text-success' : 'text-muted-foreground',
          )}
        >
          {delta}
        </p>
      ) : null}
      {footer ? <div className={cn(compact ? 'mt-2' : 'mt-3')}>{footer}</div> : null}
    </div>
  );
}
