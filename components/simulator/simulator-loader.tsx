'use client';

import type { ReactNode } from 'react';
import { useLazyComponent } from '@/hooks/use-near-viewport';

const loadSimulator = () =>
  import('./simulator-interactive').then((mod) => mod.SimulatorInteractive);

/** Carregamento tardio do simulador (PRD 14.1); antes disso, versão estática com os padrões. */
export function SimulatorLoader({ children }: { children: ReactNode }) {
  const { ref, Component } = useLazyComponent(loadSimulator);
  return (
    <div ref={ref} data-simulator-ready={Component ? 'true' : 'false'}>
      {Component ? <Component /> : children}
    </div>
  );
}
