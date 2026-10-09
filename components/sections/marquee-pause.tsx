'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { copy } from '@/lib/copy/pt-BR';

/** Pausa a rolagem da faixa de logos (WCAG 2.2.2). Atua no `[data-marquee]` pai. */
export function MarqueePause() {
  const [paused, setPaused] = useState(false);
  const t = copy.logoStrip.ui;
  return (
    <button
      type="button"
      data-marquee-pause
      aria-pressed={paused}
      aria-label={paused ? t.play : t.pause}
      onClick={(event) => {
        const next = !paused;
        setPaused(next);
        event.currentTarget.closest('[data-marquee]')?.setAttribute('data-paused', String(next));
      }}
      className="text-muted-foreground hover:bg-secondary grid size-11 shrink-0 place-items-center rounded-full"
    >
      {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
    </button>
  );
}
