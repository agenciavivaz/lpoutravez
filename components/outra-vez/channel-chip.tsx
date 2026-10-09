import { cn } from '@/lib/utils';

type ChannelChipProps = {
  /** Nome do canal, escrito. Nunca logo nem cor-assinatura (registry/channel-chip.json). */
  channel: string;
  size?: 'sm' | 'md';
  className?: string;
};

/** Chip de canal: neutro, com o nome escrito. Mesma API pensada para o app. */
export function ChannelChip({ channel, size = 'md', className }: ChannelChipProps) {
  return (
    <span
      data-slot="channel-chip"
      className={cn(
        'border-border bg-card text-foreground inline-flex items-center rounded-full border font-bold whitespace-nowrap',
        size === 'sm' ? 'min-h-6 px-2.5 text-[11px]' : 'min-h-9 px-3.5 text-sm',
        className,
      )}
    >
      {channel}
    </span>
  );
}
