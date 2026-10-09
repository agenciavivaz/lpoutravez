import type { ComponentProps, ReactNode } from 'react';
import { Check, CircleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Campos do formulário de demo (PRD 9 e 14.2): rótulo sempre visível, erro abaixo do campo com
 * ícone + texto, `aria-invalid` e `aria-describedby`. Sem hooks: rodam no servidor (versão
 * estática) e no cliente.
 */

export const inputClass =
  'border-input bg-card text-foreground placeholder:text-muted-foreground h-12 w-full rounded-[12px] border px-3.5 text-base outline-none transition-colors duration-150 focus-visible:border-primary focus-visible:outline-[3px] focus-visible:outline-offset-0 focus-visible:outline-ring/40 aria-[invalid=true]:border-destructive';

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-destructive mt-1.5 flex items-start gap-1.5 text-sm font-semibold">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

type TextFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
};

export function TextField({ id, label, error, hint, className, ...props }: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-foreground mb-1.5 block text-sm font-bold">
        {label}
        {hint}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClass}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type SelectFieldProps = Omit<ComponentProps<'select'>, 'id'> & {
  id: string;
  label: string;
  error?: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
};

export function SelectField({
  id,
  label,
  error,
  placeholder,
  options,
  className,
  ...props
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-foreground mb-1.5 block text-sm font-bold">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(inputClass, 'appearance-auto pr-2')}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type ChoiceGroupProps = {
  id: string;
  legend: string;
  error?: string;
  type: 'checkbox' | 'radio';
  name: string;
  options: readonly { value: string; label: string }[];
  selected: readonly string[];
  onToggle?: (value: string) => void;
  /** Visual de chip (múltipla escolha) ou lista (escolha única). */
  appearance: 'chips' | 'list';
};

/** Grupo de checkboxes em chips (canais) ou radios em lista (ERP). */
export function ChoiceGroup({
  id,
  legend,
  error,
  type,
  name,
  options,
  selected,
  onToggle,
  appearance,
}: ChoiceGroupProps) {
  const errorId = `${id}-error`;
  return (
    <fieldset
      id={id}
      aria-describedby={error ? errorId : undefined}
      tabIndex={-1}
      className="outline-none"
    >
      <legend className="text-foreground mb-2 block text-sm font-bold">{legend}</legend>
      <div
        className={cn(appearance === 'chips' ? 'flex flex-wrap gap-2' : 'grid grid-cols-2 gap-2')}
      >
        {options.map((option) => {
          const checked = selected.includes(option.value);
          const inputId = `${id}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={cn(
                'has-[:focus-visible]:outline-ring/60 flex min-h-11 cursor-pointer items-center gap-2 border text-sm font-bold transition-colors duration-150 has-[:focus-visible]:outline-[3px]',
                appearance === 'chips' ? 'rounded-full px-3.5' : 'rounded-[12px] px-3',
                checked
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-input bg-card text-foreground hover:bg-secondary',
                error && !checked && 'border-destructive/60',
              )}
            >
              <input
                id={inputId}
                type={type}
                name={name}
                value={option.value}
                checked={checked}
                readOnly={!onToggle}
                onChange={onToggle ? () => onToggle(option.value) : undefined}
                aria-invalid={error ? true : undefined}
                className={cn(
                  'accent-[var(--color-ink-900)]',
                  appearance === 'chips' ? 'sr-only' : 'size-4 shrink-0',
                )}
              />
              {appearance === 'chips' && checked ? (
                <Check className="size-4 shrink-0" aria-hidden />
              ) : null}
              {option.label}
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
