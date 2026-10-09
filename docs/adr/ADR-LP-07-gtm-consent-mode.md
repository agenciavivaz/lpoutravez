# ADR-LP-07 — GTM + Consent Mode v2 com banner LGPD

**Status:** aceita · 09/10/2026

**Decisão:** GTM carregado depois do consentimento ou em `requestIdleCallback`, com Consent Mode v2 em `denied` por padrão. Banner próprio (sem biblioteca pesada). Eventos tipados em `lib/analytics/events.ts`.

**Por quê:** o Diego otimiza mídia paga; consentimento antes de qualquer pixel.

**Alternativa descartada:** pixels direto no código — difícil de manter, sem controle de consentimento.
