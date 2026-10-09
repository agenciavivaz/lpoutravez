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
