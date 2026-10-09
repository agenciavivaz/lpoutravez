'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { copy, fill } from '@/lib/copy/pt-BR';
import { maskPhoneInput } from '@/lib/phone';
import { track } from '@/lib/analytics/events';
import { captureAttribution, type Attribution } from '@/lib/utm';
import { CALCULATOR_SNAPSHOT_KEY, ordersRange, type CalculatorSnapshot } from '@/lib/calculator';
import {
  validateContact,
  validateStore,
  type ContactInput,
  type FieldErrors,
  type StoreInput,
} from '@/lib/validation/demo';
import { submitContact, submitStore } from '@/actions/demo';
import { ContactStep, EMPTY_CONTACT, EMPTY_STORE, StoreStep } from './steps';
import { CalendarStep, type BookingInfo } from './calendar-step';

type Step = 'contact' | 'store' | 'calendar';

type Saved = {
  requestId: string;
  step: Step;
  contact: ContactInput;
  store: StoreInput;
  renderedAt: number;
};

const STORAGE_KEY = 'ov_demo_form';
/** Passa o e-mail para /obrigado sem colocá-lo na URL (fica fora de analytics e logs). */
const THANK_YOU_KEY = 'ov_demo_thank_you';

const FIELD_ORDER = {
  contact: ['name', 'whatsapp', 'email', 'consent'],
  store: ['storeName', 'marketplaces', 'ordersRange', 'erp'],
} as const;
const FIELD_ID: Record<string, string> = {
  name: 'demo-name',
  whatsapp: 'demo-whatsapp',
  email: 'demo-email',
  consent: 'demo-consent',
  storeName: 'demo-store',
  marketplaces: 'demo-marketplaces',
  ordersRange: 'demo-orders',
  erp: 'demo-erp',
};

function readJson<T>(storage: Storage, key: string): T | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function focusFirstError(step: 'contact' | 'store', errors: Record<string, string | undefined>) {
  const first = FIELD_ORDER[step].find((field) => errors[field]);
  if (!first) return;
  const element = document.getElementById(FIELD_ID[first]!);
  const target =
    element?.tagName === 'FIELDSET' ? element.querySelector<HTMLElement>('input') : element;
  target?.focus();
}

/**
 * Formulário de demo em duas etapas + calendário (PRD 9). Sem banco: cada etapa vai para o
 * CRM pela server action (lib/crm/forward.ts). Estado em sessionStorage para retomar ao recarregar.
 */
