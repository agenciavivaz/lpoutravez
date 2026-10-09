'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useLazyComponent } from '@/hooks/use-near-viewport';

const loadForm = () => import('./demo-form-interactive').then((mod) => mod.DemoFormInteractive);

/**
 * Carregamento tardio do formulário (PRD 14.1). Até lá, a etapa 1 estática (mesma marcação).
 * Se a pessoa já estava num campo da versão estática (ex.: veio pelo CTA), o foco é mantido.
 */
export function DemoFormLoader({ children }: { children: ReactNode }) {
  const { ref, Component } = useLazyComponent(loadForm, '900px 0px');
  const focusedId = useRef<string | null>(null);

  useEffect(() => {
    if (!Component || !focusedId.current) return;
    if (document.activeElement && document.activeElement !== document.body) return;
    document.getElementById(focusedId.current)?.focus();
  }, [Component]);

  return (
    <div
      ref={ref}
      data-form-ready={Component ? 'true' : 'false'}
      onFocusCapture={(event) => {
        focusedId.current = (event.target as HTMLElement).id || null;
      }}
    >
      {Component ? <Component /> : children}
    </div>
  );
}
