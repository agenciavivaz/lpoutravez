import { cn } from '@/lib/utils';

/** Badge RFM (registry/rfm-badge.json): segmento do cliente pela recência, frequência e valor. */
export function RfmBadge({ segment, className }: { segment: string; className?: string }) {
  return (
    <span
      data-slot="rfm-badge"
      className={cn(
        'border-border bg-card text-foreground inline-flex min-h-7 items-center rounded-full border px-2.5 text-[11px] font-extrabold',
        className,
      )}
    >
      {segment}
    </span>
  );
}
