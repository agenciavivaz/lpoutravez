# CLAUDE.md — LP Outra Vez

Landing page do Outra Vez. Objetivo único: **agendar uma demo gratuita**.

## Leia antes de mexer

1. `docs/PRD_LP.md` — fonte da verdade da LP (estrutura, copy, fases).
2. `brand/CLAUDE.md` e `brand/DESIGN_SYSTEM_SPEC.md` — regras da marca (Regra 0).
3. `brand/tokens.json` e `brand/registry/*.json` — normativos. `brand/design-system-v2.html` é só referência visual.

Não edite nada em `brand/`: é cópia do design system. Mudou a marca → atualize a cópia inteira.

## Regras desta LP (PRD 4 e 14)

- Direção A — Retorno quente. Não redesenhe.
- Todo botão primário é azul-tinta (`bg-primary`). Coral **nunca** é botão nem hover de botão.
- Texto coral pequeno em fundo claro: `coral-700` (classe `.eyebrow`). Em faixa escura: `coral-300` (`.eyebrow-on-dark`). `coral-500` só decorativo ou texto ≥ 24 px bold.
- Verde WhatsApp (`whatsapp`) só dentro de representações do WhatsApp.
- Textos: só em `lib/copy/pt-BR.ts`, idênticos à seção 6 do PRD. Nunca: lead, opt-in, enriquecimento, conversão, journey, segmento, CRM de funil, growth (teste em `tests/unit/copy.test.ts`).
- Sem logo, mascote ou cor de marketplace/Bling. Canais = chips neutros com o nome.
- Sem depoimento, logo de cliente ou número inventado. Números do tour vêm de `lib/mock/loja-exemplo.ts` com o rótulo "Dados de uma loja de exemplo."
- Mobile-first em 360 px, sem rolagem horizontal, toque ≥ 44 px, WCAG 2.1 AA, `tabular-nums` em todo número.
- `prefers-reduced-motion`: sem deslize, pulsação, contagem ou laço animado.
- Orçamento: JS inicial ≤ 150 KB gzip, LCP < 2,0 s (elemento LCP = H1), CLS < 0,05.
- Segredos nunca no repo. `.env.example` só com nomes.

## Comandos

`pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build` · `pnpm test:e2e` (Playwright + axe; precisa de `pnpm build` antes).
A `main` faz deploy em produção na Vercel: **nunca faça push com build quebrado.**

## Estrutura

Ver PRD 10.3. Componentes do produto em `components/outra-vez/` com a mesma API do app.
Decisões em `docs/adr/`. Progresso em `docs/PROGRESS.md`.
