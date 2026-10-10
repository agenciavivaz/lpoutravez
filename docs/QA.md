# Checklist de QA — Fase 6 (PRD 15)

Estado em 09/10/2026. ✅ verificado (teste automatizado ou revisão) · ⏳ depende de algo externo.

- ✅ Textos idênticos à seção 6; nenhum termo proibido; nenhuma exclamação fora de comemoração; nenhum emoji — `tests/unit/copy.test.ts` (um desvio documentado: ADR-LP-10).
- ✅ Nenhum logo/cor-assinatura de marketplace ou do Bling; verde WhatsApp só em WhatsApp — teste "só tem imagens da marca" + revisão visual.
- ✅ Coral nunca em botão; texto coral pequeno usa coral-700 (claro) ou coral-300 (escuro) — revisão de código (`.eyebrow`, `.eyebrow-on-dark`, variantes do botão).
- ✅ Todo número com `tabular-nums` e formato BR — `lib/format.ts` + revisão.
- ✅ "Dados de uma loja de exemplo." no tour; "Exemplo ilustrativo." nos cards de número; aviso no simulador — testes E2E.
- ✅ Nenhum depoimento, logo de cliente ou contagem de clientes inventada.
- ✅ 360/390/640/768/1024/1280/1440 sem rolagem horizontal; toque ≥ 44 px; teclado (menu, tour, sliders, FAQ, formulário); axe sem violações (claro e escuro no tour) — testes E2E + revisão visual em 360/768/1024/1440.
- ✅ Formulário: validações, erros, retomada após recarregar, fallback do calendário, lista de espera — testes E2E.
- ⏳ Calendário real (Cal.com) — sem `NEXT_PUBLIC_CAL_LINK` ainda; o fallback com WhatsApp está testado. Webhook do Cal.com não existe por decisão (ADR-LP-12): o agendamento fica com o CRM.
- ✅ Consentimento respeitado (nada do GTM antes da escolha); eventos corretos; UTMs enviadas com o pedido — testes E2E.
- ⏳ Eventos no preview do GTM — precisa de `NEXT_PUBLIC_GTM_ID` e da configuração do contêiner.
- ✅ Previews com `noindex`; produção indexável (robots e meta robots dependem de `VERCEL_ENV`).
- ⏳ OG image correta no WhatsApp e no LinkedIn — imagem pronta (teste); conferir no compartilhamento real depois do domínio.
- ⏳ Política de privacidade e termos revisados (jurídico, PRD 17 pergunta 7).
- ⏳ Teste real ponta a ponta (agendar uma demo de verdade e cancelar) — depende de CRM (`DEMO_WEBHOOK_URL`) e Cal.com.
- ⏳ Domínio de produção (`www` → raiz com 308) — domínio a definir.
- ⏳ CNPJ no rodapé.

## Revisão v2 (PRD_LP_v2, seção 13), 09/10/2026

- ✅ Nenhum "—" ou "–" no conteúdo, meta e JSON-LD: `grep -rnP "[\x{2013}\x{2014}]" lib/copy lib/mock` vazio; teste unitário e E2E (texto da página, `<head>` e JSON-LD).
- ✅ Correções da tabela 4.1 aplicadas (copy da seção 9 em `lib/copy/pt-BR.ts`, teste literal contra o PRD).
- ✅ Sem "no automático", "Não precisava ser assim", "enriquecimento", "jornada", "lead", "opt-in", "conversão"; "na demo mostramos" ≤ 2: `tests/unit/copy.test.ts`.
- ✅ Calculadora: 5 casos da 8.5 passando (±1 real); sliders log; sem custo da Meta e sem ROI; receita anual em destaque; "Ver as contas" com fontes: `tests/unit/calculator.test.ts` + `tests/e2e/calculator.spec.ts`.
- ✅ Rota de recompra e Integrações publicadas; "O que muda" removida: `tests/e2e/sections.spec.ts`.
- ⚠️ Faixa de logos e grid de ERPs monocromáticos, SVG locais, nome visível; `CLAUDE.md` atualizado. Só Shopee e TikTok têm SVG (Simple Icons). Os demais aparecem como nome em texto (pendência).
- ✅ Bling com "Integração ativa"; demais com "Conectamos na implantação": E2E.
- ⚠️ Form com campo de ERP e campos ocultos da calculadora (E2E). Link do WhatsApp usa `NEXT_PUBLIC_WHATSAPP_NUMBER`; sem número o link não aparece. Falta o número.
- ✅ Canonical `https://www.outravez.com.br`; JSON-LD SoftwareApplication + FAQPage (10 perguntas): E2E.
- ✅ Lighthouse mobile (build local com `VERCEL_ENV=production`): desempenho 96, acessibilidade 100, boas práticas 96, SEO 100. LCP 2,6 s, TBT 110 ms, CLS 0. As boas práticas perdem só pelos scripts `/_vercel/*`, que não existem fora da Vercel. Mesma máquina, versão anterior: 97 / 100 / 96, LCP 2,4 a 2,5 s. Axe sem violações (360, 768 e 1440 px, calculadora com contas abertas, formulário, tour claro e escuro).
- ✅ Screenshots antes/depois em `docs/screens/antes/` e `docs/screens/depois/` (390 e 1440, claro e escuro). A LP só tem tema claro; "escuro" = sistema em modo escuro.
- ✅ Eventos `calc_interact`, `calc_category_change`, `calc_cta_click`, `form_step1_submit`, `form_step2_submit`, `whatsapp_click`, `erp_other_click` no `dataLayer`: E2E.
- ⚠️ LCP: o elemento LCP no mobile é o subtítulo do hero, não o H1 (já era assim antes da v2). LCP simulado 2,3 a 2,6 s, acima da meta de 2,0 s; medir no domínio real (Speed Insights).
