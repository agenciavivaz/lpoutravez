import { copy } from '@/lib/copy/pt-BR';
import { INPUTS, calculate, type CalculatorInput } from '@/lib/calculator';
import { Section, SectionHeading } from '@/components/section';
import { CalculatorLoader } from '@/components/calculator/calculator-loader';
import { CalculatorView } from '@/components/calculator/calculator-view';

/** Faixa "Faça as contas" (azul-tinta, PRD v2 8). Desligável por NEXT_PUBLIC_FEATURE_SIMULATOR. */
export function CalculatorSection() {
  const t = copy.calculator;
  const values: CalculatorInput = {
    orders: INPUTS.orders.default,
    ticket: INPUTS.ticket.default,
    category: INPUTS.category.default,
    ownChannel: INPUTS.ownChannel.default,
  };
  return (
    <Section
      id="faca-as-contas"
      labelledBy="faca-as-contas-title"
      className="bg-ink-900 text-white"
    >
      <SectionHeading
        id="faca-as-contas-title"
        eyebrow={t.eyebrow}
        title={t.h2}
        subtitle={t.subtitle}
        tone="dark"
      />
      <div className="mt-10">
        <CalculatorLoader>
          <CalculatorView values={values} ownChannelOn={false} display={calculate(values)} />
        </CalculatorLoader>
      </div>
    </Section>
  );
}
