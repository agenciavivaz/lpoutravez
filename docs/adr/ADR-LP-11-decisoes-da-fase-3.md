# ADR-LP-11 — Decisões de implementação da Fase 3 (simulador)

**Status:** aceita · 09/10/2026

1. **Contas e premissas** em `lib/simulator/calc.ts` e `lib/simulator/config.ts`, exatamente como no PRD 8.2–8.3. Teste unitário reproduz o exemplo (1.200 · 300 · 36 · R$ 5.400 · R$ 835,02 · R$ 6,47). Custos parciais são arredondados ao centavo antes da soma, como no exemplo do PRD.
2. **Slider nativo** (`input type="range"`) em vez do Slider do Radix: setas, Home/End e PageUp/PageDown já funcionam, leitor de tela anuncia o valor (`aria-valuetext` em pt-BR) e não pesa JS. Estilo com `accent-color` ink-300 (o `primary` do tema escuro).
3. **Campo numérico** é texto com `inputMode="decimal"` e formato pt-BR ("2.000", "3,5"). Enquanto a pessoa digita, o texto fica como rascunho; o resultado só atualiza quando o número está dentro da faixa, e ao sair do campo o valor é limitado à faixa e ao passo.
4. **"Ver as contas"** usa `<details>`/`<summary>` nativos (Collapsible sem JS).
5. **Carregamento tardio:** o servidor renderiza o simulador com os padrões (números já no HTML); o interativo carrega perto da viewport com a mesma marcação (`hooks/use-near-viewport.ts`, compartilhado com o tour).
6. **Contagem de 400 ms** só quando os números mudam; com `prefers-reduced-motion`, troca direto.
7. **Exibição:** vendas em reais inteiros ("R$ 5.400"); clientes arredondados; custo e "para cada R$ 1" com centavos.
8. **Passagem para o formulário:** o CTA grava `{orders, ticket, rate}` em `sessionStorage` (`ov_simulator_snapshot`) e dispara `ov:simulator-snapshot`. A Fase 4 lê isso para pré-preencher "pedidos por mês" (`ordersRange()`) e salvar `simulator_snapshot`.
9. **Pendente (PRD 17, pergunta 8):** confirmar o preço do crédito (R$ 0,30) e os preços da Meta antes do lançamento, ou desligar com `NEXT_PUBLIC_FEATURE_SIMULATOR=false` (não precisa de deploy de código; precisa só de redeploy na Vercel para a env valer).
