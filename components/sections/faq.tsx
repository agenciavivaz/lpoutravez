import { ChevronDown } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { Section, SectionHeading } from '@/components/section';
import { FaqTracker } from './faq-tracker';

/**
 * Perguntas frequentes (PRD 6.11). `<details name="faq">` nativo: uma aberta por vez, respostas
 * sempre no HTML (indexáveis), teclado e leitor de tela sem JS.
 */
export function Faq() {
  const t = copy.faq;
  return (
    <Section id="perguntas" labelledBy="perguntas-title" className="bg-warm-100">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
        <SectionHeading id="perguntas-title" eyebrow={t.eyebrow} title={t.h2} />
        <FaqTracker>
          <div className="border-border border-t">
            {t.items.map((item) => (
              <details
                key={item.id}
                name="faq"
                data-question-id={item.id}
                className="group border-border border-b"
              >
                <summary className="text-ink-900 flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-lg font-bold [&::-webkit-details-marker]:hidden">
                  <h3 className="font-bold">{item.q}</h3>
                  <ChevronDown
                    className="text-muted-foreground size-5 shrink-0 transition-transform duration-150 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="text-muted-foreground pb-5 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </FaqTracker>
      </div>
    </Section>
  );
}
