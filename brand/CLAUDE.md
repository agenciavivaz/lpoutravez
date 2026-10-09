# CLAUDE.md — Outra Vez Design System v2

## Regra 0
Antes de criar qualquer interface, peça, tela, landing page, email visual ou componente,
leia este arquivo e `DESIGN_SYSTEM_SPEC.md`.

## Marca fechada
- Direção: A — Retorno quente
- Primária: azul-tinta profundo
- Acento: coral retorno
- Fundo claro: neutro quente
- Tipografia: Plus Jakarta Sans
- Ícones: Lucide
- Metáfora: retorno / ciclo / algo que volta
- Slogan: “Vendeu uma vez? Venda outra vez.”

## Princípio visual
O Outra Vez não deve parecer um SaaS de BI. Deve parecer uma ferramenta de operação
feita para um seller PME brasileiro que resolve tudo no celular.

A interface deve ser clara antes de ser sofisticada.

## Invariantes
- mobile-first real em 360 px;
- 390 px é o frame de referência mobile;
- 1440 px é o frame de referência desktop;
- toque >= 44x44 px;
- WCAG 2.1 AA;
- sem rolagem horizontal;
- shadcn/ui como base;
- Lucide para ícones;
- status sempre ícone + texto + cor;
- tabular nums em dinheiro, percentuais, datas e contagens;
- nenhum logo, mascote ou cor-assinatura de marketplace;
- verde WhatsApp somente em representação explícita do WhatsApp;
- interface inteira em pt-BR;
- não usar: lead, opt-in, enrichment, conversion, journey.

## Hierarquia de cor
1. Neutros quentes = estrutura
2. Azul-tinta = ação, confiança, navegação e estrutura
3. Coral = retorno, ciclo e momento de marca
4. Verde = sucesso semântico
5. Verde WhatsApp = somente WhatsApp

## Proibição importante
Não transformar coral em “segunda cor de botão”.
O botão primário continua azul-tinta.

## Geração de novas telas
1. Resolva o layout em 360–390 px primeiro.
2. Reuse componentes existentes.
3. Reuse tokens existentes.
4. Só crie token/componente se houver padrão repetível.
5. Adapte para desktop.
6. Teste claro e escuro.
7. Revise glossário.
8. Valide `ACCEPTANCE.md`.

## Geração de marketing
- uma ideia por peça;
- headline curta;
- número concreto em destaque quando houver;
- fundo quente ou azul-tinta;
- coral como gesto de retorno;
- evitar dashboards flutuantes genéricos;
- evitar estética de IA futurista;
- não reproduzir logos dos marketplaces.
