# ADR-LP-03 — Mesmas versões de Tailwind e shadcn/ui do app

**Status:** aceita · 09/10/2026

**Decisão:** versões fixadas iguais às do `CRM_Marketplace` (commit `79ae864`): next 15.5.27, react 19.3.0, tailwindcss 4.3.3, radix-ui 1.7.0, lucide-react 1.53.0, class-variance-authority 0.7.1, tailwind-merge 3.7.0, tw-animate-css 1.4.0, typescript 5.9.3, pnpm 10.28.0. Mesma config de ESLint e Prettier. `components/ui/*` copiados do app.

**Por quê:** copiar componentes sem adaptação.

**Alternativa descartada:** versões diferentes — retrabalho a cada cópia.

**Ao atualizar:** suba a versão no app e na LP juntos.
