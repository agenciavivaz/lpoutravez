import { copy } from '@/lib/copy/pt-BR';
import { CtaLink } from '@/components/cta-link';
import { Section, SectionHeading } from '@/components/section';

/**
 * Faixa "Conheça por dentro" (ink-950). Na Fase 1 a área do tour é um placeholder com a altura
 * final (zero CLS); o tour entra na Fase 2 (PRD 7).
 */
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
      <div
        aria-hidden
        data-slot="tour-placeholder"
        className="mt-10 min-h-[1080px] rounded-[28px] border border-white/10 bg-white/[0.04] lg:min-h-[640px]"
      />
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-warm-400 text-[13px]">{t.sampleLabel}</p>
        <CtaLink location="tour" variant="inverse">
          {t.cta}
        </CtaLink>
      </div>
    </Section>
  );
}
