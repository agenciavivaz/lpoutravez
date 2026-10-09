# ADR-LP-06 — Telas do tour como componentes, não imagens

**Status:** aceita · 09/10/2026

**Decisão:** as telas do "Conheça por dentro" são componentes React reais em `components/outra-vez/`, alimentados por `lib/mock/loja-exemplo.ts`.

**Por quê:** nitidez, tema claro/escuro, peso, acessibilidade, manutenção.

**Contexto (09/10/2026):** o app ainda não tem `components/outra-vez/` (só `components/ui/*`, `app-shell.tsx` e `empty-state.tsx`). Por isso a Fase 2 segue a opção 2 do PRD 7.1: implementar a partir de `brand/registry/*.json` e do `design-system-v2.html`, com API pensada para ser movida depois para um pacote compartilhado.

**Alternativa descartada:** screenshots — desatualizam, pesam, não têm tema escuro.
