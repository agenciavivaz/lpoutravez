import type { KeyboardEvent } from 'react';
import { Monitor, Moon, Smartphone, Sun } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';
import { ScaledViewport } from './scaled-viewport';
import { BrowserFrame, PhoneFrame } from './frames';
import { Hotspot } from './hotspot';
import {
  HOTSPOTS,
  TABS,
  alwaysPhone,
  describeScreen,
  type Device,
  type TabId,
  type Theme,
} from './tour-config';
import { SCREEN_SIZE } from './screens/shell';
import { InicioScreen } from './screens/inicio';
import { ClientesScreen } from './screens/clientes';
import { ReguasScreen } from './screens/reguas';
import { WhatsAppScreen } from './screens/whatsapp';
import { EnvioScreen } from './screens/envio';
import { BlingScreen } from './screens/bling';

const ui = copy.tour.ui;

export type TourState = {
  tab: TabId;
  /** Moldura escolhida no desktop. No mobile é sempre celular. */
  device: Device;
  theme: Theme;
  /** Marcador destacado (hover/foco na legenda ou no marcador). */
  active: number | null;
  /** Marcador com balão aberto. */
  open: number | null;
  /** Anima a troca de aba (só depois de uma troca feita pela pessoa). */
  animate: boolean;
};

export type TourHandlers = {
  onTab: (tab: TabId) => void;
  onTabKey: (event: KeyboardEvent<HTMLButtonElement>, tab: TabId) => void;
  onDevice: (device: Device) => void;
  onTheme: (theme: Theme) => void;
  onHover: (n: number | null) => void;
  onToggle: (n: number) => void;
};

function Screen({ tab, device }: { tab: TabId; device: Device }) {
  switch (tab) {
    case 'inicio':
      return <InicioScreen device={device} />;
    case 'clientes':
      return <ClientesScreen device={device} />;
    case 'reguas':
      return <ReguasScreen device={device} />;
    case 'whatsapp':
      return <WhatsAppScreen />;
    case 'envio':
      return <EnvioScreen device={device} />;
    case 'bling':
      return <BlingScreen device={device} />;
  }
}

function addressFromAppUrl(): string | null {
  if (!site.appUrl) return null;
  try {
    return new URL(site.appUrl).host;
  } catch {
    return null;
  }
}

/**
 * Tour "Conheça por dentro" (PRD 7). Componente de apresentação, sem estado: o servidor o
 * renderiza estático com a aba Início (HTML indexável) e o `TourInteractive`, carregado perto
 * da viewport, o renderiza com estado e handlers. Mesma marcação nos dois → zero CLS.
 */
