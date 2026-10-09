import type { ChangeEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { assumptions, inputs } from '@/lib/simulator/config';
import type { SimulatorInput, SimulatorResult } from '@/lib/simulator/calc';
import { formatMoney, formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';
import { CtaLink } from '@/components/cta-link';

const t = copy.simulator;

type Field = keyof SimulatorInput;

export type SimulatorHandlers = {
  /** Slider: valor já no passo. */
  onChange: (field: Field, value: number) => void;
  /** Campo numérico: texto digitado (rascunho). */
  onType: (field: Field, raw: string) => void;
  onCommit: (field: Field, raw: string) => void;
  onCta: () => void;
};

const money = (value: number) => formatMoney(value);
const wholeMoney = (value: number) => formatMoney(Math.round(value)).replace(/,00$/, '');
const pct = (value: number) => `${String(value).replace('.', ',')}%`;

/** Números que podem estar animando (contagem de 400 ms) — o resto da tela usa `result`. */
export type DisplayNumbers = Pick<
  SimulatorResult,
  'revenue' | 'boughtAgain' | 'totalCost' | 'perReal'
>;

/**
 * Simulador "Quanto pode voltar" (PRD 8). Apresentação sem estado: estático no servidor com os
 * padrões e interativo (SimulatorInteractive) depois do carregamento tardio.
 */
export function SimulatorView({
  values,
  display,
  drafts,
  handlers,
}: {
  values: SimulatorInput;
  display: DisplayNumbers;
  /** Texto em edição nos campos numéricos. */
  drafts?: Partial<Record<Field, string>>;
  handlers?: SimulatorHandlers;
}) {
  const fields: {
    field: Field;
    label: string;
    prefix?: string;
    suffix?: string;
    format: (v: number) => string;
  }[] = [
    { field: 'orders', label: t.inputs.orders, format: (v) => formatNumber(v) },
    {
      field: 'ticket',
      label: t.inputs.ticket,
      prefix: 'R$',
      format: (v) => `R$ ${formatNumber(v)}`,
    },
    { field: 'rate', label: t.inputs.rate, suffix: '%', format: pct },
  ];

  const assumptionRows = [
    [t.assumptions.whatsappFound, `${assumptions.whatsappFound * 100}%`],
    [t.assumptions.acceptNews, `${assumptions.acceptNews * 100}%`],
    [t.assumptions.lookupPrice, money(assumptions.lookupPrice)],
    [
      t.assumptions.utilityMessagePrice,
      `R$ ${String(assumptions.utilityMessagePrice).replace('.', ',')}`,
    ],
    [
      t.assumptions.marketingMessagePrice,
      `R$ ${String(assumptions.marketingMessagePrice).replace('.', ',')}`,
    ],
    [t.assumptions.marketingMessagesPerMonth, String(assumptions.marketingMessagesPerMonth)],
  ] as const;

  return (
    <div
      data-slot="simulator"
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14"
    >
      <div className="grid content-start gap-8">
        {fields.map(({ field, label, prefix, suffix, format }) => {
          const config = inputs[field];
          const id = `sim-${field}`;
          return (
            <div key={field}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor={id} className="text-base font-bold text-white">
                  {label}
                </label>
                <div className="focus-within:border-ink-300 flex items-center gap-2 rounded-[12px] border border-white/20 bg-white/10 px-3">
                  {prefix ? <span className="text-ink-200 text-sm font-bold">{prefix}</span> : null}
                  <input
                    id={id}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={
                      drafts?.[field] ??
                      (field === 'rate'
                        ? String(values[field]).replace('.', ',')
                        : formatNumber(values[field]))
                    }
                    readOnly={!handlers}
                    onChange={
                      handlers
                        ? (event: ChangeEvent<HTMLInputElement>) =>
                            handlers.onType(field, event.target.value)
                        : undefined
                    }
                    onBlur={
                      handlers ? (event) => handlers.onCommit(field, event.target.value) : undefined
                    }
                    className="h-11 w-24 [appearance:textfield] bg-transparent text-right text-base font-extrabold text-white tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  {suffix ? <span className="text-ink-200 text-sm font-bold">{suffix}</span> : null}
                </div>
              </div>
              <input
                type="range"
                aria-label={label}
                aria-valuetext={format(values[field])}
                min={config.min}
                max={config.max}
                step={config.step}
                value={values[field]}
                readOnly={!handlers}
                onChange={
                  handlers
                    ? (event) => handlers.onChange(field, event.target.valueAsNumber)
                    : undefined
                }
                className="mt-2 h-11 w-full cursor-pointer accent-[var(--color-ink-300)]"
              />
              <div className="text-ink-200 flex justify-between text-xs tabular-nums">
                <span>{format(config.min)}</span>
                <span>{format(config.max)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid content-start gap-4">
        <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">
          <Output
            label={t.outputs.revenue}
            value={wholeMoney(display.revenue)}
            className="sm:col-span-2"
            valueClassName="text-success-300 text-[44px] sm:text-[56px]"
          />
          <Output
            label={t.outputs.customers}
            value={formatNumber(Math.round(display.boughtAgain))}
          />
          <Output label={t.outputs.cost} value={money(display.totalCost)} />
          <Output
            label={t.outputs.perReal}
            value={`${money(display.perReal)} ${t.outputs.perRealSuffix}`}
            className="sm:col-span-2"
          />
        </div>

        <details className="group rounded-[20px] border border-white/10 bg-white/5">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 font-bold text-white [&::-webkit-details-marker]:hidden">
            {t.showMath}
            <ChevronDown
              className="size-5 transition-transform duration-150 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ink-200 text-xs">
                <th scope="col" className="px-5 pb-2 font-bold">
                  {t.assumptionsHeader.label}
                </th>
                <th scope="col" className="px-5 pb-2 text-right font-bold">
                  {t.assumptionsHeader.value}
                </th>
              </tr>
            </thead>
            <tbody>
              {assumptionRows.map(([label, value]) => (
                <tr key={label} className="border-t border-white/10">
                  <th scope="row" className="text-ink-100 px-5 py-2.5 font-medium">
                    {label}
                  </th>
                  <td className="px-5 py-2.5 text-right font-bold text-white tabular-nums">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>

        <p className="text-ink-200 text-sm">{t.disclaimer}</p>
        <CtaLink
          location="simulator"
          variant="inverse"
          size="lg"
          className="justify-self-start"
          onClick={handlers ? () => handlers.onCta() : undefined}
        >
          {t.cta}
        </CtaLink>
      </div>
    </div>
  );
}

function Output({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn('rounded-[20px] border border-white/10 bg-white/5 p-5', className)}>
      <p className="text-ink-100 text-sm font-bold">{label}</p>
      <p
        className={cn(
          'mt-2 text-2xl leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums',
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}
