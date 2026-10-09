'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';
import { ComparisonCell, type ComparisonValue } from './comparison-cell';

const OURS = 3;
const ALTERNATIVES = [0, 1, 2];

/**
 * Comparação no mobile (PRD v2 9.10): abas com as três alternativas, sempre contra a coluna
 * Outra Vez. Abas com setas, Home e End.
 */
export function ComparisonTabs() {
  const t = copy.comparison;
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = ALTERNATIVES.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={t.ui.tabsLabel} className="flex flex-wrap gap-2">
        {ALTERNATIVES.map((column, index) => {
          const active = index === selected;
          return (
            <button
              key={column}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              id={`comparacao-tab-${column}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="comparacao-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => onKey(event, index)}
              className={cn(
                'min-h-11 rounded-full border px-4 text-sm font-bold',
                active
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:bg-secondary',
              )}
            >
              {t.columns[column]}
            </button>
          );
        })}
      </div>
      <div
        id="comparacao-panel"
        role="tabpanel"
        aria-labelledby={`comparacao-tab-${selected}`}
        className="bg-card border-border mt-4 rounded-[20px] border"
      >
        <div className="border-border grid grid-cols-[minmax(0,1fr)_88px_88px] gap-2 border-b px-4 py-3 text-xs font-bold">
          <span />
          <span className="text-foreground">{t.columns[ALTERNATIVES[selected]!]}</span>
          <span className="text-ink-900">{t.columns[OURS]}</span>
        </div>
        <dl>
          {t.rows.map((row) => (
            <div
              key={row.label}
              className="border-border grid grid-cols-[minmax(0,1fr)_88px_88px] items-start gap-2 border-b px-4 py-3 text-sm last:border-b-0"
            >
              <dt className="text-ink-900 font-semibold">{row.label}</dt>
              <dd>
                <ComparisonCell value={row.cells[ALTERNATIVES[selected]!] as ComparisonValue} />
              </dd>
              <dd>
                <ComparisonCell value={row.cells[OURS] as ComparisonValue} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
