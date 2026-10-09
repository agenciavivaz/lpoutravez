/**
 * Eventos do dataLayer (PRD 12.2), tipados. O GTM e o Consent Mode entram na Fase 5; até lá
 * os eventos só ficam no `window.dataLayer`. Nunca envie nome, e-mail ou telefone.
 */

export type AnalyticsEvent =
  | { event: 'cta_click'; location: string }
  | { event: 'section_view'; section: string }
  | { event: 'tour_tab_view'; tab: string; device: 'mobile' | 'desktop'; theme: 'light' | 'dark' }
  | { event: 'tour_hotspot'; tab: string; hotspot: number }
  | { event: 'simulator_change'; orders: number; ticket: number; rate: number }
  | { event: 'faq_open'; question_id: string }
  | { event: 'demo_form_start' }
  | { event: 'demo_form_step1' }
  | { event: 'demo_form_step2'; orders_range: string; erp: string; qualified: boolean }
  | { event: 'demo_waitlist'; erp: string }
  | { event: 'demo_scheduled' }
  | { event: 'whatsapp_click'; location: string }
  | { event: 'erp_other_click' };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(payload: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}
