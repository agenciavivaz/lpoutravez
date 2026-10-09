import { copy } from '@/lib/copy/pt-BR';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icon';
import { Section, SectionHeading } from '@/components/section';

export function Benefits() {
  const t = copy.benefits;
  return (
    <Section id="o-que-muda" labelledBy="o-que-muda-title" className="bg-warm-100">
      <SectionHeading id="o-que-muda-title" eyebrow={t.eyebrow} title={t.h2} />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {t.cards.map((card) => {
          if (card.kind === 'icon') {
            return (
              <li
                key={card.title}
                className="bg-card border-border rounded-[20px] border p-6 sm:p-7"
              >
                <span className="bg-ink-50 text-ink-900 grid size-11 place-items-center rounded-[14px]">
                  <Icon name={card.icon} className="size-5" />
                </span>
                <h3 className="text-ink-900 mt-5 text-xl font-bold">{card.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">{card.text}</p>
              </li>
            );
          }
          const ink = card.kind === 'number-ink';
          return (
            <li
              key={card.title}
              className={cn(
                'relative overflow-hidden rounded-[24px] p-6 sm:p-7',
                ink ? 'bg-ink-900 text-white' : 'bg-coral-100 text-ink-900',
              )}
            >
              <h3 className="text-xl font-bold">
                <span
                  className={cn(
                    'block text-[44px] leading-none font-extrabold tracking-[-0.035em] tabular-nums sm:text-[56px]',
                    ink ? 'text-success-300' : 'text-ink-900',
                  )}
                >
                  {card.number}
                </span>
                <span className="mt-3 block">{card.title}</span>
              </h3>
              <p className={cn('mt-2 leading-relaxed', ink ? 'text-ink-100' : 'text-warm-800')}>
                {card.text}
              </p>
              <p className={cn('mt-4 text-sm italic', ink ? 'text-ink-200' : 'text-warm-700')}>
                {t.illustrative}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
