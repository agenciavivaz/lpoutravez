import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Stepper de onboarding (registry/onboarding-stepper.json): seis etapas retomáveis. */
export function OnboardingStepper({
  steps,
  current,
  orientation = 'vertical',
  className,
}: {
  steps: readonly string[];
  /** Etapa atual, começando em 1. */
  current: number;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}) {
  return (
    <ol
      data-slot="onboarding-stepper"
      className={cn(
        orientation === 'vertical' ? 'grid gap-2.5' : 'flex flex-wrap gap-x-4 gap-y-2',
        className,
      )}
    >
      {steps.map((step, index) => {
        const n = index + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={step}
            className="flex items-center gap-2.5"
            aria-current={active ? 'step' : undefined}
          >
            <span
              className={cn(
                'grid size-8 shrink-0 place-items-center rounded-full border text-[11px] font-extrabold tabular-nums',
                done && 'bg-success border-success text-white',
                active && 'bg-primary border-primary text-primary-foreground',
                !done && !active && 'border-border text-muted-foreground',
              )}
            >
              {done ? <Check className="size-4" aria-hidden /> : n}
            </span>
            <span
              className={cn(
                'text-sm',
                active ? 'font-extrabold' : 'text-muted-foreground font-semibold',
              )}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
