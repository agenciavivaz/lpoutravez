import { Ban, CircleCheck, CircleQuestionMark, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ConsentState = 'opted_in' | 'transactional_only' | 'opted_out' | 'unknown';

const states = {
  opted_in: { label: 'Aceitou novidades', Icon: CircleCheck, tone: 'text-success bg-success/10' },
  transactional_only: { label: 'Só avisos do pedido', Icon: Info, tone: 'text-info bg-info/10' },
  opted_out: { label: 'Não quer mensagens', Icon: Ban, tone: 'text-destructive bg-destructive/10' },
  unknown: {
    label: 'Ainda não contatado',
    Icon: CircleQuestionMark,
    tone: 'text-muted-foreground bg-muted',
  },
} as const;

/** Status de consentimento (registry/consent-status.json): sempre ícone + texto + cor. */
export function ConsentStatus({ state, className }: { state: ConsentState; className?: string }) {
  const { label, Icon, tone } = states[state];
  return (
    <span
      data-slot="consent-status"
      className={cn(
        'border-border inline-flex min-h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-extrabold',
        tone,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {label}
    </span>
  );
}
