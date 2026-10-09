import { Info } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { Icon } from '@/components/icon';
import { Section, SectionHeading } from '@/components/section';

/** Rota de recompra (PRD v2 5.2 e 9.5): você decide para onde cada cliente volta. */
export function Route() {
  const t = copy.route;
  return (
    <Section id="rota-de-recompra" labelledBy="rota-title" className="bg-warm-100">
      <SectionHeading id="rota-title" eyebrow={t.eyebrow} title={t.h2} subtitle={t.subtitle} />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {t.cards.map((card, index) => (
          <li
            key={card.id}
            data-route={card.id}
            className="bg-card border-border flex flex-col rounded-[20px] border p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="bg-ink-50 text-ink-900 grid size-11 place-items-center rounded-[14px]">
                <Icon name={card.icon} className="size-5" />
              </span>
              {index === 0 ? (
                <span className="bg-ink-50 text-ink-900 rounded-full px-3 py-1 text-xs font-bold">
                  {t.defaultBadge}
                </span>
              ) : null}
            </div>
            <h3 className="text-ink-900 mt-5 text-xl font-bold">{card.title}</h3>
            <dl className="mt-3 grid gap-3 text-[15px] leading-relaxed">
              <div>
                <dt className="text-foreground font-bold">{t.ui.when}</dt>
                <dd className="text-muted-foreground">{card.when}.</dd>
              </div>
              <div>
                <dt className="text-foreground font-bold">{t.ui.gets}</dt>
                <dd className="text-muted-foreground">{card.gets}.</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <p className="text-ink-900 mt-8 flex gap-3 font-semibold">
        <Info className="mt-0.5 size-5 shrink-0" aria-hidden />
        {t.note}
      </p>
    </Section>
  );
}
