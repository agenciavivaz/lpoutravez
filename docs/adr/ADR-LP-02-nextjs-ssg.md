# ADR-LP-02 — Next.js 15 App Router com páginas estáticas

**Status:** aceita · 09/10/2026

**Decisão:** Next.js 15 (App Router, TypeScript strict). Todas as páginas são estáticas (SSG). Server actions só no formulário de demo; rotas de API só para webhook do Cal.com e cron.

**Por quê:** velocidade (LCP < 2 s), mesma stack do app, componentes copiáveis.

**Alternativa descartada:** Astro — mais leve, mas sem reaproveitar os componentes React do app.
