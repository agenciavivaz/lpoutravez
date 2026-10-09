import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';
import { Section, SectionHeading } from '@/components/section';
import { ComparisonCell, type ComparisonValue } from './comparison-cell';
import { ComparisonTabs } from './comparison-tabs';

const OURS = 3;

export function Comparison() {
  const t = copy.comparison;
  return (
    <Section
      id="comparacao"
      labelledBy="comparacao-title"
      className="bg-warm-50 border-border border-y"
    >
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
                      <ComparisonCell value={value as ComparisonValue} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile e tablet: abas, Outra Vez contra uma alternativa por vez. */}
      <div className="mt-10 lg:hidden">
        <ComparisonTabs />
      </div>
    </Section>
  );
}
