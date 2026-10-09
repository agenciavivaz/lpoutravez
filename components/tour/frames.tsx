import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Moldura "Celular": aparelho de 390 px (PRD 7.2). */
export function PhoneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      data-slot="phone-frame"
      className={cn(
        'border-warm-900 bg-warm-900 overflow-hidden rounded-[36px] border-[8px] shadow-[0_18px_50px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Moldura "Computador": janela de navegador minimalista (3 pontos e barra de endereço). */
export function BrowserFrame({
  address,
  className,
  children,
}: {
  address: string | null;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-slot="browser-frame"
      className={cn(
        'border-border bg-card overflow-hidden rounded-[20px] border shadow-[0_18px_50px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      <div className="border-border bg-secondary flex h-9 items-center gap-1.5 border-b px-3.5">
        <span className="bg-border size-2 rounded-full" />
        <span className="bg-border size-2 rounded-full" />
        <span className="bg-border size-2 rounded-full" />
        <span className="bg-card text-muted-foreground ml-3 flex h-5 min-w-0 flex-1 items-center rounded-full px-3 text-[10px] font-semibold sm:max-w-[260px]">
          {address}
        </span>
      </div>
      {children}
    </div>
  );
}
