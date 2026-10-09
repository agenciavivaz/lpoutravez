import { copy } from '@/lib/copy/pt-BR';
import { CtaLink } from '@/components/cta-link';
import { Section, SectionHeading } from '@/components/section';
import { TourLoader } from '@/components/tour/tour-loader';
import { TourView } from '@/components/tour/tour-view';

/** Faixa "Conheça por dentro" (ink-950): o produto "acende" (PRD 4.6 e 7). */
export function ProductTourSection() {
  const t = copy.tour;
  return (
    <Section id="por-dentro" labelledBy="por-dentro-title" className="bg-ink-950 text-white">
      <SectionHeading
        id="por-dentro-title"
        eyebrow={t.eyebrow}
        title={t.h2}
        subtitle={t.subtitle}
        tone="dark"
      />
      <div className="mt-10">
        <TourLoader>
          <TourView
            state={{
              tab: 'inicio',
              device: 'desktop',
              theme: 'light',
              active: null,
              open: null,
              animate: false,
            }}
          />
        </TourLoader>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-warm-400 text-[13px]">{t.sampleLabel}</p>
        <CtaLink location="tour" variant="inverse">
          {t.cta}
        </CtaLink>
      </div>
    </Section>
  );
}
