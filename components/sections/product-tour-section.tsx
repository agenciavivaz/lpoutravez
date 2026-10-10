import { copy } from '@/lib/copy/pt-BR';
import { CtaLink } from '@/components/cta-link';
import { Section, SectionHeading } from '@/components/section';
import { TourLoader } from '@/components/tour/tour-loader';
import { TourView } from '@/components/tour/tour-view';

/** Tour "Por dentro" (PRD v2 9.7), em fundo claro: o escuro fica com a calculadora e o form. */
export function ProductTourSection() {
  const t = copy.tour;
  return (
    <Section id="por-dentro" labelledBy="por-dentro-title" className="bg-warm-100">
      <SectionHeading
        id="por-dentro-title"
        eyebrow={t.eyebrow}
        title={t.h2}
        subtitle={t.subtitle}
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
        <p className="text-muted-foreground text-[13px]">{t.sampleLabel}</p>
        <CtaLink location="tour">{t.cta}</CtaLink>
      </div>
    </Section>
  );
}
