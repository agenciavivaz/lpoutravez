'use client';

import { useCallback, useState, type KeyboardEvent } from 'react';
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
        onToggle: (n) => setState((s) => ({ ...s, open: s.open === n ? null : n })),
      }}
    />
  );
}
