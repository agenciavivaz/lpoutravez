import { copy } from '@/lib/copy/pt-BR';
import { Section, SectionHeading } from '@/components/section';

/** Faixa "Quanto pode voltar" (ink-900). O simulador entra na Fase 3 (PRD 8). */
export function SimulatorSection() {
  const t = copy.simulator;
  return (
    <Section id="simulador" labelledBy="simulador-title" className="bg-ink-900 text-white">
      <SectionHeading
        id="simulador-title"
        eyebrow={t.eyebrow}
        title={t.h2}
        subtitle={t.subtitle}
        tone="dark"
      />
      <div
        aria-hidden
        data-slot="simulator-placeholder"
        className="mt-10 min-h-[900px] rounded-[28px] border border-white/10 bg-white/[0.04] lg:min-h-[480px]"
      />
    </Section>
  );
}
