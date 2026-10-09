# Progresso — LP Outra Vez

Produção: https://lpoutravez.vercel.app (deploy automático a cada push na `main`).

## Passo 1 — Montar o repo ✅
- PRD em `docs/PRD_LP.md`.
- `/brand` com o design system v2 (zip enviado pelo Diego): CLAUDE.md, DESIGN_SYSTEM_SPEC.md, ACCEPTANCE.md, README.md, tokens.json, design-system-v2.html, registry/*.json (17), assets/logo-*.svg (4), prompts/.
- `components/outra-vez/` não existe no app → Fase 2 implementa a partir do registry (ADR-LP-06).
- Projeto Vercel criado pelo Diego e ligado ao repo (`lpoutravez.vercel.app`).

## Fase 0 — Fundação ✅
- Next.js 15.5.27 + TS strict + Tailwind 4.3.3 + radix-ui 1.7.0 (mesmas versões do app), ESLint/Prettier do app, Vitest, Playwright + axe.
- Tokens de `brand/tokens.json` → `app/globals.css` (primitivas 50–950 + semânticos claro/escuro compatíveis com shadcn, incluindo `money` e `whatsapp`). Teste garante que batem.
- Plus Jakarta Sans (400–800, `display: swap`) via `next/font/google`.
- `Logo` (positivo/negativo/mono/símbolo), `Loop`, `LoopUnderline`, `CtaLink` (rola até `#agendar` e foca).
- `lib/copy/pt-BR.ts` com todo o texto da seção 6 (+ 12.1 e 13). Teste de termos proibidos, emoji e exclamação.
- Página: header (âncoras, menu Sheet no mobile, "Entrar" só com `NEXT_PUBLIC_APP_URL`), hero (texto, CTAs, microcopy, laço), faixa `#agendar`, rodapé.
- Headers de segurança (CSP, Referrer-Policy, nosniff, X-Frame-Options, Permissions-Policy), `noindex` fora da produção, Vercel Analytics + Speed Insights, favicon do símbolo.
- ADRs LP-01 a LP-08 em `docs/adr/`. `.env.example` com os nomes da seção 10.5.
- Verificado: lint, typecheck, 8 testes unitários, build, 12 testes E2E (sem rolagem horizontal de 360 a 1440, axe sem violações em 360 e 1440, CTA foca `#agendar`, menu mobile). Lighthouse local: acessibilidade 100.

## Pendências e perguntas abertas (PRD 17)
- CNPJ da Vivaz (rodapé) — Fase 6.
- Links "Política de privacidade" e "Termos de uso" do rodapé apontam para páginas da Fase 4.
- Cal.com, WhatsApp, Supabase — Fase 4. Domínio — Fase 6.

## Próxima: Fase 1 — Página estática completa
