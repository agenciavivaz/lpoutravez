import { CircleCheck, MessageCircle, MousePointerClick, Repeat, ShoppingBag } from 'lucide-react';
import type { TimelineEvent } from '@/lib/mock/loja-exemplo';
import { formatDate, formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';

const kinds = {
  repurchase: { Icon: Repeat, tone: 'text-success border-success' },
  click: { Icon: MousePointerClick, tone: 'text-info border-info' },
  message: { Icon: MessageCircle, tone: 'text-info border-info' },
  order: { Icon: ShoppingBag, tone: 'text-primary border-primary' },
  consent: { Icon: CircleCheck, tone: 'text-success border-success' },
} as const;

function describe(event: TimelineEvent): string {
  const parts: string[] = [event.title];
  if (event.channel) parts.push(event.channel);
  if (event.product) parts.push(event.product);
  if (event.amount !== undefined) parts.push(formatMoney(event.amount));
  return parts.join(' · ');
}

/** Linha do tempo do cliente (registry/customer-timeline.json): pedido, mensagem, clique, recompra. */
export function CustomerTimeline({
  events,
  className,
}: {
  events: readonly TimelineEvent[];
  className?: string;
}) {
  return (
    <ol data-slot="customer-timeline" className={cn('relative grid gap-3.5', className)}>
      <span aria-hidden className="bg-border absolute top-3 bottom-3 left-[13px] w-px" />
      {events.map((event, index) => {
        const { Icon, tone } = kinds[event.kind];
        const highlight = event.kind === 'repurchase' || event.kind === 'consent';
        return (
          <li key={`${event.date}-${index}`} className="relative grid grid-cols-[28px_1fr] gap-3">
            <span
              className={cn(
                'bg-card z-10 grid size-7 place-items-center rounded-full border-2',
                tone,
              )}
            >
              <Icon className="size-3.5" aria-hidden />
            </span>
            <div className="min-w-0 pt-0.5">
              <p
                className={cn(
                  'text-[13px] leading-snug',
                  highlight ? 'font-extrabold' : 'font-semibold',
                )}
              >
                {event.template ? (
                  <>
                    Mensagem <i className="font-mono text-[12px] not-italic">{event.template}</i>{' '}
                    enviada · {event.detail}
                  </>
                ) : (
                  <span className={cn(event.kind === 'repurchase' && 'text-money')}>
                    {describe(event)}
                  </span>
                )}
              </p>
              <p className="text-muted-foreground text-[11px] tabular-nums">
                {formatDate(`${event.date}T12:00:00`)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
