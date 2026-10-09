# ADR-LP-10 — Decisões de implementação da Fase 2 (tour)

**Status:** aceita · 09/10/2026

1. **Componentes implementados a partir do registry** (o app ainda não tem `components/outra-vez/`): `Funnel`, `RfmBadge`, `ConsentStatus`, `CustomerTimeline`, `JourneyEditor`, `SendCostDialog` (versão visual estática), `OnboardingStepper`, `ImportProgress`, `IntegrationHealth`, `CreditMeter`, `AppSidebar`/`AppBottomNav`, `SalesChart`, além de `KpiCard`, `ChannelChip` e `WhatsAppPreview` da Fase 1. Só usam tokens semânticos, então funcionam em claro e escuro. API pensada para virar pacote compartilhado (P2).
2. **Textos das telas** vêm do PRD da LP (7.5) e, quando ele não traz o texto literal, do PRD do app: onboarding (14.3), diálogo de envio em massa (14.7), mensagens de WhatsApp (14.10, com as variáveis da Loja Exemplo). A variável `{{4}}` do template `hora_de_repor` aparece como "link do produto". Ficam em `lib/mock/loja-exemplo.ts`, junto dos números.
3. **Conflito no PRD:** o marcador ② da aba Clientes diz "total gasto, pedidos e segmento.", mas o glossário (4.5) proíbe "segmento" na página. Vale o glossário: o texto virou "total gasto, pedidos e tipo de cliente." O teste de copy lista esse desvio explicitamente. **Diego pode trocar a palavra.**
4. **Carregamento:** o servidor renderiza o tour estático com a aba Início (HTML indexável, aria-label completo). Quando a seção chega a ~600 px da viewport, `TourLoader` importa `TourInteractive`, que renderiza a mesma marcação com estado → zero CLS (teste E2E mede). As outras 5 abas vêm nesse mesmo chunk tardio, e não uma por clique: são só marcação, e evitar um atraso ao trocar de aba vale mais que alguns KB que já carregam fora do JS inicial.
5. **Sem bibliotecas no tour:** abas (`role="tablist"`, setas/Home/End), alternâncias (`aria-pressed`) e balões dos marcadores são próprios. Radix exigiria hidratar o tour no carregamento da página, o que traria o JS dele para o bundle inicial.
6. **Escala das molduras:** a caixa tem `aspect-ratio` fixo (1440×900 ou 390×780) só com CSS; o `ScaledViewport` calcula `scale()` com ResizeObserver. A tela fica `inert` dentro de um `role="img"` com a descrição; os marcadores ficam numa camada irmã, fora do `inert`.
7. **Abas no mobile:** fileira de chips com rolagem dentro do próprio contêiner. O `Select` abaixo de 360 px não foi feito: 360 px é a largura mínima suportada.
8. **Barra de endereço** da moldura "Computador" mostra o host de `NEXT_PUBLIC_APP_URL` quando existir; sem ele, fica vazia (domínio a definir).
9. **Envio em massa:** a lista atrás do diálogo é só forma (barras esmaecidas), sem nomes nem números, para não inventar dados além dos do PRD.
10. **Badge RFM** recebe o nome do segmento como texto; só "Leais" aparece (único segmento citado no DS).
