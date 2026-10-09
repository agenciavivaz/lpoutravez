import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { copy, fill } from '@/lib/copy/pt-BR';
import {
  ASSUMPTIONS,
  CATEGORIES,
  CATEGORY_IDS,
  INPUTS,
  SLIDER_STEPS,
  SOURCES,
  formatCompactMoney,
  formatPercent,
  toSlider,
  type CalculatorInput,
  type CalculatorResult,
  type CategoryId,
} from '@/lib/calculator';
import { formatMoney, formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';
import { CtaLink } from '@/components/cta-link';

const t = copy.calculator;

type NumberField = 'orders' | 'ticket';

export type CalculatorHandlers = {
  onSlider: (field: NumberField, position: number) => void;
  onType: (field: NumberField, raw: string) => void;
  onCommit: (field: NumberField, raw: string) => void;
  onCategory: (category: CategoryId) => void;
  onOwnChannelToggle: (on: boolean) => void;
  onOwnChannel: (value: number) => void;
  onToggleMath: () => void;
  onCta: () => void;
};

/** Números que podem estar animando (contagem de 400 ms). */
export type DisplayNumbers = Pick<
  CalculatorResult,
  | 'revenue12m'
  | 'revenueMonth'
  | 'shareOfRevenue'
  | 'customersBack'
  | 'extraOrders'
  | 'commissionKept'
>;

const oneDecimal = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1 });
const moneyWhole = (v: number) => formatMoney(Math.round(v)).replace(/,00$/, '');
const pp = (fraction: number) =>
  `${formatNumber(Math.round(fraction * 1000) / 10).replace('.', ',')}%`;

/**
 * Calculadora "Faça as contas" (PRD v2 8). Apresentação sem estado: estática no servidor com os
 * padrões e interativa (CalculatorInteractive) depois do carregamento tardio.
 */
