# ADR-LP-13 — Decisões de implementação da Fase 5 (tracking, SEO, performance)

**Status:** aceita · 09/10/2026

## Consentimento e tags
1. **Consent Mode v2** com padrão `denied` num script inline no `<head>` (antes de qualquer tag). Uma escolha já salva é reaplicada ali mesmo.
2. **Banner próprio** (`components/consent/`): Aceitar todos · Só os necessários · Configurar (análise, publicidade). Escolha no cookie `ov_consent` por 12 meses. O rodapé tem "Preferências de cookies" para mudar a escolha.
3. **GTM só depois da escolha** (qualquer escolha), em tempo ocioso, e só se `NEXT_PUBLIC_GTM_ID` existir. Antes disso não existe nenhuma tag na página, então nenhum pixel dispara antes do consentimento. **No GTM:** Meta Pixel e Google Ads precisam exigir `ad_storage`; GA4 respeita `analytics_storage`. As conversões são `demo_form_step1` (GA4 `generate_lead`, Meta `Lead`) e `demo_scheduled` (GA4 `schedule_demo`, Meta `Schedule`, Google Ads).
4. **Origem da visita:** primeira origem da sessão em `sessionStorage`; com consentimento de análise, também no cookie `ov_utm` (30 dias).
5. **Eventos da 12.2** em `lib/analytics/events.ts` (tipados), sem nome, e-mail ou telefone. `section_view` vale quando 50% da seção aparece ou, em seções maiores que a tela, quando ela ocupa metade da tela.

## SEO
6. Metadata, canonical, `sitemap.xml` (/, /privacidade, /termos), `robots.txt` (bloqueia /obrigado, /lista-de-espera, /api; fora da produção bloqueia tudo), JSON-LD `Organization` + `SoftwareApplication` (sem `aggregateRating`) + `FAQPage` com as 9 perguntas.
7. **Imagem OG** (1200×630, `next/og`): o logo negativo oficial tem o texto em Arial, que o gerador de imagens não tem, e sairia sem o nome. A imagem monta o mesmo lockup: o símbolo oficial (`logo-symbol.svg`) + "Outra Vez" em Arimo, fonte com as mesmas métricas da Arial. Título em Plus Jakarta Sans 800 (arquivo do `@fontsource`).
8. **Ícones** 16, 32, 512 (PNG) e 180 (apple-touch) gerados do `logo-symbol.svg`; o SVG continua como favicon principal.

## Performance
9. **Radix fora do bundle inicial:** FAQ com `<details name="faq">` nativo (uma aberta por vez, respostas no HTML) e menu mobile com `<dialog>` nativo (modal, Esc, foco). −18 KB. JS inicial da home: **~129 KB gzip** (limite 150).
10. **CSS inline** (`experimental.inlineCss`): a folha de estilo sai do caminho crítico.
11. **Lighthouse local (mobile, simulado):** desempenho 95–97, acessibilidade 100, CLS 0, TBT 140–260 ms, LCP 2,1–2,4 s (80% é atraso de renderização modelado pela simulação de 4G esperando a fonte). Melhores práticas e SEO só ficam em 100 na produção: localmente o `noindex` e os scripts da Vercel (que só existem lá) derrubam a nota. A meta de LCP < 2 s vale no Speed Insights, com dados reais.
12. O elemento de LCP no mobile é o subtítulo do hero, não o H1 (o parágrafo ocupa mais área). Os dois pintam juntos, então o tempo é o mesmo; não mudamos tamanhos de texto só para trocar o elemento.
