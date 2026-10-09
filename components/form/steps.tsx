import type { FormEvent, ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import type { ContactInput, FieldErrors, StoreInput } from '@/lib/validation/demo';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { ChoiceGroup, FieldError, SelectField, TextField } from './fields';

const f = copy.form;

export const EMPTY_CONTACT: ContactInput = { name: '', whatsapp: '', email: '', consent: false };
export const EMPTY_STORE: StoreInput = {
  site: '',
  ordersRange: '',
  erp: '',
  erpOther: '',
};

function StepHeader({ indicator, children }: { indicator: string; children?: ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <p className="text-muted-foreground text-sm font-bold tabular-nums">{indicator}</p>
      {children}
    </div>
  );
}

/** Honeypot (PRD 9.6): invisível e fora da ordem de tabulação. */
function Honeypot({ value, onChange }: { value: string; onChange?: (value: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company_website">Site da empresa</label>
      <input
        id="company_website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        readOnly={!onChange}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      />
    </div>
  );
}

export type ContactStepProps = {
  values: ContactInput;
  errors: FieldErrors<ContactInput>;
  honeypot: string;
  pending?: boolean;
  formError?: string;
  handlers?: {
    onChange: <K extends keyof ContactInput>(field: K, value: ContactInput[K]) => void;
    onHoneypot: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onFirstFocus: () => void;
  };
};

/** Etapa 1: contato (PRD 9.2). */
export function ContactStep({
  values,
  errors,
  honeypot,
  pending,
  formError,
  handlers,
}: ContactStepProps) {
  const t = f.step1;
  const readOnly = !handlers;
  return (
    <form
      noValidate
      onSubmit={handlers?.onSubmit}
      onFocus={handlers?.onFirstFocus}
      className="relative"
    >
      <StepHeader indicator={t.indicator} />
      <div className="grid gap-4">
        <TextField
          id="demo-name"
          data-first-field
          label={t.name}
          autoComplete="name"
          value={values.name}
          readOnly={readOnly}
          onChange={handlers ? (e) => handlers.onChange('name', e.target.value) : undefined}
          error={errors.name}
        />
        <TextField
          id="demo-whatsapp"
          label={t.whatsapp}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 98765-4321"
          value={values.whatsapp}
          readOnly={readOnly}
          onChange={handlers ? (e) => handlers.onChange('whatsapp', e.target.value) : undefined}
          error={errors.whatsapp}
        />
        <TextField
          id="demo-email"
          label={t.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          readOnly={readOnly}
          onChange={handlers ? (e) => handlers.onChange('email', e.target.value) : undefined}
          error={errors.email}
        />
        <div>
          <label
            htmlFor="demo-consent"
            className="flex min-h-11 cursor-pointer items-start gap-3 py-1 text-sm"
          >
            <input
              id="demo-consent"
              type="checkbox"
              checked={values.consent}
              readOnly={readOnly}
              onChange={
                handlers ? (e) => handlers.onChange('consent', e.target.checked) : undefined
              }
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? 'demo-consent-error' : undefined}
              className="mt-0.5 size-5 shrink-0 accent-[var(--color-ink-900)]"
            />
            <span className="text-foreground leading-snug">
              {t.consentBefore}
              <a
                href="/privacidade"
                target="_blank"
                className="text-primary font-bold underline underline-offset-2"
              >
                {t.consentLink}
              </a>
              {t.consentAfter}
            </span>
          </label>
          <FieldError id="demo-consent-error" message={errors.consent} />
        </div>
      </div>
      <Honeypot value={honeypot} onChange={handlers?.onHoneypot} />
      {formError ? (
        <p role="alert" className="text-destructive mt-4 text-sm font-semibold">
          {formError}
        </p>
      ) : null}
      <button
        type="submit"
        className={cn(buttonVariants({ size: 'lg' }), 'mt-6 w-full')}
        disabled={pending}
      >
        {pending ? f.ui.sending : t.submit}
      </button>
    </form>
  );
}

export type StoreStepProps = {
  values: StoreInput;
  errors: FieldErrors<StoreInput>;
  pending?: boolean;
  formError?: string;
  handlers: {
    onChange: <K extends keyof StoreInput>(field: K, value: StoreInput[K]) => void;
    onBack: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  };
};

/** Etapa 2: site, ERP e pedidos por mês (PRD v2 9.13). Só existe na versão interativa. */
export function StoreStep({ values, errors, pending, formError, handlers }: StoreStepProps) {
  const t = f.step2;
  return (
    <form noValidate onSubmit={handlers.onSubmit}>
      <StepHeader indicator={t.indicator}>
        <button
          type="button"
          onClick={handlers.onBack}
          className="text-primary -mr-2 inline-flex min-h-11 items-center gap-1 rounded-[10px] px-2 text-sm font-bold"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t.back}
        </button>
      </StepHeader>
      <div className="grid gap-5">
        <TextField
          id="demo-site"
          label={t.site}
          hint={<span className="text-muted-foreground font-normal"> ({f.ui.optional})</span>}
          autoComplete="url"
          value={values.site}
          onChange={(e) => handlers.onChange('site', e.target.value)}
        />
        <ChoiceGroup
          id="demo-erp"
          legend={t.erp}
          type="radio"
          name="erp"
          appearance="list"
          options={t.erpOptions}
          selected={values.erp ? [values.erp] : []}
          onToggle={(value) => handlers.onChange('erp', value)}
          error={errors.erp}
        />
        {values.erp === 'outro' ? (
          <TextField
            id="demo-erp-other"
            label={t.erpOther}
            hint={<span className="text-muted-foreground font-normal"> ({f.ui.optional})</span>}
            value={values.erpOther}
            onChange={(e) => handlers.onChange('erpOther', e.target.value)}
          />
        ) : null}
        <SelectField
          id="demo-orders"
          label={t.orders}
          placeholder={f.ui.selectPlaceholder}
          options={t.ordersOptions}
          value={values.ordersRange}
          onChange={(e) => handlers.onChange('ordersRange', e.target.value)}
          error={errors.ordersRange}
        />
      </div>
      {formError ? (
        <p role="alert" className="text-destructive mt-4 text-sm font-semibold">
          {formError}
        </p>
      ) : null}
      <button
        type="submit"
        className={cn(buttonVariants({ size: 'lg' }), 'mt-6 w-full')}
        disabled={pending}
      >
        {pending ? f.ui.sending : t.submit}
      </button>
    </form>
  );
}
