'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { copy, fill } from '@/lib/copy/pt-BR';
import {
  CALCULATOR_SNAPSHOT_KEY,
  INPUTS,
  calculate,
  clampInput,
  formatCompactMoney,
  formatPercent,
  fromSlider,
  type CalculatorInput,
  type CalculatorSnapshot,
} from '@/lib/calculator';
import { formatNumber } from '@/lib/format';
import { track } from '@/lib/analytics/events';
import { CalculatorView, type DisplayNumbers } from './calculator-view';

export const DEFAULT_INPUT: CalculatorInput = {
  orders: INPUTS.orders.default,
  ticket: INPUTS.ticket.default,
  category: INPUTS.category.default,
  ownChannel: INPUTS.ownChannel.default,
};

const COUNT_MS = 400;
const LIVE_DEBOUNCE_MS = 500;
const INTERACT_DEBOUNCE_MS = 1000;
const KEYS = [
  'revenue12m',
  'revenueMonth',
  'shareOfRevenue',
  'customersBack',
  'extraOrders',
  'commissionKept',
] as const;

/** "2.000" → 2000 (formato pt-BR). */
function parseTyped(raw: string): number {
  return Number(raw.replace(/[^\d,]/g, '').replace(',', '.'));
}

/** Contagem de 400 ms quando os números mudam; sem animação com prefers-reduced-motion. */
function useCountTo(target: DisplayNumbers): DisplayNumbers {
  const [shown, setShown] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = from.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = target;
      setShown(target);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / COUNT_MS);
      const e = 1 - (1 - p) ** 3;
      const next = { ...target };
      for (const key of KEYS) next[key] = start[key] + (target[key] - start[key]) * e;
      from.current = next;
      setShown(next);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return shown;
}

export function CalculatorInteractive() {
  const t = copy.calculator;
  const [values, setValues] = useState<CalculatorInput>(DEFAULT_INPUT);
  const [ownChannelOn, setOwnChannelOn] = useState(false);
  const [drafts, setDrafts] = useState<Partial<Record<'orders' | 'ticket', string>>>({});
  const [mathOpen, setMathOpen] = useState(false);
  const [liveText, setLiveText] = useState('');
  const result = useMemo(() => calculate(values), [values]);
  const target = useMemo<DisplayNumbers>(
    () => ({
      revenue12m: result.revenue12m,
      revenueMonth: result.revenueMonth,
      shareOfRevenue: result.shareOfRevenue,
      customersBack: result.customersBack,
      extraOrders: result.extraOrders,
      commissionKept: result.commissionKept,
    }),
    [result],
  );
  const display = useCountTo(target);

  // Resumo para leitor de tela com debounce de 500 ms (PRD v2 11.4).
  useEffect(() => {
    if (values === DEFAULT_INPUT) return;
    const timer = setTimeout(() => {
      setLiveText(
        `${t.outputs.revenue}: ${formatCompactMoney(result.revenue12m)}. ${fill(t.ui.support, {
          perMonth: formatCompactMoney(result.revenueMonth),
          pct: formatPercent(result.shareOfRevenue),
        })} ${t.outputs.customers}: ${formatNumber(Math.round(result.customersBack))}.`,
      );
    }, LIVE_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [values, result, t]);

  // calc_interact com debounce de 1 s (PRD v2 1).
  useEffect(() => {
    if (values === DEFAULT_INPUT) return;
    const timer = setTimeout(() => {
      track({
        event: 'calc_interact',
        orders: values.orders,
        ticket: values.ticket,
        category: values.category,
        own_channel: values.ownChannel,
      });
    }, INTERACT_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [values]);

  const set = (patch: Partial<CalculatorInput>) => setValues((v) => ({ ...v, ...patch }));

  return (
    <CalculatorView
      values={values}
      ownChannelOn={ownChannelOn}
      display={display}
      drafts={drafts}
      mathOpen={mathOpen}
      liveText={liveText}
      handlers={{
        onSlider: (field, position) => {
          const { min, max } = INPUTS[field];
          setDrafts((d) => ({ ...d, [field]: undefined }));
          set({ [field]: fromSlider(position, min, max) });
        },
        onType: (field, raw) => {
          setDrafts((d) => ({ ...d, [field]: raw }));
          // Atualiza o resultado enquanto digita, se o número já estiver dentro da faixa.
          const { min, max } = INPUTS[field];
          const next = parseTyped(raw);
          if (raw.trim() !== '' && Number.isFinite(next) && next >= min && next <= max) {
            set({ [field]: Math.round(next) });
          }
        },
        onCommit: (field, raw) => {
          const { min, max } = INPUTS[field];
          setDrafts((d) => ({ ...d, [field]: undefined }));
          set({ [field]: clampInput(parseTyped(raw), min, max) });
        },
        onCategory: (category) => {
          set({ category });
          track({ event: 'calc_category_change', category });
        },
        onOwnChannelToggle: (on) => {
          setOwnChannelOn(on);
          set({ ownChannel: on ? INPUTS.ownChannel.defaultWhenOn : 0 });
        },
        onOwnChannel: (ownChannel) => set({ ownChannel }),
        onToggleMath: () => setMathOpen((open) => !open),
        onCta: () => {
          track({
            event: 'calc_cta_click',
            orders: values.orders,
            ticket: values.ticket,
            category: values.category,
            own_channel: values.ownChannel,
          });
          // Leva os valores para os campos ocultos do formulário (calc_pedidos, calc_ticket, calc_categoria).
          const snapshot: CalculatorSnapshot = {
            orders: values.orders,
            ticket: values.ticket,
            category: values.category,
          };
          try {
            sessionStorage.setItem(CALCULATOR_SNAPSHOT_KEY, JSON.stringify(snapshot));
          } catch {
            // sessionStorage indisponível (modo privado): segue sem pré-preencher.
          }
          window.dispatchEvent(new CustomEvent('ov:calculator-snapshot', { detail: snapshot }));
        },
      }}
    />
  );
}
