import { House, Store, User } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';

/**
 * Diagrama da Rota de recompra (PRD v2 9.5 e 11.3.4): o cliente no centro e duas setas coral de
 * retorno. Para o anúncio (rota padrão) a seta é contínua; para a sua loja, tracejada (só quem
 * aceitou novidades). Rótulos em HTML sobre o SVG, para continuarem legíveis em 360 px.
 */
export function RouteDiagram() {
  const t = copy.route;
  return (
    <figure
      role="img"
      aria-label={t.ui.diagramLabel}
      className="relative mx-auto mb-14 aspect-[600/300] w-full max-w-[560px] sm:mb-8"
    >
      <svg
        aria-hidden
        viewBox="0 0 600 300"
        className="absolute inset-0 size-full overflow-visible"
        fill="none"
      >
        <path
          d="M 270 168 C 230 40, 120 40, 96 150"
          stroke="var(--color-coral-500)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 84 140 L 96 162 L 110 142"
          stroke="var(--color-coral-500)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 330 168 C 370 40, 480 40, 504 150"
          stroke="var(--color-coral-500)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 12"
        />
        <path
          d="M 490 142 L 504 162 L 516 140"
          stroke="var(--color-coral-500)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute top-[55%] left-1/2 grid -translate-x-1/2 justify-items-center gap-1.5">
        <span className="bg-ink-900 grid size-14 place-items-center rounded-full text-white sm:size-16">
          <User className="size-6" aria-hidden />
        </span>
        <span className="text-ink-900 text-sm font-bold">{t.ui.customer}</span>
      </span>
      <Node
        className="left-[16%]"
        label={t.diagram.marketplace}
        badge={t.defaultBadge}
        Icon={Store}
      />
      <Node className="left-[84%]" label={t.diagram.own} Icon={House} />
    </figure>
  );
}

function Node({
  className,
  label,
  badge,
  Icon,
}: {
  className: string;
  label: string;
  badge?: string;
  Icon: typeof Store;
}) {
  return (
    <span
      className={`absolute top-[55%] grid -translate-x-1/2 justify-items-center gap-1.5 ${className}`}
    >
      <span className="bg-warm-50 border-border text-ink-900 grid size-12 place-items-center rounded-[14px] border sm:size-14">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="text-ink-900 text-sm font-bold whitespace-nowrap">{label}</span>
      {badge ? (
        <span className="bg-ink-50 text-ink-900 -mt-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold">
          {badge}
        </span>
      ) : null}
    </span>
  );
}
