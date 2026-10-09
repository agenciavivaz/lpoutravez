import { Check, Minus, X } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';
import { Section, SectionHeading } from '@/components/section';

type Value = 'yes' | 'partial' | 'no';

const OURS = 3;

function Cell({ value }: { value: Value }) {
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

export function Comparison() {
  const t = copy.comparison;
  return (
    <Section id="comparacao" labelledBy="comparacao-title" className="bg-warm-100">
      <SectionHeading id="comparacao-title" eyebrow={t.eyebrow} title={t.h2} />

      {/* Desktop: tabela. */}
      <div className="mt-10 hidden lg:block">
        <table className="w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              <td className="w-[34%]" />
              {t.columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={cn(
                    'px-4 py-4 align-bottom text-base font-bold',
                    index === OURS
                      ? 'bg-ink-50 border-ink-900 text-ink-900 rounded-t-[20px] border-x-2 border-t-2 text-lg font-extrabold'
                      : 'text-foreground',
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row, rowIndex) => {
              const last = rowIndex === t.rows.length - 1;
              return (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className="border-border text-ink-900 border-t py-4 pr-4 text-[15px] font-semibold"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((value, index) => (
                    <td
                      key={t.columns[index]}
                      className={cn(
                        'border-border border-t px-4 py-4',
                        index === OURS &&
                          cn(
                            'bg-ink-50 border-x-ink-900 border-x-2',
                            last && 'border-b-ink-900 rounded-b-[20px] border-b-2',
                          ),
                      )}
                    >
                      <Cell value={value as Value} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: um card por coluna, sem rolagem horizontal. Outra Vez primeiro. */}
      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:hidden">
        {[OURS, 0, 1, 2].map((columnIndex) => {
          const ours = columnIndex === OURS;
          return (
            <li
              key={t.columns[columnIndex]}
              className={cn(
                'rounded-[20px] border p-5',
                ours ? 'bg-ink-50 border-ink-900 border-2' : 'bg-card border-border',
              )}
            >
              <h3
                className={cn('text-lg font-extrabold', ours ? 'text-ink-900' : 'text-foreground')}
              >
                {t.columns[columnIndex]}
              </h3>
              <dl className="mt-3 grid gap-3">
                {t.rows.map((row) => (
                  <div key={row.label} className="border-border flex flex-col gap-1 border-t pt-3">
                    <dt className="text-sm">{row.label}</dt>
                    <dd className="text-sm">
                      <Cell value={row.cells[columnIndex] as Value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
