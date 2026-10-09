'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { inputs } from '@/lib/simulator/config';
import {
  SIMULATOR_SNAPSHOT_KEY,
  clamp,
  simulate,
  type SimulatorInput,
  type SimulatorResult,
} from '@/lib/simulator/calc';
import { track } from '@/lib/analytics/events';
import { SimulatorView, type DisplayNumbers } from './simulator-view';

export const DEFAULT_INPUT: SimulatorInput = {
  orders: inputs.orders.default,
  ticket: inputs.ticket.default,
  rate: inputs.rate.default,
};

const COUNT_MS = 400;

/** "2.000" → 2000 · "3,5" → 3.5 (formato pt-BR). */
function parseTyped(raw: string): number {
  return Number(raw.replace(/\./g, '').replace(',', '.'));
}

function pick(result: SimulatorResult): DisplayNumbers {
  return {
    revenue: result.revenue,
    boughtAgain: result.boughtAgain,
    totalCost: result.totalCost,
    perReal: result.perReal,
  };
}

/** Contagem de 400 ms só quando os números mudam; sem animação com prefers-reduced-motion. */
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
      const next = {
        revenue: start.revenue + (target.revenue - start.revenue) * e,
        boughtAgain: start.boughtAgain + (target.boughtAgain - start.boughtAgain) * e,
        totalCost: start.totalCost + (target.totalCost - start.totalCost) * e,
        perReal: start.perReal + (target.perReal - start.perReal) * e,
      };
      from.current = next;
      setShown(next);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return shown;
}

export function SimulatorInteractive({
  onChangeDebounced,
}: {
  /** Para o evento `simulator_change` (PRD 12.2), com debounce de 1 s. */
  onChangeDebounced?: (input: SimulatorInput) => void;
}) {
  const [values, setValues] = useState<SimulatorInput>(DEFAULT_INPUT);
  const [drafts, setDrafts] = useState<Partial<Record<keyof SimulatorInput, string>>>({});
  const result = useMemo(() => simulate(values), [values]);
  const target = useMemo(() => pick(result), [result]);
  const display = useCountTo(target);

  // simulator_change com debounce de 1 s (PRD 12.2).
  useEffect(() => {
    if (values === DEFAULT_INPUT) return;
    const timer = setTimeout(() => {
      track({ event: 'simulator_change', ...values });
      onChangeDebounced?.(values);
    }, 1000);
    return () => clearTimeout(timer);
  }, [values, onChangeDebounced]);

  return (
    <SimulatorView
      values={values}
      display={display}
      drafts={drafts}
      handlers={{
        onChange: (field, value) => {
          setDrafts((d) => ({ ...d, [field]: undefined }));
          setValues((v) => ({ ...v, [field]: value }));
        },
        onType: (field, raw) => {
          setDrafts((d) => ({ ...d, [field]: raw }));
          // Atualiza o resultado enquanto digita, se o número já estiver dentro do intervalo.
          const { min, max } = inputs[field];
          const next = parseTyped(raw);
          if (raw.trim() !== '' && Number.isFinite(next) && next >= min && next <= max) {
            setValues((v) => ({ ...v, [field]: next }));
          }
        },
        onCommit: (field, raw) => {
          const { min, max, step } = inputs[field];
          setDrafts((d) => ({ ...d, [field]: undefined }));
          setValues((v) => ({ ...v, [field]: clamp(parseTyped(raw), min, max, step) }));
        },
        onCta: () => {
          // Leva os valores para o formulário: pré-preenche "pedidos por mês" e vira simulator_snapshot.
          try {
            sessionStorage.setItem(SIMULATOR_SNAPSHOT_KEY, JSON.stringify(values));
          } catch {
            // sessionStorage indisponível (modo privado): segue sem pré-preencher.
          }
          window.dispatchEvent(new CustomEvent('ov:simulator-snapshot', { detail: values }));
        },
      }}
    />
  );
}
