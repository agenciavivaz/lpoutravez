import {
  Ellipsis,
  House,
  Plug,
  Repeat,
  Send,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';
import symbol from '@/brand/assets/logo-symbol.svg';
import { cn } from '@/lib/utils';

const icons: Record<string, LucideIcon> = {
  Início: House,
  Clientes: Users,
  Réguas: Repeat,
  Envios: Send,
  Integrações: Plug,
  Configurações: Settings,
  Mais: Ellipsis,
};

/** Navegação do app — sidebar (desktop). */
export function AppSidebar({
  items,
  active,
  className,
}: {
  items: readonly string[];
  active: string;
  className?: string;
}) {
  return (
    <aside
      data-slot="app-sidebar"
      className={cn(
        'border-border bg-card flex w-[220px] shrink-0 flex-col gap-1 border-r p-4',
        className,
      )}
    >
      <div className="text-primary mb-5 flex items-center gap-2 px-2 pt-1 font-extrabold">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={symbol.src} alt="" width={28} height={28} />
        Outra Vez
      </div>
      {items.map((item) => {
        const Icon = icons[item] ?? House;
        const isActive = item === active;
        return (
          <span
            key={item}
            className={cn(
              'flex min-h-10 items-center gap-2.5 rounded-[10px] px-3 text-[13px]',
              isActive
                ? 'bg-primary/10 text-primary font-extrabold'
                : 'text-muted-foreground font-semibold',
            )}
          >
            <Icon className="size-4" aria-hidden />
            {item}
          </span>
        );
      })}
    </aside>
  );
}

/** Navegação do app — barra inferior (mobile). */
export function AppBottomNav({
  items,
  active,
  className,
}: {
  items: readonly string[];
  active: string;
  className?: string;
}) {
  return (
    <nav
      data-slot="app-bottom-nav"
      className={cn('border-border bg-card grid h-[70px] grid-cols-5 border-t', className)}
    >
      {items.map((item) => {
        const Icon = icons[item] ?? House;
        const isActive = item === active;
        return (
          <span
            key={item}
            className={cn(
              'grid place-items-center content-center gap-1 text-[10px]',
              isActive ? 'text-primary font-extrabold' : 'text-muted-foreground font-semibold',
            )}
          >
            <Icon className="size-5" aria-hidden />
            {item}
          </span>
        );
      })}
    </nav>
  );
}
