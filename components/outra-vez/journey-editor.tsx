import { Clock, GitBranch, LogOut, Send, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = { type: string; text: string; yes?: string; no?: string };

const icons: Record<string, typeof Zap> = {
  Gatilho: Zap,
  Esperar: Clock,
  Condição: GitBranch,
  Enviar: Send,
  Sair: LogOut,
};

/** Editor de régua vertical (registry/journey-editor.json), mobile-first. */
export function JourneyEditor({
  trigger,
  steps,
  className,
}: {
  trigger: Step;
  steps: readonly Step[];
  className?: string;
}) {
  const all = [trigger, ...steps];
  return (
    <ol data-slot="journey-editor" className={cn('relative grid gap-4', className)}>
      {all.map((step, index) => {
        const Icon = icons[step.type] ?? Zap;
        const isTrigger = index === 0;
        return (
          <li key={`${step.type}-${index}`} className="relative">
            {index < all.length - 1 ? (
              <span aria-hidden className="bg-border absolute top-full left-1/2 h-4 w-px" />
            ) : null}
            <div
              className={cn(
                'bg-card rounded-[14px] border px-4 py-3',
                isTrigger ? 'border-primary border-2' : 'border-border',
              )}
            >
              <p className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.12em] uppercase">
                <Icon className="size-3.5" aria-hidden />
                {step.type}
              </p>
              <p className="mt-1 text-sm font-bold">{step.text}</p>
              {step.yes ? (
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold">
                  <span className="text-success bg-success/10 rounded-full px-2 py-0.5">
                    {step.yes}
                  </span>
                  <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                    {step.no}
                  </span>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
