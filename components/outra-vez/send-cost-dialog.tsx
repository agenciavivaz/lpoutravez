import { formatMoney, formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

type SendCostDialogProps = {
  template: string;
  recipients: number;
  excluded: number;
  estimatedCost: number;
  confirmLabel: string;
  backLabel: string;
  className?: string;
};

/**
 * Confirmação com custo (registry/send-cost-dialog.json; PRD do app 14.7): obrigatória antes de
 * qualquer envio em massa. Aqui é a versão visual estática, usada dentro de telas de demonstração.
 */
export function SendCostDialog({
  template,
  recipients,
  excluded,
  estimatedCost,
  confirmLabel,
  backLabel,
  className,
}: SendCostDialogProps) {
  return (
    <div
      data-slot="send-cost-dialog"
      className={cn(
        'bg-popover text-popover-foreground border-border rounded-[20px] border p-6 shadow-[0_24px_60px_rgba(24,24,23,0.22)]',
        className,
      )}
    >
      <h3 className="text-xl leading-tight font-extrabold tracking-[-0.02em]">
        Enviar &ldquo;{template}&rdquo; para{' '}
        <span className="tabular-nums">{formatNumber(recipients)}</span> clientes?
      </h3>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        Custo estimado no WhatsApp:{' '}
        <b className="text-foreground tabular-nums">{formatMoney(estimatedCost)}</b>.{' '}
        <span className="tabular-nums">{formatNumber(excluded)}</span> clientes ficam de fora porque
        não aceitaram novidades ou estão fora do limite de frequência.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="bg-primary text-primary-foreground inline-flex min-h-11 items-center rounded-[12px] px-4 text-sm font-extrabold tabular-nums">
          {confirmLabel}
        </span>
        <span className="border-border bg-card inline-flex min-h-11 items-center rounded-[12px] border px-4 text-sm font-extrabold">
          {backLabel}
        </span>
      </div>
    </div>
  );
}