export function TourView({ state, handlers }: { state: TourState; handlers?: TourHandlers }) {
  const { tab: tabId, device, theme, active, open, animate } = state;
  const tab = TABS.find((t) => t.id === tabId)!;
  const label = describeScreen(tabId);
  const phoneOnly = device === 'mobile' || alwaysPhone(tabId);

  const hotspots = (frame: Device) =>
    HOTSPOTS[tabId][alwaysPhone(tabId) ? 'mobile' : frame].map((position, index) => {
      const item = tab.hotspots[index]!;
      return (
        <Hotspot
          key={index}
          n={index + 1}
          position={position}
          title={item.title}
          text={item.text}
          label={ui.hotspot}
          active={active === index + 1}
          open={open === index + 1}
          idPrefix={`${tabId}-${frame}`}
          onHover={handlers?.onHover}
          onToggle={handlers?.onToggle}
        />
      );
    });

  const phone = (
    <PhoneFrame className="w-full max-w-[406px] lg:h-full lg:w-auto lg:max-w-none">
      <ScaledViewport
        width={SCREEN_SIZE.mobile.width}
        height={SCREEN_SIZE.mobile.height}
        label={label}
        className="w-full lg:h-full lg:w-auto"
        overlay={hotspots('mobile')}
      >
        <Screen tab={tabId} device="mobile" />
      </ScaledViewport>
    </PhoneFrame>
  );

  const browser = (
    <BrowserFrame address={addressFromAppUrl()} className="w-full">
      <ScaledViewport
        width={SCREEN_SIZE.desktop.width}
        height={SCREEN_SIZE.desktop.height}
        label={label}
        className="w-full"
        overlay={hotspots('desktop')}
      >
        <Screen tab={tabId} device="desktop" />
      </ScaledViewport>
    </BrowserFrame>
  );

  return (
    <div data-slot="tour" data-tab={tabId} data-device={device} data-theme-choice={theme}>
      {/* Abas + alternâncias */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label={ui.tabsLabel}
          className="-mx-4 flex [scrollbar-width:none] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {TABS.map((t) => {
            const selected = t.id === tabId;
            return (
              <button
                key={t.id}
                id={`tour-tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="tour-panel"
                tabIndex={selected ? 0 : -1}
                onClick={handlers ? () => handlers.onTab(t.id) : undefined}
                onKeyDown={handlers ? (event) => handlers.onTabKey(event, t.id) : undefined}
                className={cn(
                  'min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold whitespace-nowrap transition-colors duration-150',
                  selected
                    ? 'bg-ink-300 border-ink-300 text-ink-950'
                    : 'text-ink-100 border-white/15 bg-white/5 hover:bg-white/10',
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle
            label={ui.deviceLabel}
            className="hidden lg:flex"
            options={[
              { value: 'mobile', text: ui.mobile, Icon: Smartphone },
              { value: 'desktop', text: ui.desktop, Icon: Monitor },
            ]}
            value={device}
            onChange={handlers ? (value) => handlers.onDevice(value as Device) : undefined}
          />
          <Toggle
            label={ui.themeLabel}
            options={[
              { value: 'light', text: ui.light, Icon: Sun },
              { value: 'dark', text: ui.dark, Icon: Moon },
            ]}
            value={theme}
            onChange={handlers ? (value) => handlers.onTheme(value as Theme) : undefined}
          />
        </div>
      </div>

      {/* Legenda + moldura */}
      <div
        id="tour-panel"
        role="tabpanel"
        aria-labelledby={`tour-tab-${tabId}`}
        className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:items-center lg:gap-10"
      >
        <div
          key={`legend-${tabId}`}
          className={cn('order-2 lg:order-1', animate && 'animate-wa-in')}
        >
          <h3 className="text-2xl font-extrabold text-white">{tab.title}</h3>
          <p className="text-ink-100 mt-3 leading-relaxed">{tab.text}</p>
          <ol className="mt-6 grid gap-2">
            {tab.hotspots.map((item, index) => {
              const n = index + 1;
              const highlighted = active === n || open === n;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    aria-pressed={open === n}
                    onMouseEnter={handlers ? () => handlers.onHover(n) : undefined}
                    onMouseLeave={handlers ? () => handlers.onHover(null) : undefined}
                    onFocus={handlers ? () => handlers.onHover(n) : undefined}
                    onBlur={handlers ? () => handlers.onHover(null) : undefined}
                    onClick={handlers ? () => handlers.onToggle(n) : undefined}
                    className={cn(
                      'flex min-h-11 w-full gap-3 rounded-[14px] p-3 text-left transition-colors duration-150',
                      highlighted ? 'bg-white/10' : 'hover:bg-white/5',
                    )}
                  >
                    <span className="bg-coral-500 text-ink-950 grid size-6 shrink-0 place-items-center rounded-full text-sm font-extrabold tabular-nums">
                      {n}
                    </span>
                    <span className="text-ink-100 text-[15px] leading-snug">
                      <b className="text-white">{item.title}:</b> {item.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          data-theme={theme}
          className="order-1 flex justify-center lg:order-2 lg:h-[560px] lg:items-center"
        >
          <div
            key={`frame-${tabId}-${device}`}
            className={cn(
              'flex w-full justify-center lg:h-full lg:items-center',
              animate && 'animate-wa-in',
            )}
          >
            {phoneOnly ? (
              phone
            ) : (
              <>
                <div className="flex w-full justify-center lg:hidden">{phone}</div>
                <div className="hidden w-full lg:block">{browser}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type ToggleOption = { value: string; text: string; Icon: typeof Sun };

/** Alternância de duas opções com rótulo visível (ToggleGroup, PRD 7.3). */
function Toggle({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: ToggleOption[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('flex rounded-full border border-white/15 bg-white/5 p-1', className)}
    >
      {options.map(({ value: optionValue, text, Icon }) => {
        const pressed = optionValue === value;
        return (
          <button
            key={optionValue}
            type="button"
            aria-pressed={pressed}
            onClick={onChange ? () => onChange(optionValue) : undefined}
            className={cn(
              'inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-sm font-bold transition-colors duration-150',
              pressed ? 'bg-ink-300 text-ink-950' : 'text-ink-100 hover:bg-white/10',
            )}
          >
            <Icon className="size-4" aria-hidden />
            {text}
          </button>
        );
      })}
    </div>
  );
}
