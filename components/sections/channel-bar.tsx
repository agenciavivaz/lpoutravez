import { Plug } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { MARKETPLACES } from '@/lib/brands';
import { BrandMark } from '@/components/brand-mark';

/** Faixa "Funciona com" (PRD v2 7 e 9.2): marketplaces, depois os ERPs. Centralizada. */
export function ChannelBar() {
  const t = copy.logoStrip;
  return (
    <section aria-label={t.ariaLabel} className="bg-warm-100 border-border border-y">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-6 sm:px-6 lg:items-center lg:px-8 lg:py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
          <p className="text-foreground shrink-0 text-sm font-bold">{t.label}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-9">
            {MARKETPLACES.map((brand) => (
              <li key={brand.id} className="flex h-7 items-center">
                <BrandMark brand={brand} />
              </li>
            ))}
          </ul>
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