export function CalculatorView({
  values,
  ownChannelOn,
  display,
  drafts,
  mathOpen = false,
  liveText = '',
  handlers,
}: {
  values: CalculatorInput;
  ownChannelOn: boolean;
  display: DisplayNumbers;
  drafts?: Partial<Record<NumberField, string>>;
  mathOpen?: boolean;
  /** Resumo para leitor de tela, atualizado com debounce de 500 ms. */
  liveText?: string;
  handlers?: CalculatorHandlers;
}) {
  const uid = useId();
  const mathId = `${uid}-math`;
  const numberFields: {
    field: NumberField;
    label: string;
    prefix?: string;
    edge: (v: number) => string;
    valueText: (v: number) => string;
  }[] = [
    {
      field: 'orders',
      label: t.inputs.orders,
      edge: (v) => formatNumber(v),
      valueText: (v) => fill(t.ui.ordersValue, { n: formatNumber(v) }),
    },
    {
      field: 'ticket',
      label: t.inputs.ticket,
      prefix: 'R$',
      edge: (v) => `R$ ${formatNumber(v)}`,
      valueText: (v) => fill(t.ui.ticketValue, { v: `R$ ${formatNumber(v)}` }),
    },
  ];

  return (
    <div
      data-slot="calculator"
      className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14"
    >
      {/* Entradas */}
      <div className="grid min-w-0 content-start gap-8">
        {numberFields.map(({ field, label, prefix, edge, valueText }) => {
          const range = INPUTS[field];
          const id = `calc-${field}`;
          return (
            <div key={field}>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor={id} className="text-base font-bold text-white">
                  {label}
                </label>
                <div className="focus-within:border-ink-300 flex h-12 w-36 items-center gap-2 rounded-[12px] border border-white/20 bg-white/10 px-3">
                  {prefix ? <span className="text-ink-200 text-sm font-bold">{prefix}</span> : null}
                  <input
                    id={id}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={drafts?.[field] ?? formatNumber(values[field])}
                    readOnly={!handlers}
                    onChange={handlers ? (e) => handlers.onType(field, e.target.value) : undefined}
                    onBlur={handlers ? (e) => handlers.onCommit(field, e.target.value) : undefined}
                    onKeyDown={
                      handlers
                        ? (e) => {
                            if (e.key === 'Enter') handlers.onCommit(field, e.currentTarget.value);
                          }
                        : undefined
                    }
                    className="h-full min-w-0 flex-1 bg-transparent text-right text-base font-extrabold text-white tabular-nums outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                aria-label={label}
                aria-valuetext={valueText(values[field])}
                min={0}
                max={SLIDER_STEPS}
                step={1}
                value={toSlider(values[field], range.min, range.max)}
                readOnly={!handlers}
                onChange={
                  handlers ? (e) => handlers.onSlider(field, e.target.valueAsNumber) : undefined
                }
                className="mt-2 h-11 w-full cursor-pointer accent-[var(--color-ink-300)]"
              />
              <div className="text-ink-200 flex justify-between text-xs tabular-nums">
                <span>{edge(range.min)}</span>
                <span>{edge(range.max)}</span>
              </div>
            </div>
          );
        })}

        <fieldset>
          <legend className="text-base font-bold text-white">{t.inputs.category}</legend>
          <div
            role="radiogroup"
            aria-label={t.inputs.category}
            className="mt-3 flex flex-wrap gap-2"
          >
            {CATEGORY_IDS.map((id) => {
              const checked = values.category === id;
              return (
                <label
                  key={id}
                  className={cn(
                    'has-[:focus-visible]:ring-ink-300/60 relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-bold transition-colors duration-150 has-[:focus-visible]:ring-[3px]',
                    checked
                      ? 'bg-ink-300 border-ink-300 text-ink-950'
                      : 'text-ink-100 border-white/20 bg-white/5 hover:bg-white/10',
                  )}
                >
                  <input
                    type="radio"
                    name="calc-category"
                    value={id}
                    checked={checked}
                    readOnly={!handlers}
                    onChange={handlers ? () => handlers.onCategory(id) : undefined}
                    className="sr-only"
                  />
                  {t.categories[id]}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <button
            type="button"
            role="switch"
            aria-checked={ownChannelOn}
            onClick={handlers ? () => handlers.onOwnChannelToggle(!ownChannelOn) : undefined}
            className="flex min-h-11 w-full items-center justify-between gap-4 text-left"
          >
            <span className="text-base font-bold text-white">{t.inputs.ownChannelToggle}</span>
            <span
              aria-hidden
              className={cn(
                'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150',
                ownChannelOn ? 'bg-ink-300' : 'bg-white/20',
              )}
            >
              <span
                className={cn(
                  'absolute top-1 size-5 rounded-full bg-white transition-[left] duration-150',
                  ownChannelOn ? 'bg-ink-950 left-6' : 'left-1',
                )}
              />
            </span>
          </button>
          {ownChannelOn ? (
            <div className="mt-4">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="calc-own" className="text-sm font-bold text-white">
                  {t.inputs.ownChannel}
                </label>
                <span className="text-base font-extrabold text-white tabular-nums">
                  {values.ownChannel}%
                </span>
              </div>
              <input
                id="calc-own"
                type="range"
                aria-valuetext={fill(t.ui.ownChannelValue, { n: values.ownChannel })}
                min={INPUTS.ownChannel.min}
                max={INPUTS.ownChannel.max}
                step={INPUTS.ownChannel.step}
                value={values.ownChannel}
                readOnly={!handlers}
                onChange={
                  handlers ? (e) => handlers.onOwnChannel(e.target.valueAsNumber) : undefined
                }
                className="mt-2 h-11 w-full cursor-pointer accent-[var(--color-ink-300)]"
              />
              <div className="text-ink-200 flex justify-between text-xs tabular-nums">
                <span>{INPUTS.ownChannel.min}%</span>
                <span>{INPUTS.ownChannel.max}%</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Resultado */}
      <div className="grid min-w-0 content-start gap-4">
        <p aria-live="polite" className="sr-only">
          {liveText}
        </p>
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 sm:p-7">
          <p className="text-ink-100 text-sm font-bold">{t.outputs.revenue}</p>
          <p
            data-calc="revenue"
            className="text-success-300 mt-3 text-[48px] leading-none font-extrabold tracking-[-0.035em] tabular-nums sm:text-[64px]"
          >
            {formatCompactMoney(display.revenue12m)}
          </p>
          <p className="text-ink-100 mt-4 tabular-nums">
            {fill(t.ui.support, {
              perMonth: formatCompactMoney(display.revenueMonth),
              pct: formatPercent(display.shareOfRevenue),
            })}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Output
            label={t.outputs.customers}
            value={formatNumber(Math.round(display.customersBack))}
          />
          <Output label={t.outputs.orders} value={formatNumber(Math.round(display.extraOrders))} />
          {ownChannelOn ? (
            <Output label={t.outputs.commission} value={moneyWhole(display.commissionKept)} />
          ) : (
            <div className="rounded-[20px] border border-white/10 bg-white/5 p-5">
              <p className="text-ink-100 text-sm font-bold">{t.outputs.commission}</p>
              <button
                type="button"
                onClick={handlers ? () => handlers.onOwnChannelToggle(true) : undefined}
                className="text-ink-200 mt-2 min-h-11 text-left text-sm font-bold underline underline-offset-4 hover:text-white"
              >
                {t.outputs.commissionOff}
              </button>
            </div>
          )}
        </div>

        <div className="rounded-[20px] border border-white/10">
          <button
            type="button"
            aria-expanded={mathOpen}
            aria-controls={mathId}
            onClick={handlers?.onToggleMath}
            className="flex min-h-12 w-full items-center justify-between gap-3 rounded-[20px] px-5 font-bold text-white hover:bg-white/5"
          >
            {t.showMath}
            <ChevronDown
              className={cn('size-5 transition-transform duration-150', mathOpen && 'rotate-180')}
              aria-hidden
            />
          </button>
          <div id={mathId} hidden={!mathOpen} className="grid gap-6 px-5 pt-2 pb-5 text-sm">
            <MathTable
              headers={[
                t.ui.categoryHeader,
                t.ui.benchmarkHeader,
                t.ui.extrasHeader,
                t.ui.sourceHeader,
              ]}
              rows={CATEGORY_IDS.map((id) => [
                t.categories[id],
                pp(CATEGORIES[id].benchmark),
                oneDecimal.format(CATEGORIES[id].extras),
                CATEGORIES[id].source,
              ])}
            />
            <MathTable
              headers={[t.ui.assumptionHeader, t.ui.valueHeader, t.ui.noteHeader]}
              rows={[
                [
                  t.assumptions.uniqueCustomers,
                  pp(ASSUMPTIONS.uniqueCustomers),
                  t.assumptions.uniqueCustomersNote,
                ],
                [
                  t.assumptions.validContact,
                  pp(ASSUMPTIONS.validContact),
                  t.assumptions.validContactNote,
                ],
                [t.assumptions.capture, pp(ASSUMPTIONS.capture), t.assumptions.captureNote],
                [
                  t.assumptions.commission,
                  pp(ASSUMPTIONS.commission),
                  t.assumptions.commissionNote,
                ],
              ]}
            />
            <div>
              <p className="font-bold text-white">{t.ui.formulaTitle}</p>
              <ol className="text-ink-100 mt-2 grid list-decimal gap-1 pl-5 leading-relaxed">
                {t.ui.formula.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-bold text-white">{t.ui.sourcesTitle}</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {SOURCES.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-200 inline-flex min-h-11 items-center underline underline-offset-4 hover:text-white"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-ink-200 text-sm leading-relaxed">{t.disclaimer}</p>
        <CtaLink
          location="simulator"
          variant="inverse"
          size="lg"
          className="justify-self-start text-center whitespace-normal"
          onClick={handlers ? () => handlers.onCta() : undefined}
        >
          {t.cta}
        </CtaLink>
      </div>
    </div>
  );
}

function Output({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 p-5">
      <p className="text-ink-100 text-sm font-bold">{label}</p>
      <p className="mt-2 text-2xl leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums">
        {value}
      </p>
    </div>
  );
}

function MathTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table className="w-full text-left text-[13px] sm:text-sm">
      <thead>
        <tr className="text-ink-200 text-xs">
          {headers.map((h, i) => (
            <th
              key={h}
              scope="col"
              className={cn('pb-2 font-bold', i > 0 && 'pl-3', i === 1 && 'text-right')}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([first, ...rest]) => (
          <tr key={first} className="border-t border-white/10 align-top">
            <th scope="row" className="text-ink-100 py-2 font-medium">
              {first}
            </th>
            {rest.map((cell, i) => (
              <td
                key={i}
                className={cn(
                  'py-2 pl-3 tabular-nums',
                  i === 0 ? 'text-right font-bold text-white' : 'text-ink-200',
                )}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
