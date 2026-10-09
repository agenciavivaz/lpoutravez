import { cn } from '@/lib/utils';
import type { Position } from './tour-config';

type HotspotProps = {
  n: number;
  position: Position;
  title: string;
  text: string;
  label: string;
  active: boolean;
  open: boolean;
  idPrefix: string;
  onHover?: (n: number | null) => void;
  onToggle?: (n: number) => void;
};

/**
 * Marcador numerado (PRD 7.2): círculo coral-500 de 24 px com número ink-950 de 14 px bold,
 * área de toque de 44 px. Ao tocar, abre um balão com o item da legenda.
 */
export function Hotspot({
  n,
  position,
  title,
  text,
  label,
  active,
  open,
  idPrefix,
  onHover,
  onToggle,
}: HotspotProps) {
  const bubbleId = `${idPrefix}-hotspot-${n}`;
  const alignX = position.x > 62 ? '-92%' : position.x < 38 ? '-8%' : '-50%';
  const above = position.y > 66;
  return (
    <div
      className="absolute z-10"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      data-hotspot={n}
      data-active={active || open}
    >
      <button
        type="button"
        aria-label={`${label} ${n}: ${title}`}
        aria-expanded={open}
        aria-controls={open ? bubbleId : undefined}
        onMouseEnter={onHover ? () => onHover(n) : undefined}
        onMouseLeave={onHover ? () => onHover(null) : undefined}
        onFocus={onHover ? () => onHover(n) : undefined}
        onBlur={onHover ? () => onHover(null) : undefined}
        onClick={onToggle ? () => onToggle(n) : undefined}
        className="group grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
      >
        <span
          className={cn(
            'bg-coral-500 text-ink-950 grid size-6 place-items-center rounded-full text-sm font-extrabold tabular-nums shadow-[0_2px_8px_rgba(0,0,0,0.3)] ring-2 ring-white transition-transform duration-150',
            (active || open) && 'scale-110 animate-[pulse-once_600ms_var(--ease-brand)_infinite]',
          )}
        >
          {n}
        </span>
      </button>
      {open ? (
        <div
          id={bubbleId}
          role="note"
          className="bg-popover text-popover-foreground border-border absolute w-56 rounded-[14px] border p-3 text-left text-[13px] leading-snug shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
          style={{
            transform: `translate(${alignX}, ${above ? 'calc(-100% - 28px)' : '28px'})`,
            top: 0,
            left: 0,
          }}
        >
          <b className="block">{title}</b>
          <span className="text-muted-foreground">{text}</span>
        </div>
      ) : null}
    </div>
  );
}
