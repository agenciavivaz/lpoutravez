import { copy } from '@/lib/copy/pt-BR';
import { Section, SectionHeading } from '@/components/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Faq() {
  const t = copy.faq;
  return (
    <Section id="perguntas" labelledBy="perguntas-title" className="bg-warm-100">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
        <SectionHeading id="perguntas-title" eyebrow={t.eyebrow} title={t.h2} />
        <Accordion type="single" collapsible className="border-border border-t">
          {t.items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-ink-900 text-lg">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
