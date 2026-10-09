import { CircleCheck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type IntegrationHealthProps = {
  name: string;
  status: 'connected' | 'reconnect';
  className?: string;
};

/** Saúde de integração (registry/integration-health.json): ícone + texto + cor. */
export function IntegrationHealth({ name, status, className }: IntegrationHealthProps) {
  const ok = status === 'connected';
  const Icon = ok ? CircleCheck : RefreshCw;
  return (
    <div
      data-slot="integration-health"
      className={cn(
        'border-border bg-card flex items-center justify-between gap-3 rounded-[14px] border px-3.5 py-3',
        className,
      )}
    >
      <strong className="text-sm">{name}</strong>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-xs font-extrabold',
          ok ? 'text-success' : 'text-warning',
        )}
      >
        <Icon className="size-4" aria-hidden />
        {ok ? 'Conectado' : 'Precisa reconectar'}
      </span>
    </div>
  );
}
