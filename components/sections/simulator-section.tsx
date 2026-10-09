import { copy } from '@/lib/copy/pt-BR';
import { inputs } from '@/lib/simulator/config';
import { simulate } from '@/lib/simulator/calc';
import { Section, SectionHeading } from '@/components/section';
import { SimulatorLoader } from '@/components/simulator/simulator-loader';
import { SimulatorView } from '@/components/simulator/simulator-view';

/** Faixa "Quanto pode voltar" (ink-900, PRD 8). Desligável por NEXT_PUBLIC_FEATURE_SIMULATOR. */
export function SimulatorSection() {
  const t = copy.simulator;
  const values = {
    orders: inputs.orders.default,
    ticket: inputs.ticket.default,
    rate: inputs.rate.default,
  };
  const result = simulate(values);
  return (
    <Section id="simulador" labelledBy="simulador-title" className="bg-ink-900 text-white">
      <SectionHeading
        id="simulador-title"
        eyebrow={t.eyebrow}
        title={t.h2}
        subtitle={t.subtitle}
        tone="dark"
      />
      <div className="mt-10">
        <SimulatorLoader>
          <SimulatorView values={values} display={result} />
        </SimulatorLoader>
      </div>
    </Section>
  );
}
