import { copy } from '@/lib/copy/pt-BR';
import { Icon } from '@/components/icon';
import { Section, SectionHeading } from '@/components/section';
import { LoopStage } from './how-it-works-loop';

// Posição de cada nó no anel (viewBox 400×400, centro 200, raio 150), em sentido horário a partir do topo.
const NODES = [
  { x: 200, y: 50 },
  { x: 342.7, y: 153.6 },
  { x: 288.2, y: 321.4 },
  { x: 111.8, y: 321.4 },
  { x: 57.3, y: 153.6 },
];

export function HowItWorks() {
  const t = copy.howItWorks;
  return (
    <Section id="como-funciona" labelledBy="como-funciona-title" className="bg-warm-100">
      <SectionHeading
        id="como-funciona-title"
        eyebrow={t.eyebrow}
        title={t.h2}
        subtitle={t.subtitle}
      />
      <LoopStage className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-center lg:gap-16">
        {/* Desktop: 5 nós em círculo, com o laço coral ligando o último ao primeiro. */}
        <div aria-hidden className="relative hidden aspect-square w-full lg:block">
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="var(--color-warm-300)"
              strokeWidth="3"
            />
            <path
              data-return-arc
              d="M 70.1 125 A 150 150 0 0 1 153.7 57.3"
              fill="none"
              stroke="var(--color-coral-500)"
              strokeWidth="7"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
            />
            <path
              data-return-tip
              d="M 166.6 53.1 L 150.9 48.8 L 156.4 65.9 Z"
              fill="var(--color-coral-500)"
            />
          </svg>
          {t.steps.map((step, index) => {
            const node = NODES[index]!;
            return (
              <span
                key={step.title}
                data-node={index + 1}
                className="bg-card border-border text-ink-900 absolute grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2"
                style={{ left: `${node.x / 4}%`, top: `${node.y / 4}%` }}
              >
                <Icon name={step.icon} className="size-6" />
                <span className="bg-ink-900 absolute -top-1 -right-1 grid size-6 place-items-center rounded-full text-xs font-extrabold text-white tabular-nums">
                  {index + 1}
                </span>
              </span>
            );
          })}
        </div>

        {/* Lista (todas as larguras). No mobile, uma linha coral volta do último nó para o primeiro. */}
        <div className="relative">
          <span
            aria-hidden
            className="border-coral-500 absolute top-6 bottom-6 -left-3 w-4 rounded-l-2xl border-2 border-r-0 lg:hidden"
          >
            <span className="border-l-coral-500 absolute -top-[7px] -right-[7px] h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent" />
          </span>
          <ol className="relative grid gap-6">
            {t.steps.map((step, index) => (
              <li key={step.title} data-step={index + 1} className="relative flex gap-4">
                <span
                  data-node-list={index + 1}
                  className="bg-card border-border text-ink-900 relative grid size-12 shrink-0 place-items-center rounded-full border-2"
                >
                  <Icon name={step.icon} className="size-5" />
                </span>
                <div className="pt-1">
                  <h3 className="text-ink-900 text-lg font-bold">
                    <span className="text-coral-700 mr-2 tabular-nums">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </LoopStage>
    </Section>
  );
}
