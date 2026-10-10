import { Check, Minus, X } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';

export type ComparisonValue = 'yes' | 'partial' | 'no';

/** Status sempre com ícone + texto + cor (regra do DS). */
export function ComparisonCell({ value }: { value: ComparisonValue }) {
  const label = copy.comparison.values[value];
  const Glyph = value === 'yes' ? Check : value === 'partial' ? Minus : X;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-bold',
        value === 'yes' && 'text-success',
        value === 'partial' && 'text-warning',
        value === 'no' && 'text-muted-foreground',
      )}
    >
      <Glyph className="size-4 shrink-0" aria-hidden />
      {label}
    </span>
  );
}
