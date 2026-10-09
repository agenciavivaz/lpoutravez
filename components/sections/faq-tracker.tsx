'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { track } from '@/lib/analytics/events';

/** Dispara `faq_open` (PRD 12.2) quando uma pergunta abre. O evento `toggle` não sobe: captura. */
export function FaqTracker({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const onToggle = (event: Event) => {
      const details = event.target as HTMLDetailsElement;
      if (details.tagName === 'DETAILS' && details.open && details.dataset.questionId) {
        track({ event: 'faq_open', question_id: details.dataset.questionId });
      }
    };
    element.addEventListener('toggle', onToggle, true);
    return () => element.removeEventListener('toggle', onToggle, true);
  }, []);
  return <div ref={ref}>{children}</div>;
}
