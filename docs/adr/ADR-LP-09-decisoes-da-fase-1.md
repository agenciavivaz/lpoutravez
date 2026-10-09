# ADR-LP-09 — Decisões de implementação da Fase 1

**Status:** aceita · 09/10/2026

1. **"Como funciona" no desktop:** os 5 nós ficam num anel (à esquerda), com o laço coral ligando o nó 5 ao nó 1, e os textos ficam numa lista numerada ao lado. Colocar os textos em volta do anel deixava tudo apertado entre 1024 e 1280 px. No mobile, lista vertical com uma linha coral que volta do último para o primeiro. A microinteração (laço completa, nó 1 pulsa) roda quando o nó 5 entra na tela; sem JS ou com `prefers-reduced-motion`, o estado final aparece direto.
2. **CTA sobre faixa escura:** variante `inverse` do botão = `ink-300` com texto `ink-950`, que é o `primary` do tema escuro em `tokens.json`. Continua azul-tinta; coral nunca vira botão.
3. **Card do anfitrião ("Eu mesmo faço a demo") desligado** até o Diego confirmar (PRD 17, pergunta 4). Liga em `lib/site.ts` → `features.hostCard`. O card do piloto segue `NEXT_PUBLIC_FEATURE_PILOT` (padrão `false`).
4. **Comparação no mobile:** um card por coluna, com "Outra Vez" primeiro e destacado. A tabela só aparece a partir de 1024 px.
5. **FAQ:** Accordion do Radix com `forceMount`; respostas fechadas ficam no HTML com `hidden` (indexáveis).
6. **Placeholders do tour e do simulador** têm a altura final estimada (tour: 1080 px mobile / 640 px desktop; simulador: 900 / 480) para zero CLS quando entrarem nas Fases 2 e 3.
7. **Componentes `outra-vez` criados nesta fase:** `ChannelChip`, `KpiCard` e `WhatsAppPreview` (usados no hero e na barra de canais). As cores do chat do WhatsApp (fundo, bolhas, links) são de representação do WhatsApp, não da marca.
8. **Teste de copy:** todo texto de `lib/copy/pt-BR.ts` (exceto rótulos de acessibilidade) precisa existir literalmente em `docs/PRD_LP.md`.
