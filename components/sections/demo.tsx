import { copy } from '@/lib/copy/pt-BR';
import { site } from '@/lib/site';
import { Icon } from '@/components/icon';
import { CtaLink } from '@/components/cta-link';
import { Section, SectionHeading } from '@/components/section';

export function Demo() {
  const t = copy.demo;
  return (
    <Section id="demo" labelledBy="demo-title" className="bg-coral-100">
      <SectionHeading id="demo-title" eyebrow={t.eyebrow} title={t.h2} />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {t.steps.map((step, index) => (
          <li key={step.title} className="bg-warm-50 rounded-[20px] p-6">
            <span className="bg-ink-900 grid size-10 place-items-center rounded-full font-extrabold text-white tabular-nums">
              {index + 1}
            </span>
            <h3 className="text-ink-900 mt-4 text-lg font-bold">{step.title}</h3>
            <p className="text-warm-800 mt-1 leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>
      <ul className="text-ink-900 mt-8 flex flex-col gap-3 font-bold sm:flex-row sm:flex-wrap sm:gap-x-8">
        {t.facts.map((fact) => (
          <li key={fact.text} className="flex items-center gap-2 tabular-nums">
            <Icon name={fact.icon} className="size-5" />
            {fact.text}
          </li>
        ))}
      </ul>

      {site.features.hostCard || site.features.pilot ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {site.features.hostCard ? (
            <figure className="bg-warm-50 rounded-[20px] p-6">
              <blockquote className="text-ink-900 text-lg leading-relaxed font-semibold">
                {t.host.quote}
              </blockquote>
              <figcaption className="text-warm-800 mt-4 text-sm font-bold">
                {t.host.name}
              </figcaption>
            </figure>
          ) : null}
          {site.features.pilot ? (
            <div className="bg-ink-900 rounded-[20px] p-6 text-white">
              <h3 className="text-xl font-bold">{t.pilot.title}</h3>
              <p className="text-ink-100 mt-2 leading-relaxed">{t.pilot.text}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <CtaLink location="demo" size="lg" className="mt-10">
        {copy.cta.primary}
      </CtaLink>
    </Section>
  );
}
