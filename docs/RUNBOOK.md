# RUNBOOK — LP Outra Vez

Operação do dia a dia. Produção: deploy automático a cada push na `main` (Vercel).

## Como trocar textos
1. Todo texto da página está em `lib/copy/pt-BR.ts` (política e termos em `lib/copy/legal.ts`; textos das telas do tour em `lib/mock/loja-exemplo.ts`).
2. Edite o texto e rode `pnpm test`. O teste `tests/unit/copy.test.ts` falha se:
   - o texto não existir literalmente em `docs/PRD_LP_v2.md` ou `docs/PRD_LP.md` (mude o PRD junto, ou registre o desvio em `docs/adr/` e na lista `DEVIATIONS` do teste);
   - aparecer travessão (— ou –), "no automático", "Não precisava ser assim", "jornada", "integração nativa" ou mais de 2 "na demo mostramos";
   - aparecer termo proibido (lead, opt-in, enriquecimento, conversão, journey, segmento, CRM de funil, growth), emoji ou exclamação fora de comemoração.
3. `pnpm lint && pnpm typecheck && pnpm test && pnpm build`, commit e push na `main`.

## Como ligar/desligar partes da página (sem mexer em código)
Na Vercel → projeto → Settings → Environment Variables (Production), depois **Redeploy** do último deploy (envs `NEXT_PUBLIC_*` entram no build):
| Variável | Efeito |
|---|---|
| `NEXT_PUBLIC_FEATURE_SIMULATOR=false` | esconde a calculadora ("Faça as contas") |
| `NEXT_PUBLIC_FEATURE_PILOT=true` | mostra o card "Programa piloto aberto" |
| `NEXT_PUBLIC_WHATSAPP_NUMBER=5551999999999` | número dos links de WhatsApp (`wa.me/55DDDNUMERO`). Sem ele, os links não aparecem |
| `NEXT_PUBLIC_CAL_LINK=usuario/evento` | liga o calendário do Cal.com no formulário |
| `NEXT_PUBLIC_GTM_ID=GTM-XXXX` | liga o GTM (carrega só depois da escolha de cookies) |
| `NEXT_PUBLIC_APP_URL=https://app...` | mostra "Entrar" no header |
| `NEXT_PUBLIC_SITE_URL=https://...` | base das URLs da imagem OG. Canonical, sitemap e JSON-LD usam sempre `https://www.outravez.com.br` (`lib/site.ts` → `CANONICAL_URL`) |

O card "Eu mesmo faço a demo" liga em `lib/site.ts` → `features.hostCard` (precisa de deploy). CNPJ e e-mail de contato também ficam em `lib/site.ts`.

## Premissas da calculadora
Em `lib/calculator.ts` (`CATEGORIES` e `ASSUMPTIONS`). Mudou uma premissa → rode `pnpm test`: os 5 casos da PRD v2 8.5 em `tests/unit/calculator.test.ts` vão falhar e precisam ser recalculados junto. A captura de 35% é hipótese: troque pelo dado real dos primeiros clientes.

## Logos de marketplaces e ERPs
`lib/brands.ts` lista as marcas; `logo` aponta para um SVG monocromático em `public/logos/`. Para incluir um logo: baixe do kit de imprensa oficial (ou Simple Icons), deixe só o símbolo com `fill="currentColor"`, salve em `public/logos/marketplaces/` ou `public/logos/erps/` e preencha `logo`. Regras no `CLAUDE.md` (exceção de logos).

## Pedidos de demo
- A LP **não guarda** pedidos. Cada etapa do formulário é enviada como JSON (POST) para `DEMO_WEBHOOK_URL` (variável server-only na Vercel), que deve apontar para o CRM ou para Make/DataCrazy.
- Formato do payload: `lib/crm/forward.ts` (`DemoRequestPayload`). Etapa 1 chega com `status: "started"`; a etapa 2 chega com `qualified` (qualquer ERP: Bling ativo, os demais conectamos na implantação), sempre com o mesmo `request_id`. Quem veio pela calculadora traz `store.calculator` com `calc_pedidos`, `calc_ticket` e `calc_categoria`.
- Sem `DEMO_WEBHOOK_URL`, os pedidos se perdem: o log da Vercel mostra `[demo] DEMO_WEBHOOK_URL ausente` (sem dados pessoais).
- Para trocar o destino por uma API de CRM, mude só `forwardDemoRequest()` em `lib/crm/forward.ts`.

## Como ver os pedidos de demo
No CRM (ou no cenário do Make/DataCrazy) que recebe o `DEMO_WEBHOOK_URL`. Falhas de entrega aparecem nos logs da Vercel como `[demo] CRM respondeu …` ou `[demo] falha ao entregar …`.

## Como excluir os dados de alguém (LGPD)
A LP não armazena dados pessoais. O pedido de exclusão é atendido no CRM que recebe os pedidos (busque pelo e-mail ou WhatsApp em E.164, ex.: `+5511987654321`, e pelo `request_id`). Cookies: `ov_consent` e `ov_utm` ficam no navegador da pessoa; não há cópia no servidor.

## Verificação antes de publicar
`pnpm lint && pnpm typecheck && pnpm test && pnpm build`, depois `pnpm test:e2e` (sobe o servidor sozinho e simula o CRM em `127.0.0.1:3999`). Para conferir telas: `node scripts/screenshots.mjs docs/screens/depois` com o servidor rodando em `:3100` (390 e 1440 px, claro e escuro, uma imagem por seção).
