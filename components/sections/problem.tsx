import { copy } from '@/lib/copy/pt-BR';
import { Icon } from '@/components/icon';
import { Section, SectionHeading } from '@/components/section';

export function Problem() {
  const t = copy.problem;
  return (
    <Section id="problema" labelledBy="problema-title" className="bg-warm-100">
      <div className="bg-warm-50 border-border rounded-[28px] border px-5 py-10 sm:px-10 lg:px-14 lg:py-14">
        <SectionHeading id="problema-title" eyebrow={t.eyebrow} title={t.h2} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {t.cards.map((card) => (
            <li key={card.title} className="bg-card border-border rounded-[20px] border p-6">
              <span className="bg-ink-50 text-ink-900 grid size-11 place-items-center rounded-[14px]">
                <Icon name={card.icon} className="size-5" />
              </span>
              <h3 className="text-ink-900 mt-5 text-xl font-bold">{card.title}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{card.text}</p>
            </li>
          ))}
        </ul>
        <p className="text-ink-900 mt-10 text-xl font-bold sm:text-2xl">{t.closing}</p>
      </div>
    </Section>
  );
}
