'use client';

import type { ReactNode } from 'react';
import { useLazyComponent } from '@/hooks/use-near-viewport';

const loadTour = () => import('./tour-interactive').then((mod) => mod.TourInteractive);

/**
 * Carregamento tardio do tour (PRD 7.4): até a seção chegar a ~600 px da viewport, mostra a
 * versão estática renderizada no servidor (aba Início, indexável). Depois troca pelo tour
 * interativo, que tem a mesma marcação.
 */
export function TourLoader({ children }: { children: ReactNode }) {
  const { ref, Component } = useLazyComponent(loadTour);
  return (
    <div ref={ref} data-tour-ready={Component ? 'true' : 'false'}>
      {Component ? <Component /> : children}
    </div>
  );
}
