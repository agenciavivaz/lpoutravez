# Progresso — LP Outra Vez

Produção: https://lpoutravez-d6bn.vercel.app (deploy automático a cada push na `main`).

## Passo 1 — Montar o repo ✅
- PRD em `docs/PRD_LP.md`.
- `/brand` com o design system v2 (zip enviado pelo Diego): CLAUDE.md, DESIGN_SYSTEM_SPEC.md, ACCEPTANCE.md, README.md, tokens.json, design-system-v2.html, registry/*.json (17), assets/logo-*.svg (4), prompts/.
- `components/outra-vez/` não existe no app → Fase 2 implementa a partir do registry (ADR-LP-06).
- Projeto Vercel criado pelo Diego e ligado ao repo (`lpoutravez-d6bn.vercel.app`).

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

## Fase 1 — Página estática completa ✅
- Seções na ordem do PRD 5: hero (celular com a conversa da Loja Exemplo, card "Comprou de novo", laço), barra de canais, problema, como funciona (anel + laço), conheça por dentro (placeholder), o que muda, segurança, simulador (placeholder), comparação, demo, perguntas, agendar, rodapé.
- Barra de CTA fixa no mobile (aparece depois do hero, some em `#agendar`), menu mobile, âncoras com rolagem suave.
- Animações: bolhas do hero em sequência (150 ms), card e laço no fim (600 ms); laço do "Como funciona" com pulso no nó 1. Tudo desligado com `prefers-reduced-motion`.
- Componentes `components/outra-vez/`: `ChannelChip`, `KpiCard`, `WhatsAppPreview`.
- ADR-LP-09 com as decisões da fase.
- Verificado: lint, typecheck, 9 testes unitários (incluindo "todo texto existe literalmente no PRD"), build, 22 testes E2E (sem rolagem horizontal de 360 a 1440, axe sem violações em 360/768/1440, toque ≥ 44 px, FAQ, comparação, barra mobile, reduced motion, nenhuma imagem além do logo). Lighthouse local (mobile): desempenho 94, acessibilidade 100, LCP 1,9 s, CLS 0.
- JS inicial da home: 146 KB (limite 150 KB). Tour, simulador e formulário entram com carregamento tardio.

## Fase 2 — Conheça por dentro ✅
- `lib/mock/loja-exemplo.ts` com os dados da 7.5 (testes: barras = R$ 4.820; pedidos da Maria = R$ 842,30; R$ 398,91 = 1.240 × R$ 0,3217; percentuais e funil coerentes).
- 13 componentes novos em `components/outra-vez/` (ver ADR-LP-10), claro e escuro.
- Tour: 6 abas × celular/computador × claro/escuro, marcadores ①②③ sincronizados com a legenda (hover/foco/toque com balão), WhatsApp sempre no celular, `inert` + `aria-label` completo, abas com setas, rótulo "Dados de uma loja de exemplo." sempre visível.
- Carregamento tardio: aba Início estática no HTML; JS do tour só perto da viewport. JS inicial da home: 147 KB.
- Verificado: lint, typecheck, 15 testes unitários, build, 32 testes E2E (incluindo CLS = 0 na troca, JS tardio, teclado, axe no tour claro/escuro).

## Fase 3 — Simulador ✅
- `lib/simulator/config.ts` (premissas editáveis) + `calc.ts`; teste reproduz o exemplo da 8.3.
- UI com slider + campo numérico sincronizados, rótulos visíveis, "Ver as contas" com a tabela de premissas, aviso fixo, contagem de 400 ms (sem animação com reduced motion).
- CTA "Ver isso com os meus números" leva os valores para o formulário (sessionStorage).
- Flag `NEXT_PUBLIC_FEATURE_SIMULATOR` (padrão `true`). Carregamento tardio com os padrões já no HTML.
- Verificado: lint, typecheck, 18 testes unitários, build, 38 testes E2E (padrões R$ 5.400 / 36 / R$ 835,02 / R$ 6,47, teclado nos sliders, digitação, passagem de valores, axe).

## Fase 4 — Formulário e agendamento (adaptada, ADR-LP-12) ✅
- Formulário em duas etapas com os textos e erros do PRD 9, máscara de WhatsApp, foco no primeiro erro, anúncio de etapa, retomada após recarregar, pré-preenchimento pelo simulador.
- Envio por server action para `lib/crm/forward.ts` → `DEMO_WEBHOOK_URL` (CRM). Sem Supabase, Resend ou Turnstile, por decisão do Diego. Honeypot + 3 s mínimos.
- Bling/"Não sei" → passo do calendário (Cal.com se `NEXT_PUBLIC_CAL_LINK` existir; senão, fallback com WhatsApp). Outros ERPs → `/lista-de-espera`.
- Páginas `/obrigado`, `/lista-de-espera` (noindex), `/privacidade` e `/termos` (texto-base para revisão jurídica).
- Eventos `demo_form_start`, `demo_form_step1`, `demo_form_step2`, `demo_waitlist`, `demo_scheduled`, `whatsapp_click` já vão para o `dataLayer` (GTM na Fase 5).
- Verificado: lint, typecheck, 25 testes unitários, build, 50 testes E2E (erros, máscara, payload no CRM simulado, retomada, Bling, Omie, honeypot, simulador, /obrigado, páginas legais com axe). JS inicial da home: 149 KB.

## Fase 5 — Tracking, SEO e performance ✅
- Banner LGPD próprio + Consent Mode v2 (padrão `denied`); GTM só depois da escolha e com `NEXT_PUBLIC_GTM_ID`; link "Preferências de cookies" no rodapé.
- Todos os eventos da 12.2 no `dataLayer` (teste verifica): `cta_click`, `section_view`, `tour_tab_view`, `tour_hotspot`, `simulator_change`, `faq_open`, `demo_form_*`, `demo_waitlist`, `demo_scheduled`, `whatsapp_click`.
- Cookie `ov_utm` (30 dias) com consentimento de análise.
- SEO: metadata, canonical, sitemap, robots, JSON-LD (Organization, SoftwareApplication, FAQPage), imagem OG 1200×630, ícones 16/32/180/512.
- Performance: Radix fora do bundle inicial (FAQ e menu nativos), CSS inline. JS inicial ~129 KB gzip. Lighthouse local mobile: desempenho 95–97, acessibilidade 100, CLS 0.
- Verificado: lint, typecheck, 25 testes unitários, build, 60 testes E2E.

## Antes de divulgar a página
- `DEMO_WEBHOOK_URL` na Vercel — sem isso, os pedidos de demo não chegam a lugar nenhum.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` na Vercel.
- `NEXT_PUBLIC_CAL_LINK` (opcional: sem ele, o passo do calendário oferece o WhatsApp).
- `NEXT_PUBLIC_GTM_ID` e, dentro do GTM, Meta Pixel/Google Ads exigindo `ad_storage` (ADR-LP-13).
- `NEXT_PUBLIC_SITE_URL` com o domínio definitivo (canonical, sitemap, OG).

## Pendências e perguntas abertas (PRD 17)
- E-mail de contato para a política de privacidade (`lib/site.ts` → `contactEmail`).
- Revisão jurídica de `/privacidade`, `/termos`, seção "Sem arriscar sua conta" e FAQ 1 e 3 (pergunta 7).
- Preço do crédito (R$ 0,30) e preços da Meta no simulador (pergunta 8) — confirmar antes do lançamento.
- Aba Clientes, marcador ②: "segmento" trocado por "tipo de cliente" (glossário 4.5 vs. PRD 7.5) — confirmar a palavra.
- Card "Eu mesmo faço a demo" (pergunta 4) — desligado até confirmar.
- Programa piloto (pergunta 3) — `NEXT_PUBLIC_FEATURE_PILOT=false`.
- CNPJ da Vivaz (rodapé) — Fase 6.
- Links "Política de privacidade" e "Termos de uso" do rodapé apontam para páginas da Fase 4.
- Cal.com, WhatsApp, Supabase — Fase 4. Domínio — Fase 6.

## Próxima: Fase 6 — QA e lançamento (domínio e CNPJ pendentes)
