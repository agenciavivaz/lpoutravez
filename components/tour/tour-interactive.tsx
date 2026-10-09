'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { track } from '@/lib/analytics/events';
import { TourView, type TourState } from './tour-view';
import { TABS, type TabId } from './tour-config';

export const INITIAL_TOUR_STATE: TourState = {
  tab: 'inicio',
  device: 'desktop',
  theme: 'light',
  active: null,
  open: null,
  animate: false,
};

/** Estado e interações do tour. Carregado só perto da viewport (ver TourLoader). */
export function TourInteractive() {
  const [state, setState] = useState<TourState>(INITIAL_TOUR_STATE);

  // tour_tab_view a cada troca de aba (PRD 12.2). A moldura real depende da largura da tela.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    track({
      event: 'tour_tab_view',
      tab: state.tab,
      device: desktop && state.device === 'desktop' ? 'desktop' : 'mobile',
      theme: state.theme,
    });
    // Só a aba dispara o evento; moldura e tema vão como parâmetros.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.tab]);

  const selectTab = useCallback((tab: TabId, focus = false) => {
    setState((s) => (s.tab === tab ? s : { ...s, tab, active: null, open: null, animate: true }));
    if (focus) document.getElementById(`tour-tab-${tab}`)?.focus();
  }, []);

  const onTabKey = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, tab: TabId) => {
      const index = TABS.findIndex((t) => t.id === tab);
      const last = TABS.length - 1;
      const target =
        event.key === 'ArrowRight'
          ? index === last
            ? 0
            : index + 1
          : event.key === 'ArrowLeft'
            ? index === 0
              ? last
              : index - 1
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? last
                : null;
      if (target === null) return;
      event.preventDefault();
      selectTab(TABS[target]!.id, true);
    },
    [selectTab],
  );

  return (
    <TourView
      state={state}
      handlers={{
        onTab: (tab) => selectTab(tab),
        onTabKey,
        onDevice: (device) => setState((s) => ({ ...s, device, open: null, animate: true })),
        onTheme: (theme) => setState((s) => ({ ...s, theme })),
        onHover: (active) => setState((s) => ({ ...s, active })),
        onToggle: (n) =>
          setState((s) => {
            if (s.open !== n) track({ event: 'tour_hotspot', tab: s.tab, hotspot: n });
            return { ...s, open: s.open === n ? null : n };
          }),
      }}
    />
  );
}
