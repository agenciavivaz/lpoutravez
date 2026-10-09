import { Plug } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { MARKETPLACES } from '@/lib/brands';
import { BrandMark } from '@/components/brand-mark';
import { MarqueePause } from './marquee-pause';

function Brands({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-x-8 gap-y-3 pr-8 lg:flex-wrap lg:gap-x-9 lg:pr-0"
    >
      {MARKETPLACES.map((brand) => (
        <li key={brand.id} className="flex h-7 items-center">
          <BrandMark brand={brand} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Faixa "Funciona com" (PRD v2 7, 9.2 e 11.3.2). Mobile: rolagem lenta e pausável (sem
 * movimento com prefers-reduced-motion). Desktop: estática e centralizada.
 */
export function ChannelBar() {
  const t = copy.logoStrip;
  return (
    <section aria-label={t.ariaLabel} className="bg-warm-100 border-border border-y">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-6 sm:px-6 lg:items-center lg:px-8 lg:py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
          <p className="text-foreground shrink-0 text-sm font-bold">{t.label}</p>
          {/* Mobile */}
          <div data-marquee data-paused="false" className="flex items-center gap-2 lg:hidden">
            <div className="-ml-4 min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%-24px),transparent)] pl-4">
              <div data-marquee-track className="flex w-max">
                <Brands />
                <Brands hidden />
              </div>
            </div>
            <MarqueePause />
          </div>
          {/* Desktop */}
          <div className="hidden lg:block">
            <Brands />
          </div>
        </div>
        <div className="text-muted-foreground flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
          <p>{t.more}</p>
          <span aria-hidden className="bg-border hidden h-4 w-px sm:block" />
          <p className="text-ink-900 flex items-center gap-2 font-bold">
            <Plug className="size-4" aria-hidden />
            {t.erp}
          </p>
        </div>
      </div>
    </section>
  );
}
