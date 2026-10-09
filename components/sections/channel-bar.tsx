import { Plug } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';
import { ChannelChip } from '@/components/outra-vez/channel-chip';

export function ChannelBar() {
  const t = copy.channelBar;
  return (
    <section aria-label={t.label} className="bg-warm-100 border-border border-y">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-muted-foreground shrink-0 text-sm font-bold">{t.label}</p>
          <ul className="flex flex-wrap gap-2">
            {t.channels.map((channel) => (
              <li key={channel}>
                <ChannelChip channel={channel} />
              </li>
            ))}
          </ul>
        </div>
        <p className="text-ink-900 flex items-center gap-2 text-sm font-bold">
          <Plug className="size-4" aria-hidden />
          {t.integration}
        </p>
      </div>
    </section>
  );
}
