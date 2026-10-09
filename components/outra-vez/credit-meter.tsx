import { Coins } from 'lucide-react';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

type CreditMeterProps = {
  balance: number;
  days: number;
  className?: string;
};

/** Medidor de créditos (registry/credit-meter.json): saldo e tempo restante no ritmo atual. */
export function CreditMeter({ balance, days, className }: CreditMeterProps) {
  return (
    <div
      data-slot="credit-meter"
      className={cn(
        'border-border bg-card flex items-center gap-3 rounded-[14px] border px-3.5 py-3',
        className,
      )}
    >
      <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-[10px]">
        <Coins className="size-4" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-extrabold tabular-nums">{formatNumber(balance)} créditos</p>
        <p className="text-muted-foreground text-xs tabular-nums">
          dá para cerca de {days} dias no seu ritmo atual
        </p>
      </div>
    </div>
  );
}
