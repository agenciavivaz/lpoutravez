'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics/events';

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

/**
 * `section_view` (PRD 12.2): uma vez por seção, quando 50% dela fica visível. Seções mais
 * altas que a tela nunca chegam a 50%; para elas, vale ocupar metade da tela.
 */
export function SectionViews() {
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          const needed = Math.min(entry.boundingClientRect.height, window.innerHeight) * 0.5;
          if (entry.intersectionRect.height < needed) continue;
          seen.add(id);
          observer.unobserve(entry.target);
          track({ event: 'section_view', section: id });
        }
      },
      { threshold: THRESHOLDS },
    );
    document
      .querySelectorAll<HTMLElement>('main > section[id]')
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return null;
}
