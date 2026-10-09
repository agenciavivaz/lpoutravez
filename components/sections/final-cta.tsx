import { Check } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { Loop } from '@/components/brand/loop';
import { WhatsAppLink } from '@/components/whatsapp-link';
import { DemoFormLoader } from '@/components/form/demo-form-loader';
import { ContactStep, EMPTY_CONTACT } from '@/components/form/steps';

/** CTA final + formulário de agendamento (#agendar, PRD 6.12 e 9). */
export function FinalCta() {
  const t = copy.finalCta;
  return (
    <section
      id="agendar"
      aria-labelledby="agendar-title"
      className="bg-ink-900 relative isolate overflow-hidden text-white"
    >
      <Loop
        ringColor="rgb(255 255 255 / 0.12)"
        thickness={12}
        className="absolute -top-40 -right-40 -z-10 size-[340px] sm:-top-32 sm:-right-28 sm:size-[460px]"
      />
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-x-16 lg:px-8 lg:py-24">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="eyebrow eyebrow-on-dark">{t.eyebrow}</p>
          <h2 id="agendar-title" tabIndex={-1} className="section-h2 mt-4 text-white outline-none">
            {t.h2}
          </h2>
          <p className="text-ink-100 mt-4 text-lg">{t.subtitle}</p>
        </div>

        <div className="bg-warm-50 text-foreground rounded-[24px] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <DemoFormLoader>
            <div id="demo-form-card" data-step="contact">
              <ContactStep values={EMPTY_CONTACT} errors={{}} honeypot="" />
            </div>
          </DemoFormLoader>
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <ul className="grid gap-3">
            {t.checks.map((item) => (
              <li key={item} className="flex items-center gap-3 font-semibold">
                <Check className="text-coral-300 size-5 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <WhatsAppLink location="final" className="mt-8 text-white">
            {t.whatsapp}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
