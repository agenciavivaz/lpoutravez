import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { Section, SectionHeading } from '@/components/section';
import { LoopStage } from './how-it-works-loop';

/**
 * Como funciona (PRD v2 5.1, 9.4 e 11.3.3): linha do tempo vertical no mobile e horizontal no
 * desktop. A seta coral liga o passo 5 de volta ao 3: o que voltou alimenta a próxima previsão.
 */
export function HowItWorks() {
  const t = copy.howItWorks;
  const last = t.steps.length;
  return (
    <Section id="como-funciona" labelledBy="como-funciona-title" className="bg-warm-100">
      <div className="bg-card border-border rounded-[28px] border px-5 py-10 sm:px-10 lg:px-14 lg:py-14">
        <SectionHeading
          id="como-funciona-title"
          eyebrow={t.eyebrow}
          title={t.h2}
          subtitle={t.subtitle}
        />
        <LoopStage className="relative mt-10 lg:mt-24">
          {/* Desktop: arco de retorno acima dos nós, do 5 (90%) ao 3 (50%). */}
          <svg
            aria-hidden
            viewBox="0 0 400 70"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -top-[72px] left-[50%] hidden h-[64px] w-[40%] overflow-visible lg:block"
          >
            <path
              data-return-arc
              d="M 400 66 C 400 4, 0 4, 0 58"
              fill="none"
              stroke="var(--color-coral-500)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            data-return-tip
            aria-hidden
            className="border-t-coral-500 absolute -top-[16px] left-[50%] hidden h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[10px] border-x-transparent lg:block"
          />

          <ol className="relative grid lg:grid-cols-5 lg:gap-6">
            {/* Linha que liga os nós (horizontal no desktop). */}
            <span
              aria-hidden
              className="bg-warm-300 absolute top-7 right-[10%] left-[10%] hidden h-0.5 lg:block"
            />
            {t.steps.map((step, index) => {
              const n = index + 1;
              return (
                <li
                  key={step.title}
                  data-step={n}
                  className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:pb-0 lg:text-center"
                >
                  {/* Mobile: linha vertical entre os nós. */}
                  {n < last ? (
                    <span
                      aria-hidden
                      className="bg-warm-300 absolute top-14 bottom-0 left-[27px] w-0.5 lg:hidden"
                    />
                  ) : null}
                  {/* Mobile: seta de retorno do 5 ao 3, pela esquerda dos nós. */}
                  {n >= 3 ? (
                    <span
                      aria-hidden
                      data-return-mobile={n}
                      className={cn(
                        'border-coral-500 absolute -left-3 w-3 border-l-[3px] lg:hidden',
                        n === 3 && 'top-7 bottom-0 rounded-tl-xl border-t-[3px]',
                        n === 4 && 'top-0 bottom-0',
                        n === 5 && 'top-0 h-7 rounded-bl-xl border-b-[3px]',
                      )}
                    >
                      {n === 3 ? (
                        <span className="border-l-coral-500 absolute -top-[8px] -right-[6px] h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent" />
                      ) : null}
                    </span>
                  ) : null}
                  <span
                    data-node={n}
                    className={cn(
                      'text-ink-900 relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2',
                      n >= 3 ? 'border-coral-500 bg-coral-50' : 'border-border bg-warm-50',
                    )}
                  >
                    <Icon name={step.icon} className="size-6" />
                    <span className="bg-ink-900 absolute -top-1 -right-1 grid size-6 place-items-center rounded-full text-xs font-extrabold text-white tabular-nums">
                      {n}
                    </span>
                  </span>
                  <div className="pt-2 lg:pt-5">
                    <h3 className="text-ink-900 text-lg font-bold">{step.title}</h3>
                    <p className="text-muted-foreground mt-1 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </LoopStage>
      </div>
    </Section>
  );
}
