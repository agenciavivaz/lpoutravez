'use client';

import { useEffect, useState } from 'react';
import { copy } from '@/lib/copy/pt-BR';
import { CONSENT_OPEN_EVENT, readConsent, saveConsent, type ConsentChoice } from '@/lib/consent';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';

const t = copy.consent;

/** Banner LGPD próprio (PRD 12.1): Aceitar todos · Só os necessários · Configurar. */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice>({ analytics: false, ads: false });

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => {
      setChoice(readConsent() ?? { analytics: false, ads: false });
      setConfiguring(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (next: ConsentChoice) => {
    saveConsent(next);
    setOpen(false);
    setConfiguring(false);
  };

  const categories = [
    { key: 'analytics', label: t.ui.analytics, text: t.ui.analyticsText },
    { key: 'ads', label: t.ui.ads, text: t.ui.adsText },
  ] as const;

  return (
    <section
      role="region"
      aria-label={t.ui.region}
      data-slot="consent-banner"
      className="bg-card text-foreground border-border fixed inset-x-3 bottom-3 z-50 mx-auto max-w-[560px] rounded-[20px] border p-5 shadow-[0_18px_50px_rgba(24,24,23,0.22)] sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-sm leading-relaxed">{t.text}</p>
      {configuring ? (
        <fieldset className="mt-4 grid gap-2">
          <legend className="sr-only">{t.configure}</legend>
          <label className="border-border flex min-h-11 items-start gap-3 rounded-[12px] border p-3 opacity-80">
            <input
              type="checkbox"
              checked
              disabled
              className="mt-0.5 size-5 accent-[var(--color-ink-900)]"
            />
            <span className="text-sm">
              <b className="block">{t.ui.necessary}</b>
              <span className="text-muted-foreground">{t.ui.necessaryText}</span>
            </span>
          </label>
          {categories.map((category) => (
            <label
              key={category.key}
              className="border-border hover:bg-secondary flex min-h-11 cursor-pointer items-start gap-3 rounded-[12px] border p-3"
            >
              <input
                type="checkbox"
                checked={choice[category.key]}
                onChange={(event) =>
                  setChoice((c) => ({ ...c, [category.key]: event.target.checked }))
                }
                className="mt-0.5 size-5 accent-[var(--color-ink-900)]"
              />
              <span className="text-sm">
                <b className="block">{category.label}</b>
                <span className="text-muted-foreground">{category.text}</span>
              </span>
            </label>
          ))}
        </fieldset>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {configuring ? (
          <button type="button" className={cn(buttonVariants())} onClick={() => decide(choice)}>
            {t.ui.save}
          </button>
        ) : (
          <button
            type="button"
            className={cn(buttonVariants())}
            onClick={() => decide({ analytics: true, ads: true })}
          >
            {t.acceptAll}
          </button>
        )}
        <button
          type="button"
          className={cn(buttonVariants({ variant: 'outline' }))}
          onClick={() => decide({ analytics: false, ads: false })}
        >
          {t.necessaryOnly}
        </button>
        {!configuring ? (
          <button
            type="button"
            className={cn(buttonVariants({ variant: 'ghost' }), 'underline underline-offset-4')}
            onClick={() => setConfiguring(true)}
          >
            {t.configure}
          </button>
        ) : null}
      </div>
    </section>
  );
}