export function DemoFormInteractive() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('contact');
  const [requestId, setRequestId] = useState('');
  const [renderedAt, setRenderedAt] = useState(() => Date.now());
  const [contact, setContact] = useState<ContactInput>(EMPTY_CONTACT);
  const [store, setStore] = useState<StoreInput>(EMPTY_STORE);
  const [contactErrors, setContactErrors] = useState<FieldErrors<ContactInput>>({});
  const [storeErrors, setStoreErrors] = useState<FieldErrors<StoreInput>>({});
  const [honeypot, setHoneypot] = useState('');
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [announce, setAnnounce] = useState('');
  /** Campos ocultos vindos da calculadora: calc_pedidos, calc_ticket, calc_categoria. */
  const calculator = useRef<CalculatorSnapshot | null>(null);
  const attribution = useRef<Attribution>({});
  const started = useRef(false);
  const restored = useRef(false);

  // Retoma de onde parou (PRD 9.5) e lê os valores do simulador.
  useEffect(() => {
    attribution.current = captureAttribution();
    const saved = readJson<Saved>(sessionStorage, STORAGE_KEY);
    if (saved?.requestId) {
      setRequestId(saved.requestId);
      setStep(saved.step);
      setContact(saved.contact);
      setStore(saved.store);
      setRenderedAt(saved.renderedAt);
    } else {
      setRequestId(crypto.randomUUID());
    }
    const applySnapshot = (snapshot: CalculatorSnapshot | null) => {
      if (!snapshot) return;
      calculator.current = snapshot;
      setStore((s) => ({ ...s, ordersRange: ordersRange(snapshot.orders) }));
    };
    applySnapshot(readJson<CalculatorSnapshot>(sessionStorage, CALCULATOR_SNAPSHOT_KEY));
    const onSnapshot = (event: Event) =>
      applySnapshot((event as CustomEvent<CalculatorSnapshot>).detail);
    window.addEventListener('ov:calculator-snapshot', onSnapshot);
    restored.current = true;
    return () => window.removeEventListener('ov:calculator-snapshot', onSnapshot);
  }, []);

  useEffect(() => {
    if (!restored.current || !requestId) return;
    try {
      const saved: Saved = { requestId, step, contact, store, renderedAt };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // sessionStorage indisponível: segue sem retomar.
    }
  }, [requestId, step, contact, store, renderedAt]);

  const goTo = useCallback((next: Step) => {
    setStep(next);
    setFormError(undefined);
    if (next !== 'calendar') {
      setAnnounce(fill(copy.form.ui.stepAnnounce, { step: next === 'contact' ? 1 : 2 }));
    }
    requestAnimationFrame(() => {
      const card = document.getElementById('demo-form-card');
      const heading = card?.querySelector<HTMLElement>('[data-step-heading]');
      const firstField = card?.querySelector<HTMLElement>('input:not([tabindex="-1"]), select');
      (heading ?? firstField)?.focus();
    });
  }, []);

  const meta = () => ({
    requestId,
    renderedAt,
    honeypot,
    attribution: attribution.current as Record<string, string>,
  });

  const onContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateContact(contact);
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return focusFirstError('contact', errors);
    setPending(true);
    try {
      const result = await submitContact(contact, meta());
      if (!result.ok) {
        setContactErrors(result.errors);
        if (Object.keys(result.errors).length === 0) setFormError(copy.form.ui.errors.generic);
        return focusFirstError('contact', result.errors);
      }
      track({ event: 'demo_form_step1' });
      goTo('store');
    } catch {
      setFormError(copy.form.ui.errors.generic);
    } finally {
      setPending(false);
    }
  };

  const onStoreSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateStore(store);
    setStoreErrors(errors);
    if (Object.keys(errors).length > 0) return focusFirstError('store', errors);
    setPending(true);
    try {
      const result = await submitStore(contact, store, calculator.current, meta());
      if (!result.ok) {
        setStoreErrors(result.errors);
        if (Object.keys(result.errors).length === 0) setFormError(copy.form.ui.errors.generic);
        return focusFirstError('store', result.errors);
      }
      const qualified = result.next === 'calendar';
      track({
        event: 'demo_form_step2',
        orders_range: store.ordersRange,
        erp: store.erp,
        qualified,
      });
      if (qualified) {
        goTo('calendar');
      } else {
        track({ event: 'demo_waitlist', erp: store.erp });
        const label =
          store.erp === 'outro' && store.erpOther.trim()
            ? store.erpOther.trim()
            : (copy.form.step2.erpOptions.find((o) => o.value === store.erp)?.label ?? '');
        sessionStorage.removeItem(STORAGE_KEY);
        router.push(`/lista-de-espera?erp=${encodeURIComponent(label)}`);
      }
    } catch {
      setFormError(copy.form.ui.errors.generic);
    } finally {
      setPending(false);
    }
  };

  const onBooked = useCallback(
    (booking: BookingInfo) => {
      try {
        sessionStorage.setItem(THANK_YOU_KEY, JSON.stringify({ email: contact.email }));
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // segue sem o e-mail na página de obrigado
      }
      const params = new URLSearchParams();
      if (booking.start) params.set('inicio', booking.start);
      if (booking.uid) params.set('uid', booking.uid);
      router.push(`/obrigado${params.size ? `?${params}` : ''}`);
    },
    [contact.email, router],
  );

  return (
    <div id="demo-form-card" data-step={step}>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
      {step === 'contact' ? (
        <ContactStep
          values={contact}
          errors={contactErrors}
          honeypot={honeypot}
          pending={pending}
          formError={formError}
          handlers={{
            onChange: (field, value) => {
              const next = field === 'whatsapp' ? maskPhoneInput(String(value)) : value;
              setContact((c) => ({ ...c, [field]: next }));
              if (contactErrors[field]) setContactErrors((e) => ({ ...e, [field]: undefined }));
            },
            onHoneypot: setHoneypot,
            onSubmit: onContactSubmit,
            onFirstFocus: () => {
              if (started.current) return;
              started.current = true;
              track({ event: 'demo_form_start' });
            },
          }}
        />
      ) : null}
      {step === 'store' ? (
        <StoreStep
          values={store}
          errors={storeErrors}
          pending={pending}
          formError={formError}
          handlers={{
            onChange: (field, value) => {
              setStore((s) => ({ ...s, [field]: value }));
              if (storeErrors[field]) setStoreErrors((e) => ({ ...e, [field]: undefined }));
            },
            onToggleMarketplace: (value) => {
              setStore((s) => ({
                ...s,
                marketplaces: s.marketplaces.includes(value)
                  ? s.marketplaces.filter((m) => m !== value)
                  : [...s.marketplaces, value],
              }));
              if (storeErrors.marketplaces)
                setStoreErrors((e) => ({ ...e, marketplaces: undefined }));
            },
            onBack: () => goTo('contact'),
            onSubmit: onStoreSubmit,
          }}
        />
      ) : null}
      {step === 'calendar' ? (
        <CalendarStep
          prefill={{
            name: contact.name,
            email: contact.email,
            whatsapp: contact.whatsapp,
            store: store.storeName,
            requestId,
          }}
          onBooked={onBooked}
        />
      ) : null}
    </div>
  );
}
