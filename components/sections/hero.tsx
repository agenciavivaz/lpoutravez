import { copy } from '@/lib/copy/pt-BR';
import { CtaLink } from '@/components/cta-link';
import { Loop } from '@/components/brand/loop';
import { LoopUnderline } from '@/components/brand/loop-underline';

export function Hero() {
  const t = copy.hero;
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="bg-warm-100 relative isolate overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="max-w-[640px]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title" className="display-h1 text-ink-900 mt-4">
            {t.h1Before}
            <span className="relative inline-block whitespace-nowrap">
              <em className="not-italic">{t.h1Highlight}</em>
              <LoopUnderline />
            </span>
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[580px] text-lg leading-relaxed sm:text-xl">
            {t.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink location="hero" size="lg">
              {copy.cta.primary}
            </CtaLink>
            <CtaLink location="hero" target="#por-dentro" variant="outline" size="lg">
              {copy.cta.secondaryHero}
            </CtaLink>
          </div>
          <p className="text-muted-foreground mt-4 text-sm tabular-nums">{t.microcopy}</p>
        </div>

        <div
          data-slot="hero-visual"
          className="relative mx-auto flex aspect-square w-full max-w-[200px] items-center justify-center sm:max-w-[280px] lg:max-w-[420px]"
        >
          <Loop ringColor="var(--color-coral-100)" thickness={13} className="size-full" />
        </div>
      </div>
    </section>
  );
}
