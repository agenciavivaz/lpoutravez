import type { ReactNode } from 'react';
import { appNav } from '@/lib/mock/loja-exemplo';
import { AppBottomNav, AppSidebar } from '@/components/outra-vez/app-nav';

export type Device = 'mobile' | 'desktop';

/** Tamanho em que cada tela é desenhada antes de ser reduzida para caber na moldura (PRD 7.2). */
export const SCREEN_SIZE = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 780 },
} as const;

type ShellProps = {
  device: Device;
  /** Item ativo da navegação. `null` esconde a navegação (onboarding). */
  active: string | null;
  children: ReactNode;
};

/** Casca do app: sidebar no computador, barra de status + barra inferior no celular. */
export function AppShell({ device, active, children }: ShellProps) {
  if (device === 'desktop') {
    return (
      <div className="bg-background text-foreground flex size-full">
        {active ? <AppSidebar items={appNav.sidebar} active={active} /> : null}
        <main className="min-w-0 flex-1 overflow-hidden p-8">{children}</main>
      </div>
    );
  }
  return (
    <div className="bg-background text-foreground flex size-full flex-col">
      <div className="bg-card flex h-7 shrink-0 items-center justify-between px-4 text-[10px] font-extrabold tabular-nums">
        <span>9:41</span>
        <span aria-hidden>● ●●</span>
      </div>
      <main className="min-h-0 flex-1 overflow-hidden px-4 pt-4">{children}</main>
      {active ? <AppBottomNav items={appNav.bottom} active={active} className="shrink-0" /> : null}
    </div>
  );
}

export function PageTitle({
  label,
  title,
  size = 'lg',
}: {
  label: string;
  title: string;
  size?: 'lg' | 'md';
}) {
  return (
    <div>
      <p className="text-muted-foreground text-[11px] font-semibold">{label}</p>
      <h3
        className={
          size === 'lg'
            ? 'mt-0.5 text-[28px] leading-tight font-extrabold tracking-[-0.03em]'
            : 'mt-0.5 text-2xl leading-tight font-extrabold tracking-[-0.03em]'
        }
      >
        {title}
      </h3>
    </div>
  );
}

export function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`bg-card border-border rounded-[20px] border p-5 ${className}`}>{children}</div>
  );
}

/** Botão desenhado (não clicável): a tela é demonstração e fica `inert`. */
export function FakeButton({
  children,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-sm font-extrabold ${
        variant === 'primary'
          ? 'bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground border'
      } ${className}`}
    >
      {children}
    </span>
  );
}
