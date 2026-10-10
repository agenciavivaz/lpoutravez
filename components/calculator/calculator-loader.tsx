'use client';

import type { ReactNode } from 'react';
import { useLazyComponent } from '@/hooks/use-near-viewport';

const loadCalculator = () =>
  import('./calculator-interactive').then((mod) => mod.CalculatorInteractive);

/** Carregamento tardio da calculadora; antes disso, versão estática com os padrões. */
export function CalculatorLoader({ children }: { children: ReactNode }) {
  const { ref, Component } = useLazyComponent(loadCalculator);
  return (
    <div ref={ref} data-calculator-ready={Component ? 'true' : 'false'}>
      {Component ? <Component /> : children}
    </div>
  );
}
