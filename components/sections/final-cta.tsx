import { Check } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { site, whatsappHref } from '@/lib/site';
import { Loop } from '@/components/brand/loop';

/** Faixa final (#agendar). O formulário entra na Fase 4 (PRD 9). */
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
        className="absolute -right-44 -bottom-44 -z-10 size-[340px] sm:-right-24 sm:-bottom-28 sm:size-[460px]"
      />
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-[640px]">
          <p className="eyebrow eyebrow-on-dark">{t.eyebrow}</p>
          <h2 id="agendar-title" className="section-h2 mt-4 text-white">
            {t.h2}
          </h2>
          <p className="text-ink-100 mt-4 text-lg">{t.subtitle}</p>
          <ul className="mt-8 grid gap-3">
            {t.checks.map((item) => (
              <li key={item} className="flex items-center gap-3 font-semibold">
                <Check className="text-coral-300 size-5 shrink-0" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          {site.whatsappNumber ? (
            <a
              href={whatsappHref(site.whatsappNumber, t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-whatsapp-location="final"
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
            >
              {t.whatsapp}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
