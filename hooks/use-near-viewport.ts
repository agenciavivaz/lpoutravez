'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';

/**
 * Importa um componente quando o elemento chega a `margin` da viewport (PRD 14.1:
 * carregamento tardio de tour, simulador e calendário).
 */
export function useLazyComponent<P extends object>(
  load: () => Promise<ComponentType<P>>,
  margin = '600px 0px',
) {
  const ref = useRef<HTMLDivElement>(null);
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        load().then((loaded) => {
          if (!cancelled) setComponent(() => loaded);
        });
      },
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
    // `load` é estável (função de módulo); não reexecutar quando o pai renderiza.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [margin]);

  return { ref, Component };
}
