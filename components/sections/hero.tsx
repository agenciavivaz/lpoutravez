import { copy } from '@/lib/copy/pt-BR';
import { CtaLink } from '@/components/cta-link';
import { Loop } from '@/components/brand/loop';
import { ChannelChip } from '@/components/outra-vez/channel-chip';
import { KpiCard } from '@/components/outra-vez/kpi-card';
import { WhatsAppPreview, type WhatsAppItem } from '@/components/outra-vez/whatsapp-preview';
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
            <CtaLink location="hero" target="#como-funciona" variant="outline" size="lg">
              {copy.cta.secondaryHero}
            </CtaLink>
          </div>
          <p className="text-muted-foreground mt-4 text-sm tabular-nums">{t.microcopy}</p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

const BUBBLES_START_MS = 200;

function HeroVisual() {
  const v = copy.hero.visual;
  const items: WhatsAppItem[] = [
    { type: 'message', from: 'business', text: v.bubble1, buttons: v.bubble1Buttons },
    { type: 'message', from: 'customer', text: v.reply },
    { type: 'separator', label: v.dateSeparator },
    { type: 'message', from: 'business', text: v.bubble2, buttons: [v.bubble2Button] },
  ];
  // O card "Comprou de novo" entra depois da última bolha; o laço completa a volta junto.
  const finaleMs = BUBBLES_START_MS + items.length * 150 + 150;

  return (
    <figure
      data-slot="hero-visual"
      className="relative mx-auto w-full max-w-[330px] lg:max-w-[360px]"
    >
      <Loop
        ringColor="var(--color-coral-100)"
        thickness={11}
        drawTipDelayMs={finaleMs}
        className="absolute top-[42%] left-1/2 -z-10 size-[125%] max-w-none -translate-x-[40%] -translate-y-1/2"
      />
      <div className="border-warm-900 overflow-hidden rounded-[36px] border-[8px] bg-[#E8F2E7] shadow-[0_18px_50px_rgba(24,24,23,0.18)]">
        <WhatsAppPreview
          storeName={v.storeName}
          items={items}
          animated
          delayMs={BUBBLES_START_MS}
          className="min-h-[600px]"
        />
      </div>
      <KpiCard
        compact
        label={v.kpiLabel}
        value={v.kpiValue}
        tone="money"
        footer={<ChannelChip channel={v.kpiChannel} size="sm" />}
        className="animate-pop-in absolute bottom-6 -left-3 w-[170px] shadow-[0_12px_40px_rgba(24,24,23,0.14)] sm:-left-12"
        style={{ animationDelay: `${finaleMs}ms` }}
      />
      <figcaption className="text-muted-foreground mt-4 text-right text-xs sm:text-center">
        {v.caption}
      </figcaption>
    </figure>
  );
}
