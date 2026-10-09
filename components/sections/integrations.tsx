import { CheckCircle2, Plug } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { ERPS } from '@/lib/brands';
import { cn } from '@/lib/utils';
import { Section, SectionHeading } from '@/components/section';
import { ErpOtherLink } from './erp-other-link';

/** Integrações (PRD v2 6 e 9.9): Bling ativo, demais ERPs e hubs com API na implantação. */
export function Integrations() {
  const t = copy.integrations;
  return (
    <Section id="integracoes" labelledBy="integracoes-title" className="bg-warm-100">
      <SectionHeading
        id="integracoes-title"
        eyebrow={t.eyebrow}
        title={t.h2}
        subtitle={t.subtitle}
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {ERPS.map((erp) => (
          <li
            key={erp.id}
            data-erp={erp.id}
            className={cn(
              'bg-card flex min-h-[112px] flex-col justify-between gap-3 rounded-[20px] border p-4',
              erp.active ? 'border-ink-900 border-2' : 'border-border',
            )}
          >
            <span className="text-muted-foreground flex h-7 items-center text-lg font-extrabold">
              {erp.name}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-bold',
                erp.active ? 'text-success' : 'text-muted-foreground',
              )}
            >
              {erp.active ? (
                <CheckCircle2 className="size-4 shrink-0" aria-hidden />
              ) : (
                <Plug className="size-4 shrink-0" aria-hidden />
              )}
              {erp.active ? t.active : t.onboarding}
            </span>
          </li>
        ))}
        <li className="bg-ink-50 col-span-2 flex flex-col justify-between gap-4 rounded-[20px] p-5 sm:col-span-3 lg:col-span-4 lg:flex-row lg:items-center">
          <p className="text-ink-900 text-lg font-bold">{t.other.title}</p>
          <ErpOtherLink>{t.other.cta}</ErpOtherLink>
        </li>
      </ul>
    </Section>
  );
}
