import { copy } from '@/lib/copy/pt-BR';
import { Icon } from '@/components/icon';
import { Section, SectionHeading } from '@/components/section';

export function Safety() {
  const t = copy.safety;
  return (
    <Section
      id="seguranca"
      labelledBy="seguranca-title"
      className="bg-warm-50 border-border border-y"
    >
      <SectionHeading id="seguranca-title" eyebrow={t.eyebrow} title={t.h2} subtitle={t.subtitle} />
      <ul className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-2">
        {t.items.map((item) => (
          <li key={item.title} className="flex gap-4">
            <span className="bg-ink-50 text-ink-900 grid size-11 shrink-0 place-items-center rounded-[14px]">
              <Icon name={item.icon} className="size-5" />
            </span>
            <div>
              <h3 className="text-ink-900 text-lg font-bold">{item.title}</h3>
              <p className="text-muted-foreground mt-1 leading-relaxed">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground mt-10 text-sm">{t.footnote}</p>
    </Section>
  );
}
