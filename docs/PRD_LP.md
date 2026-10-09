# PRD — Landing Page "Outra Vez"
**Objetivo único: agendar uma demo gratuita**

| | |
|---|---|
| **Produto** | Outra Vez — CRM para quem vende em marketplace |
| **Slogan** | Vendeu uma vez? Venda outra vez. |
| **Dono** | Diego Rosa Rodrigues (Vivaz) |
| **Versão** | 1.0 — 08/10/2026 |
| **Status** | Pronto para desenvolvimento |
| **Repo** | `{{REPO_LP}}` — repo próprio, separado do app (sugestão: `agenciavivaz/outra-vez-site`) |
| **Vercel** | `{{PROJETO_VERCEL_LP}}` — projeto próprio, deploy automático a cada push na `main` (sugestão: `outra-vez-site`) |
| **Domínio** | `{{DOMINIO}}` — a definir (ver seção 17) |
| **Stack** | Claude Code · Next.js 15 (App Router, TypeScript) · Tailwind + shadcn/ui · Supabase (só para pedidos de demo) · Cal.com (agendamento) · Vercel |
| **Fontes da verdade da marca** | `CLAUDE.md` · `DESIGN_SYSTEM_SPEC.md` · `tokens.json` · `registry/*.json` · `design-system-v2.html` · `assets/logo-*.svg` · `PRD_CRMarketplace_v2.md` (seção 14 — copy do produto) |

> **Para o Claude Code:** este documento é a fonte da verdade da LP. Seções 1–3 explicam o *porquê*; 4–9 o *quê* (estrutura, copy final, "Conheça por dentro", formulário); 10–14 o *como* (stack, dados, tracking, performance, acessibilidade); 15 as fases com critérios de aceite. **Use os textos da seção 6 exatamente como estão** e centralize em `lib/copy/pt-BR.ts`. Trabalhe fase por fase. Cada push na `main` faz deploy em produção — **nunca faça push com build quebrado**.

---

## Sumário
1. Resumo
2. Público e mensagem
3. Objetivos, não-objetivos e métricas
4. Regras de marca aplicadas à LP
5. Arquitetura da página (mapa de seções)
6. Copy final por seção
7. "Conheça por dentro" — o tour do produto
8. Simulador "Quanto pode voltar"
9. Formulário e agendamento da demo
10. Stack, repo e Vercel
11. Dados (Supabase)
12. Tracking e eventos
13. SEO e compartilhamento
14. Performance e acessibilidade
15. Plano de execução por fases
16. Riscos
17. Perguntas em aberto para o Diego
18. Prompt de kickoff para o Claude Code

---

## 1. Resumo

Uma landing page de página única, mobile-first, que leva o dono de operação de marketplace a **agendar uma demo gratuita de 30 minutos**. A página precisa fazer três coisas, nesta ordem:

1. **Fazer o seller se reconhecer** na dor: paga comissão e anúncio toda vez para vender para quem já comprou.
2. **Mostrar o produto de verdade** — a seção "Conheça por dentro" com as telas reais do Outra Vez, alimentadas por números de uma loja de exemplo.
3. **Tirar o medo** que trava a decisão: "vou ser punido pelo marketplace?", "isso é legal?", "vou queimar meu WhatsApp?".

Tudo converge para um formulário curto em duas etapas que termina **dentro do calendário**, com o horário marcado na mesma tela.

---

## 2. Público e mensagem

**Quem chega:** dono(a) de operação PME que vende em 2+ marketplaces (Mercado Livre, Shopee, Amazon, Magalu), fatura de R$ 50 mil a R$ 1 mi/mês, usa Bling, resolve tudo no celular e não tem time de CRM. Vem de anúncio (Meta/Google), indicação, conteúdo ou da loja de apps do Bling.

**O que precisa sentir:** "isso foi feito pra mim, eu entendo tudo, e está me trazendo dinheiro de volta" — com a segurança de que não vai colocar a conta dele no marketplace em risco.

**Mensagem central:** *Venda de novo para quem já comprou de você — em qualquer marketplace, sem arriscar sua conta.*

**Objeções que a página precisa responder (em ordem de peso):**
| # | Objeção | Onde responde |
|---|---|---|
| 1 | "O marketplace vai me punir." | Seção Segurança + FAQ |
| 2 | "De onde vem o WhatsApp do cliente? Isso é legal?" | Como funciona + Segurança + FAQ |
| 3 | "Vai dar trabalho configurar." | Como funciona + tour (Conectar Bling) + FAQ |
| 4 | "Como sei que deu resultado?" | Tour (Início) + benefícios |
| 5 | "Quanto custa?" | Simulador + FAQ |
| 6 | "Já tenho WhatsApp Web / um CRM." | Comparação |

---

## 3. Objetivos, não-objetivos e métricas

### Objetivos
1. **Conversão principal:** demo agendada (evento `demo_scheduled`).
2. **Conversão secundária:** pedido de demo iniciado com contato válido (evento `demo_form_step1`), para recuperar quem não terminou o agendamento.
3. **Qualificar** sem atrito: saber volume, canais e ERP antes da call.
4. **Medir tudo por origem** (UTM, gclid, fbclid) para otimizar mídia paga.

### Não-objetivos (v1)
- Blog, central de ajuda, páginas por marketplace (P2).
- Preços públicos (pergunta em aberto no PRD do produto).
- Cadastro self-service / trial (a LP leva para demo; link "Entrar" só se o app já estiver no ar).
- Versão em espanhol.
- Depoimentos, logos de clientes ou números de resultado reais — **ainda não existem**; a página não inventa nenhum (ver 4.4).

### Metas de lançamento (hipóteses, revisar após 30 dias)
| Métrica | Meta |
|---|---|
| Taxa de agendamento (visitas únicas → `demo_scheduled`) | ≥ 3% tráfego pago · ≥ 6% tráfego orgânico/indicação |
| Etapa 1 → agendamento | ≥ 45% |
| Interação com o tour (≥ 2 abas vistas) | ≥ 35% das visitas que chegam na seção |
| Comparecimento na demo | ≥ 70% |
| LCP mobile (4G) | < 2,0 s |
| Lighthouse mobile | Performance ≥ 90 · Acessibilidade 100 · SEO 100 · Boas práticas 100 |

---

## 4. Regras de marca aplicadas à LP

> Regra 0 do `CLAUDE.md`: antes de criar qualquer peça, leia `CLAUDE.md` e `DESIGN_SYSTEM_SPEC.md`. Copie esses arquivos, `tokens.json`, `registry/` e `assets/` para a pasta `/brand` do repo da LP. **Não redesenhe a direção visual.**

### 4.1 Marca fechada (resumo)
- Direção **A — Retorno quente**. Primária **azul-tinta** `#1F2A6B` (ink-900). Acento **coral** `#E85D4A` (coral-500). Fundo claro **quente** `#F8F7F3` (warm-100), cards `#FCFBF8` (warm-50). Escuro: carvão `#181817`, nunca preto puro.
- Tipografia **Plus Jakarta Sans** (`next/font/google`, pesos 400/500/600/700/800, `display: swap`). Display de comunicação pode ir de 48 a 72 px+ (o DS usa `clamp(42px, 6vw, 82px)` no H1, `letter-spacing: -0.035em`, `line-height: 1.12`).
- Ícones **Lucide**. Algarismos tabulares (`tabular-nums`) em todo dinheiro, percentual, data e contagem.
- **Metáfora do retorno:** o "O" que volta ao ponto de partida, o laço com a ponta coral (`.loop` / `.loop-art` do `design-system-v2.html`). Use em 3 momentos no máximo: hero, "Como funciona" e CTA final.

### 4.2 Hierarquia de cor na LP
1. Neutros quentes = estrutura (fundo, cards, bordas).
2. Azul-tinta = ação e confiança. **Todo botão primário é azul-tinta.** Faixas de seção escuras usam ink-900/ink-950.
3. Coral = retorno e momento de marca: eyebrows, laço, destaque de número, sublinhado de uma palavra no H1. **Nunca botão.**
4. Verde semântico (`--money` `#1E5C40` claro / `#79C99E` escuro) = valores em reais positivos e "Comprou de novo".
5. Verde WhatsApp `#25D366` = **somente** dentro de representações do WhatsApp (bolha, ícone de canal, botão "Falar no WhatsApp").

### 4.3 Contraste — atenção ao coral (WCAG AA)
| Uso | Cor | Status |
|---|---|---|
| Eyebrow/texto pequeno coral sobre fundo claro | **coral-700 `#A8372B`** (≈ 6:1) | ✅ usar este |
| coral-500 `#E85D4A` sobre `#F8F7F3` | ≈ 3,2:1 | ❌ só decorativo, ícone grande ou texto ≥ 24 px bold |
| Eyebrow coral sobre faixa azul-tinta | **coral-300 `#FFA18C`** (≈ 7:1) | ✅ |
| Texto sobre fundo coral-500 | ink-900, **somente texto grande (≥ 24 px)** | ⚠️ corpo de texto vai em fundo coral-100 `#FFE2DA` |
| Texto secundário | `--muted-foreground` `#736D65` | ✅ |

Rode verificação automática de contraste (axe) nos dois temas antes de cada merge.

### 4.4 Proibições
- **Nenhum logo, mascote ou cor-assinatura de marketplace** (nem do Bling). Canais aparecem como **chips neutros com o nome escrito** (componente "Chip de canal").
- Nada de "dashboard flutuando no espaço", estética de IA futurista, gradiente neon, foto de banco de imagem genérica.
- **Nada de prova social inventada:** zero depoimentos fictícios, zero logos de clientes, zero "+500 sellers", zero resultado apresentado como real. Os números do tour e do hero são de uma **loja de exemplo** e são rotulados como tal.
- Nada de promessa garantida ("venda 10x", "100% seguro", "sem risco").
- Exclamação só em comemoração. Nenhum emoji na LP.

### 4.5 Glossário na LP (mesmo do produto)
Nunca usar na página: *lead, opt-in, enriquecimento/enrichment, conversão/conversion, journey, segmento, CRM de funil, growth*.

| Ideia | Como aparece na LP |
|---|---|
| customer | Cliente |
| channel | Canal |
| enrichment | Busca de WhatsApp |
| journey | Régua |
| campaign | Envio em massa |
| segment | Lista de clientes |
| conversion | Comprou de novo |
| attributed revenue | Vendas geradas pelo Outra Vez |
| holdout | Grupo de comparação |
| opted_in | Aceitou novidades |
| transactional_only | Só avisos do pedido |
| opted_out | Não quer mensagens |
| low_confidence | Número a confirmar |

### 4.6 Ritmo visual das seções
Alternar para criar ritmo e manter leitura em mobile:

| Seção | Fundo |
|---|---|
| Hero | warm-100 com laço coral |
| Barra de canais | warm-100 |
| Problema | warm-50 (card grande) |
| Como funciona | warm-100 |
| **Conheça por dentro** | **ink-950** (faixa escura, o produto "acende") |
| O que muda | warm-100 |
| Sem arriscar sua conta | warm-50 com borda |
| Simulador | ink-900 |
| Comparação | warm-100 |
| Como é a demo + piloto | coral-100 |
| Perguntas | warm-100 |
| CTA final + formulário | ink-900 com laço coral |
| Rodapé | warm-200 |

Tema escuro da página inteira: **P1**. Os tokens já entram com claro e escuro desde a Fase 0; o tour tem alternância claro/escuro própria (seção 7).

---

## 5. Arquitetura da página (mapa de seções)

```
/                     LP (uma página, âncoras)
  #inicio             0. Header fixo
                      1. Hero
                      2. Barra de canais
  #problema           3. Problema
  #como-funciona      4. Como funciona
  #por-dentro         5. Conheça por dentro  ← peça central
  #o-que-muda         6. O que muda na sua operação
  #seguranca          7. Sem arriscar sua conta
  #simulador          8. Quanto pode voltar
  #comparacao         9. Outra Vez vs. o jeito de hoje
  #demo              10. Como é a demo + Programa piloto
  #perguntas         11. Perguntas frequentes
  #agendar           12. CTA final + formulário de agendamento
                     13. Rodapé
                      +  Barra de CTA fixa no mobile

/obrigado             Confirmação pós-agendamento (página de conversão)
/lista-de-espera      Confirmação para quem não usa Bling
/privacidade          Política de privacidade do site
/termos               Termos de uso do site
/api/cal/webhook      Webhook do Cal.com
/opengraph-image      Imagem OG gerada (next/og)
```

**CTA principal em toda a página:** **Agendar demo grátis** → rola até `#agendar` e foca o primeiro campo.
**CTA secundário (só no hero):** **Ver por dentro** → rola até `#por-dentro`.

---

## 6. Copy final por seção

> Textos definitivos. Variáveis entre `{chaves}`. Itens marcados **[confirmar Diego]** dependem da seção 17.

### 0. Header fixo
- Logo horizontal (`logo-horizontal.svg`; na faixa escura, `logo-horizontal-negative.svg`). Link para o topo.
- Navegação (desktop): **Como funciona** · **Por dentro** · **Segurança** · **Perguntas**
- Link discreto: **Entrar** → `{NEXT_PUBLIC_APP_URL}` *(só renderiza se a env existir)*
- Botão primário: **Agendar demo**
- Mobile: logo + botão **Agendar demo** + menu (Sheet) com as âncoras.
- Fundo translúcido warm-100 com `backdrop-filter: blur(18px)` ao rolar; borda inferior `--border`.

### 1. Hero
- Eyebrow: **CRM para quem vende em marketplace**
- H1: **Vendeu uma vez? Venda *outra vez.*** (o "outra vez" ganha sublinhado em laço coral, SVG decorativo)
- Subtítulo: **O Outra Vez transforma as notas fiscais do seu Bling em clientes com nome, histórico e WhatsApp — e manda a mensagem certa na hora de comprar de novo. Em qualquer marketplace, sem arriscar sua conta.**
- Botões: **Agendar demo grátis** (primário) · **Ver por dentro** (secundário)
- Microcopy abaixo dos botões: **30 minutos · por videochamada · grátis e sem compromisso**
- Visual (direita no desktop, abaixo no mobile): moldura de celular com uma conversa de WhatsApp da **Loja Exemplo** (componente "Preview WhatsApp"):
  - Bolha 1 (empresa): *"Oi, Maria! Aqui é da Loja Exemplo. Seu pedido Kit Refil Lavanda foi faturado e já está seguindo para entrega. Se tiver qualquer problema com a entrega, é só responder esta mensagem. Você também quer receber dicas e ofertas da Loja Exemplo por aqui?"* — botões **[Quero receber]** **[Não, obrigado]**
  - Resposta (cliente): **Quero receber**
  - Separador de data: *42 dias depois*
  - Bolha 2 (empresa): *"Oi, Maria! O Kit Refil Lavanda que você comprou costuma durar cerca de 45 dias. Já está na hora de repor?"* — botão **[Ver produto]**
  - Por cima, saindo da moldura, um card pequeno (KPI Card compacto): **Comprou de novo** · **R$ 149,90** (cor `--money`) · chip neutro **Shopee**
  - Atrás da moldura: laço coral (`.loop`) grande, parcialmente cortado.
  - Legenda minúscula sob o visual: *Conversa ilustrativa de uma loja de exemplo.*
- Animação de entrada (respeitando `prefers-reduced-motion`): bolhas aparecem em sequência (150 ms cada), o card "Comprou de novo" entra por último com o laço completando a volta (600 ms, o máximo permitido para celebração).

### 2. Barra de canais
- Texto: **Para quem vende em**
- Chips neutros (componente "Chip de canal", sem logo): **Mercado Livre** · **Shopee** · **Amazon** · **Magalu** · **e outros canais do seu Bling**
- À direita (ou linha de baixo no mobile): ícone `Plug` + **Integrado ao Bling**

### 3. Problema
- Eyebrow: **O problema**
- H2: **Todo mês você paga de novo para vender para quem já comprou.**
- 3 cards (ícone Lucide + título + texto):
  1. `Store` — **O cliente é do marketplace, não seu.** Cada venda paga comissão e anúncio. Quando o cliente quer comprar de novo, você disputa ele do zero com quem anunciar mais.
  2. `Archive` — **Seus clientes estão parados no Bling.** Milhares de nomes e CPFs nas notas fiscais, sem telefone, sem histórico entre canais e sem ninguém olhando.
  3. `Clock` — **Ninguém avisa na hora de repor.** O produto acaba, o cliente abre o marketplace e compra de quem aparecer primeiro. Não precisava ser assim.
- Fecho (texto em destaque, tamanho 20–24, ink-900): **A próxima venda pode começar de quem já comprou de você.**

### 4. Como funciona
- Eyebrow: **Como funciona**
- H2: **Do pedido à recompra, no automático.**
- Subtítulo: **Você conecta o Bling uma vez. O resto roda sozinho.**
- Diagrama em laço (desktop: 5 nós em círculo com o laço coral ligando o último ao primeiro; mobile: lista vertical com uma linha que volta para o topo no final). Cada nó: número, ícone, título, texto.
  1. `Plug` — **Conecte seu Bling.** Lemos seus pedidos e notas fiscais. Não alteramos nada no seu Bling.
  2. `Users` — **Seus clientes numa lista só.** Quem comprou no Mercado Livre e na Shopee com o mesmo CPF vira um cliente só, com todo o histórico.
  3. `Search` — **Busca de WhatsApp.** Encontramos o WhatsApp de cada cliente a partir do CPF da nota. Você define quanto quer gastar.
  4. `Repeat` — **Réguas no automático.** A primeira mensagem é sempre sobre o pedido real e pergunta se o cliente quer receber novidades. Depois vêm aviso de reposição e reativação.
  5. `TrendingUp` — **Veja quem comprou de novo.** Cada venda que volta aparece no painel, com quanto custou para trazer.
- Microinteração: quando o nó 5 entra na tela, o laço completa a volta e o nó 1 pulsa uma vez ("cliente voltou").

### 5. Conheça por dentro
Ver seção 7 (estrutura, telas, dados e textos de cada aba).
- Eyebrow (coral-300): **Conheça por dentro**
- H2 (branco): **É isso que você vai usar todo dia.**
- Subtítulo: **Telas reais do Outra Vez. Os números são de uma loja de exemplo.**
- CTA ao fim da seção: **Quero ver com os meus números** → `#agendar`

### 6. O que muda na sua operação
- Eyebrow: **O que muda**
- H2: **Menos venda que se perde. Mais cliente que volta.**
- 6 cards (2 colunas no desktop, 1 no mobile). Os cards 2 e 6 são "cards de número" no estilo `ad-card` do DS.
  1. `Users` — **Um cliente, todos os canais.** O mesmo comprador do Mercado Livre, da Shopee e da Amazon numa ficha só, com quanto já gastou e quando comprou pela última vez.
  2. *(card coral-100, número grande em ink-900)* **312 clientes na hora de repor o Kit Refil.** O Outra Vez calcula quando cada produto costuma acabar e avisa o cliente na hora certa. *Exemplo ilustrativo.*
  3. `ShieldCheck` — **Pós-venda que protege sua reputação.** O cliente recebe aviso do pedido e um canal direto para resolver problema antes de abrir reclamação no marketplace.
  4. `BookUser` — **Uma base que é sua.** Cada cliente que aceita novidades fica na sua lista, pronto para a próxima campanha — sem depender do anúncio.
  5. `Receipt` — **Custo antes de enviar.** Você vê quanto o WhatsApp vai cobrar e quantos clientes ficam de fora antes de confirmar qualquer envio em massa.
  6. *(card ink-900, número em `--money` escuro)* **R$ 4.820 voltaram em vendas.** O painel mostra as vendas geradas pelo Outra Vez: pedidos de quem recebeu sua mensagem e comprou de novo, em qualquer canal. *Exemplo ilustrativo.*

### 7. Sem arriscar sua conta
- Eyebrow: **Segurança**
- H2: **Feito para vender de novo sem colocar sua conta em risco.**
- Subtítulo: **O medo de ser punido pelo marketplace é real. Por isso o Outra Vez já vem com as regras certas ligadas.**
- 5 itens (ícone + título + texto), lista em 2 colunas no desktop:
  1. `MessageSquareText` — **A primeira mensagem é sobre o pedido.** Nada de oferta fria. O cliente recebe um aviso útil e escolhe se quer receber novidades.
  2. `UserCheck` — **Novidade só para quem aceitou.** Mensagens de oferta só saem para clientes que responderam "Quero receber". Quem envia SAIR para de receber na hora.
  3. `Link` — **Links levam para a sua loja no marketplace.** Por padrão, a recompra acontece dentro do canal onde você já vende.
  4. `BadgeCheck` — **API oficial do WhatsApp.** As mensagens saem pelo número da sua loja, pela API oficial — sem gambiarra que derruba número.
  5. `Lock` — **Seus dados, suas regras.** Você continua dono dos dados dos seus clientes. Guardamos só o necessário e registramos de onde cada informação veio.
- Nota de rodapé da seção (texto 14, muted): **Cada marketplace tem as próprias regras. Na demo, mostramos como o Outra Vez lida com cada uma delas.**
- **[confirmar Diego]** Revisar os itens 3 e 5 com o jurídico antes de publicar (pergunta 1 do PRD do produto).

### 8. Quanto pode voltar (simulador)
Ver seção 8.
- Eyebrow (coral-300): **Faça as contas**
- H2 (branco): **Quanto pode voltar para a sua loja?**
- Subtítulo: **Mexa nos números. É uma simulação, não uma promessa — na demo a gente refaz com os seus dados.**

### 9. Comparação
- Eyebrow: **Comparação**
- H2: **O que muda em relação ao jeito de hoje.**
- Tabela (no mobile vira cards por coluna — sem rolagem horizontal). Cada célula: ícone + texto (`Check` **Sim** · `Minus` **Em parte** · `X` **Não**), nunca só cor.

| | Planilha do Bling | WhatsApp Web + extensão | CRM genérico | **Outra Vez** |
|---|---|---|---|---|
| Clientes de todos os canais numa lista só | Em parte | Não | Em parte | **Sim** |
| Encontra o WhatsApp a partir da nota | Não | Não | Não | **Sim** |
| Avisa quando o produto deve acabar | Não | Não | Não | **Sim** |
| Pede permissão antes de mandar novidades | Não | Não | Em parte | **Sim** |
| Mostra quanto voltou em vendas | Não | Não | Em parte | **Sim** |
| Envio pela API oficial do WhatsApp | Não | Não | Em parte | **Sim** |
| Funciona bem no celular | Não | Sim | Em parte | **Sim** |

- Coluna "Outra Vez" destacada com fundo ink-50 e borda ink-900. Não citar marcas concorrentes por nome.

### 10. Como é a demo + Programa piloto
- Eyebrow: **A demo**
- H2: **30 minutos para ver se faz sentido pra sua loja.**
- 3 passos numerados:
  1. **Entendemos sua operação.** Canais, volume de pedidos e quais produtos seus clientes compram de novo.
  2. **Mostramos o Outra Vez por dentro.** Da conexão com o Bling até a primeira venda que volta.
  3. **Fazemos as contas com os seus números.** Quanto pode voltar e quanto custa para trazer.
- Linha de apoio: `Video` **Por videochamada** · `Clock` **30 minutos** · `BadgeCheck` **Grátis e sem compromisso**
- Card do anfitrião **[confirmar Diego]**: foto circular (opcional) + **Diego Rodrigues, fundador do Outra Vez** + *"Eu mesmo faço a demo. Se o Outra Vez não fizer sentido pra sua operação, eu te falo isso na call."*
- Card "Programa piloto" **[confirmar Diego — só publicar se for verdade]**:
  - Título: **Programa piloto aberto**
  - Texto: **Estamos abrindo o Outra Vez para um grupo pequeno de sellers. Quem entra agora acompanha o produto de perto e tem condições de piloto.**
  - Controlado por `NEXT_PUBLIC_FEATURE_PILOT=true|false`.
- Botão: **Agendar demo grátis**

### 11. Perguntas frequentes
- Eyebrow: **Perguntas**
- H2: **O que todo seller pergunta antes da demo.**
- Accordion (shadcn), uma aberta por vez, todas indexáveis (conteúdo no HTML, não carregado sob demanda):

1. **Posso ser punido pelo marketplace?**
   O Outra Vez foi desenhado para reduzir esse risco: a primeira mensagem é sempre sobre o pedido real, novidades só vão para quem aceitou receber e os links levam, por padrão, para a sua loja dentro do marketplace. Nunca usamos o chat do marketplace. Cada canal tem regras próprias — na demo mostramos como o Outra Vez lida com elas.
2. **Como vocês encontram o WhatsApp do meu cliente?**
   Pela Busca de WhatsApp: consultamos uma base de dados cadastrais a partir do CPF da nota fiscal. Se o contato já tem celular no seu Bling, usamos esse número sem custo. Quando o nome encontrado não bate com o da nota, o número fica como "Número a confirmar" e não entra nas réguas automáticas.
3. **Isso está de acordo com a LGPD?**
   Você continua dono dos dados dos seus clientes e o Outra Vez trata esses dados em seu nome. Guardamos só o necessário (telefone, e-mail, cidade e UF), registramos de onde cada dado veio e toda mensagem tem uma saída fácil. O cliente também tem uma página para parar de receber mensagens quando quiser. **[confirmar Diego — revisar com jurídico]**
4. **Preciso usar o Bling?**
   Hoje, sim: o Outra Vez lê pedidos e notas pelo Bling. Outros ERPs estão nos planos. Se você usa outro, deixe seu contato que avisamos quando chegar.
5. **O Outra Vez altera alguma coisa no meu Bling?**
   Não. Só lemos pedidos, notas fiscais e contatos.
6. **Em quanto tempo vejo meus clientes?**
   Os primeiros clientes aparecem minutos depois de conectar o Bling. O histórico completo continua carregando em segundo plano, sem você precisar esperar.
7. **Preciso ter a API oficial do WhatsApp?**
   As mensagens saem pelo número da sua loja, pela API oficial do WhatsApp. Se você ainda não tem, na demo mostramos o passo a passo para conectar.
8. **Vou ter que montar as réguas do zero?**
   Não. Você começa com réguas prontas de pós-venda, reposição e reativação, e ajusta o que quiser.
9. **Quanto custa?**
   Depende do tamanho da sua operação. Na demo mostramos os planos e estimamos o custo com os seus números. A Busca de WhatsApp e as mensagens são cobradas por uso, e você vê o custo antes de cada envio.

### 12. CTA final + formulário
- Faixa ink-900 com laço coral grande ao fundo.
- Eyebrow (coral-300): **Agende sua demo**
- H2 (branco): **Seu cliente já comprou. A próxima venda pode começar daí.**
- Subtítulo: **Preencha em menos de um minuto e escolha o melhor horário.**
- Formulário à direita (card warm-50) — ver seção 9.
- Ao lado do formulário (desktop) / abaixo (mobile), lista curta com `Check`: **Grátis e sem compromisso** · **30 minutos por videochamada** · **Com os números da sua loja**
- Link alternativo: ícone WhatsApp (verde WhatsApp permitido) + **Prefere falar pelo WhatsApp?** → `https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Oi%2C%20quero%20conhecer%20o%20Outra%20Vez` (abre em nova aba; dispara evento `whatsapp_click`).

### 13. Rodapé
- Logo + slogan **Vendeu uma vez? Venda outra vez.**
- Links: **Como funciona** · **Por dentro** · **Perguntas** · **Política de privacidade** · **Termos de uso**
- Linha legal: **Outra Vez é um produto da Vivaz · CNPJ {CNPJ_VIVAZ}** **[confirmar Diego]**
- Aviso: **Mercado Livre, Shopee, Amazon, Magalu e Bling são marcas de seus respectivos donos. O Outra Vez não é afiliado a elas.**

### Barra de CTA fixa (só mobile)
- Aparece depois que o hero sai da tela; some quando `#agendar` está visível.
- Fundo warm-50 com borda superior, padding com `env(safe-area-inset-bottom)`.
- Botão de largura total: **Agendar demo grátis** · linha de apoio: **30 min · grátis**

### /obrigado
- Laço coral completo (animação de 600 ms, uma vez).
- H1: **Demo marcada.**
- Texto: **Você vai receber a confirmação e o link da videochamada no e-mail {email}. Quer adiantar? Separe quantos pedidos sua loja faz por mês e quais produtos seus clientes costumam comprar de novo.**
- Data/hora (vinda da URL do Cal.com, formato `dd/mm/aaaa às hh:mm`): **{data} às {hora}**
- Botão secundário: **Adicionar ao calendário** (link `.ics` do Cal.com)
- Link: **Voltar para o início**
- `noindex`.

### /lista-de-espera
- H1: **Você está na lista.**
- Texto: **Por enquanto o Outra Vez funciona com o Bling. Assim que chegar ao {erp}, você é um dos primeiros a saber.**
- Link: **Voltar para o início** · `noindex`.

---

## 7. "Conheça por dentro" — o tour do produto

### 7.1 Princípio
As telas do tour **são componentes React de verdade**, os mesmos do design system/app, renderizados com dados de uma loja de exemplo — **não são screenshots**. Motivo: ficam nítidas em qualquer tela, respeitam claro/escuro, pesam pouco, não ficam desatualizadas quando o app muda (é só copiar o componente de novo) e o texto continua legível para buscador e leitor de tela.

**Origem dos componentes, em ordem de preferência:**
1. Copiar de `components/outra-vez/*` do repo do app (`agenciavivaz/CRM_Marketplace`) se já estiverem implementados.
2. Se ainda não existirem, implementar a partir de `registry/*.json` e do `design-system-v2.html`, **na pasta `components/outra-vez/` com a mesma API**, para que depois possam ser movidos para um pacote compartilhado (P2).

Componentes usados: KPI Card · Funil · Chip de canal · Badge RFM · Status de consentimento · Timeline do cliente · Editor de régua · Preview WhatsApp · Confirmação com custo · Stepper de onboarding · Progresso de importação · Saúde de integração · Medidor de créditos · Navegação (sidebar e barra inferior).

### 7.2 Layout
```
┌──────────────────────── faixa ink-950 ────────────────────────┐
│ Eyebrow · H2 · Subtítulo                                       │
│                                                                │
│ [Início] [Clientes] [Réguas] [WhatsApp] [Envio em massa] [Bling]  ← abas (Tabs)
│                                   [Celular | Computador] [☀︎|☾]  ← alternâncias
│ ┌────────────── legenda ──────────────┐ ┌────── moldura ──────┐ │
│ │ Título da aba                        │ │  tela real com      │ │
│ │ Texto de 2 linhas                    │ │  marcadores ①②③     │ │
│ │ ① o que você vê aqui                 │ │                     │ │
│ │ ② ...                                │ │                     │ │
│ │ ③ ...                                │ │                     │ │
│ └──────────────────────────────────────┘ └─────────────────────┘ │
│ Dados de uma loja de exemplo.           [Quero ver com os meus números] │
└────────────────────────────────────────────────────────────────┘
```
- **Desktop (≥ 1024):** legenda à esquerda (35%), moldura à direita (65%). Moldura "Computador" = janela de navegador minimalista (3 pontos, barra de endereço com `app.{DOMINIO}`), conteúdo renderizado a 1440 px e reduzido por `transform: scale()` calculado com `ResizeObserver`. Moldura "Celular" = aparelho de 390 px centralizado.
- **Mobile (< 1024):** abas viram uma fileira de chips com rolagem **dentro do próprio contêiner** (a página não rola na horizontal) ou um `Select` abaixo de 360 px. Moldura padrão = Celular; alternância "Computador" fica escondida no mobile. Legenda vem **abaixo** da moldura e os marcadores ①②③ abrem `Tooltip`/`Popover` ao toque.
- **Alternância Celular/Computador:** padrão "Computador" no desktop. Reforça que o produto é mobile-first.
- **Alternância claro/escuro do tour:** troca `data-theme` só dentro da moldura. Padrão: claro.
- **Marcadores (hotspots):** círculos numerados coral-500 com número ink-950 (texto grande o suficiente — 14 px bold num círculo de 24 px, área de toque de 44 px), posicionados por coordenadas percentuais por aba e por moldura. Ao passar o mouse/tocar no item da legenda, o marcador correspondente pulsa e vice-versa.
- **Transição entre abas:** fade + deslize de 8 px, 250 ms. Sem autoplay.

### 7.3 Acessibilidade do tour
- A tela dentro da moldura recebe `inert` (não é focável nem clicável) — é demonstração.
- Cada aba tem um `aria-label` na moldura com a descrição completa da tela (texto da legenda + resumo dos números).
- Abas com navegação por setas (Tabs do shadcn/Radix). Alternâncias são `ToggleGroup` com rótulos.
- `prefers-reduced-motion`: sem deslize, sem pulsação.

### 7.4 Desempenho do tour
- Toda a seção é carregada com `next/dynamic` quando chega a ~600 px da viewport (`IntersectionObserver`). Antes disso, placeholder `Skeleton` com a mesma altura (zero CLS).
- A aba Início é pré-renderizada no HTML estático (conteúdo indexável); as outras carregam ao clicar.

### 7.5 As seis abas — texto e dados

> Todos os dados vêm de `lib/mock/loja-exemplo.ts` (um único arquivo, tipado). **Os números abaixo fecham entre si** — não altere um sem ajustar os outros. Datas no formato `dd/mm/aaaa`, dinheiro `R$ 1.234,56`, `tabular-nums`.

**Loja:** Loja Exemplo · usuário **Diego** · canais **Mercado Livre**, **Shopee**, **Amazon** · período "Últimos 30 dias".

---

**Aba 1 — Início** (Dashboard)
- Legenda — Título: **Quanto voltou, num relance.** Texto: **A primeira tela mostra o que interessa: quanto seus clientes compraram de novo e quem está na hora de comprar.**
  - ① **Vendas geradas pelo Outra Vez** — pedidos de quem recebeu sua mensagem e comprou de novo.
  - ② **Do WhatsApp encontrado à recompra** — o funil mostra onde cada cliente está.
  - ③ **Oportunidade do dia** — clientes na hora de repor um produto.
- Tela (referência: tela 1 do `mPRD_DesignSystem` e bloco `#desktop` do `design-system-v2.html`):
  - Título **Bom dia, Diego** · botão secundário **Adicionar créditos**
  - KPIs:
    | Rótulo | Valor | Variação |
    |---|---|---|
    | Vendas geradas pelo Outra Vez | **R$ 4.820** (`--money`) | ↗ R$ 920 a mais que mês passado |
    | Clientes | **3.214** | 184 novos no período |
    | Com WhatsApp | **68%** | 2.186 clientes encontrados |
    | Aceitaram novidades | **27%** | 868 clientes |
  - Funil: Clientes **3.214** → Com WhatsApp **2.186** → Contatados **1.902** → Aceitaram novidades **868** → Clicaram **241** → Compraram de novo **37**
  - Gráfico "Vendas por semana" (7 barras, última em coral): R$ 410 · R$ 560 · R$ 520 · R$ 790 · R$ 690 · R$ 930 · R$ 920 (soma = R$ 4.820)
  - Card "Oportunidade": **312 clientes na hora de repor o Kit Refil** · *Clientes cuja próxima compra prevista está chegando.* · botão **Ver clientes**
  - Medidor de créditos (desktop): **1.380 créditos** · *dá para cerca de 21 dias no seu ritmo atual*
  - Saúde de integração (desktop): **Bling** — Conectado · **WhatsApp** — Conectado (ícone + texto + cor)

**Aba 2 — Clientes** (Ficha do cliente)
- Legenda — Título: **Cada comprador vira um cliente de verdade.** Texto: **Mesmo CPF em canais diferentes vira uma ficha só, com tudo que ele já comprou e cada mensagem que recebeu.**
  - ① **Um cliente, vários canais** — comprou no Mercado Livre e na Shopee.
  - ② **Quanto vale esse cliente** — total gasto, pedidos e segmento.
  - ③ **Tudo que aconteceu** — pedidos, mensagens e a recompra na linha do tempo.
- Tela:
  - **Maria Silva** · CPF `***.456.789-**` · Campinas/SP
  - Chips: **Mercado Livre** · **Shopee** · Badge RFM **Leais** · Status **Aceitou novidades** (ícone + texto)
  - Números: Total gasto **R$ 842,30** · Pedidos **6** · Ticket médio **R$ 140,38** · Última compra **04/09/2026** · Próxima compra prevista **19/10/2026**
  - WhatsApp **(19) 9••••-4321** · origem *Busca de WhatsApp*
  - Linha do tempo (mais recente no topo):
    | Data | Evento |
    |---|---|
    | 04/09/2026 | **Comprou de novo** · Shopee · Kit Refil Lavanda · R$ 149,90 |
    | 03/09/2026 | Clicou em "Ver produto" |
    | 02/09/2026 | Mensagem *hora_de_repor* enviada · lida |
    | 23/07/2026 | Pedido · Mercado Livre · Kit Refil Lavanda · R$ 129,90 |
    | 14/06/2026 | Pedido · Mercado Livre · Vela Aromática · R$ 125,90 |
    | 15/05/2026 | Pedido · Shopee · Difusor 250 ml · R$ 189,90 |
    | 18/04/2026 | Pedido · Shopee · Kit Refil Lavanda · R$ 126,80 |
    | 14/03/2026 | **Aceitou novidades** |
    | 14/03/2026 | Mensagem *pedido_faturado_optin* enviada · lida |
    | 12/03/2026 | Primeiro pedido · Mercado Livre · Kit Refil Lavanda · R$ 119,90 |
  - Os 6 pedidos somam R$ 842,30 (119,90 + 126,80 + 189,90 + 125,90 + 129,90 + 149,90).

**Aba 3 — Réguas** (Editor de régua)
- Legenda — Título: **A mensagem certa na hora certa, sozinha.** Texto: **Você liga uma régua pronta e ela cuida do resto. Nenhuma oferta sai para quem não aceitou receber.**
  - ① **O gatilho** — quando o cliente está perto da próxima compra prevista.
  - ② **A regra de ouro** — só segue quem aceitou novidades.
  - ③ **Sai sozinho** — quem compra de novo deixa de receber.
- Tela:
  - Título **Reposição — Kit Refil** · status **Ligada** · botão **Pausar régua**
  - Gatilho: **Quando estiver perto da próxima compra prevista**
  - Passos: **Esperar 0 dias** → **Condição: Aceitou novidades?** (Sim → segue · Não → Sair) → **Enviar "hora_de_repor"** → **Sair ao comprar**
  - Rodapé com números: **312 clientes na régua** · **29 compraram de novo nos últimos 30 dias** · Horário de envio **9h às 20h**

**Aba 4 — WhatsApp** (Preview da mensagem)
- Legenda — Título: **O que seu cliente recebe.** Texto: **Mensagens curtas, com o nome da sua loja, sobre o pedido que ele fez. E sempre com uma saída fácil.**
  - ① **Começa pelo pedido** — aviso útil, não propaganda.
  - ② **Pede permissão** — o cliente escolhe se quer novidades.
  - ③ **Saída fácil** — responder SAIR para tudo na hora.
- Tela: moldura de celular **sempre** (mesmo com "Computador" ativo), conversa da Loja Exemplo com as mensagens `pedido_faturado_optin` (botões Quero receber / Não, obrigado), resposta automática *"Combinado, Maria! Vamos mandar só o que vale a pena. Se quiser parar, é só enviar SAIR."* e `hora_de_repor` com botão **Ver produto**. Textos idênticos à seção 14.10 do PRD do produto. Único lugar do tour com verde WhatsApp.

**Aba 5 — Envio em massa** (Confirmação com custo)
- Legenda — Título: **Você sabe o custo antes de enviar.** Texto: **Antes de qualquer envio em massa, o Outra Vez mostra quanto vai custar e quem fica de fora — e por quê.**
  - ① **Quantos recebem** — só quem pode receber.
  - ② **Quanto custa** — valor estimado no WhatsApp.
  - ③ **Quem fica de fora** — e o motivo.
- Tela (Dialog sobre a lista de envios esmaecida):
  - Título: **Enviar "sentimos_sua_falta" para 1.240 clientes?**
  - Texto: **Custo estimado no WhatsApp: R$ 398,91. 316 clientes ficam de fora porque não aceitaram novidades ou estão fora do limite de frequência.**
  - Botões: **Enviar para 1.240 clientes** · **Voltar e revisar**

**Aba 6 — Bling** (Onboarding + importação)
- Legenda — Título: **Conecta em minutos. Não mexe em nada.** Texto: **Você autoriza o Bling uma vez. Os primeiros clientes aparecem em minutos e o histórico continua chegando em segundo plano.**
  - ① **Um clique** — conexão oficial com o Bling.
  - ② **Só leitura** — não alteramos nada no seu Bling.
  - ③ **Já dá pra usar** — sem esperar o histórico inteiro.
- Tela: Stepper de onboarding no passo 3 de 6 + Progresso de importação:
  - ✅ **Lendo seus contatos do Bling…** concluído
  - ⏳ **Importando pedidos dos últimos 30 dias… 1.284 de 2.010**
  - ○ Últimos 90 dias · ○ Histórico completo
  - Aviso: **Pronto para começar. O restante do histórico continua carregando em segundo plano.**
  - Botão: **Ver meus clientes**

### 7.6 Rótulo obrigatório
Abaixo da moldura, sempre visível: **Dados de uma loja de exemplo.** (texto 13, `--muted-foreground` no tema da faixa).

---

## 8. Simulador "Quanto pode voltar"

### 8.1 Entradas (Slider + Input numérico sincronizados, com rótulo visível)
| Campo | Padrão | Faixa | Passo |
|---|---|---|---|
| **Pedidos por mês** | 2.000 | 200 – 30.000 | 100 |
| **Ticket médio** | R$ 150 | R$ 30 – R$ 1.000 | R$ 10 |
| **Clientes que compram de novo depois das réguas** | 3% | 1% – 8% | 0,5% |

### 8.2 Premissas (em `lib/simulator/config.ts`, editáveis por Diego, visíveis no "Ver as contas")
| Premissa | Valor | Origem |
|---|---|---|
| Clientes com WhatsApp encontrado | 60% | meta do PRD do produto |
| Clientes que aceitam novidades | 25% | meta do PRD do produto |
| Preço da Busca de WhatsApp por cliente | R$ 0,30 | sugestão de preço do crédito (pergunta em aberto) |
| Mensagem de aviso do pedido | R$ 0,035 | tabela Meta Brasil (verificar antes de publicar) |
| Mensagem de novidade | R$ 0,3217 | tabela Meta Brasil (verificar antes de publicar) |
| Mensagens de novidade por cliente que aceitou, por mês | 2 | régua padrão |

### 8.3 Contas
```
com_whatsapp      = pedidos × 60%
aceitaram         = com_whatsapp × 25%
compraram_de_novo = com_whatsapp × taxa_recompra
vendas_que_voltam = compraram_de_novo × ticket

custo_busca       = pedidos × R$ 0,30
custo_avisos      = com_whatsapp × R$ 0,035
custo_novidades   = aceitaram × 2 × R$ 0,3217
custo_total       = custo_busca + custo_avisos + custo_novidades
para_cada_real    = vendas_que_voltam ÷ custo_total
```
**Exemplo com os padrões:** 1.200 com WhatsApp · 300 aceitaram · 36 compram de novo · **R$ 5.400 em vendas que voltam por mês** · custo R$ 600,00 + R$ 42,00 + R$ 193,02 = **R$ 835,02** · **cerca de R$ 6,47 em vendas para cada R$ 1**.
Teste unitário obrigatório reproduzindo esse exemplo.

### 8.4 Saída (cards no estilo KPI)
- **Vendas que podem voltar por mês:** R$ 5.400 (`--money`, tamanho KPI hero)
- **Clientes que compram de novo:** 36
- **Custo estimado de Busca de WhatsApp e mensagens:** R$ 835,02
- **Para cada R$ 1 investido:** R$ 6,47 em vendas
- Disclosure **Ver as contas** (Collapsible) com a tabela de premissas.
- Aviso fixo (14, muted): **Simulação com premissas médias, não é promessa de resultado. Não inclui a assinatura do Outra Vez, apresentada na demo. Preços do WhatsApp definidos pela Meta e sujeitos a mudança.**
- Botão: **Ver isso com os meus números** → `#agendar`, **levando os valores do simulador para o formulário** (pré-preenche "pedidos por mês" na etapa 2 e salva os três valores em `simulator_snapshot`).
- Números animam (contagem de 400 ms) só quando mudam; sem animação com `prefers-reduced-motion`.
- Feature flag `NEXT_PUBLIC_FEATURE_SIMULATOR` (padrão `true`) para Diego poder desligar sem deploy de código.

---

## 9. Formulário e agendamento da demo

### 9.1 Fluxo
```
[Etapa 1: contato] ──server action──▶ cria demo_request (status started) ──▶ evento demo_form_step1
        │
[Etapa 2: sua loja] ──server action──▶ atualiza demo_request
        │
        ├── ERP = Bling ou "Não sei" ──▶ status qualified ──▶ calendário Cal.com inline (pré-preenchido)
        │                                         │ bookingSuccessful (front) ──▶ evento demo_scheduled ──▶ /obrigado
        │                                         └ webhook BOOKING_CREATED (back) ──▶ status scheduled + avisos
        │
        └── outro ERP / não usa ──▶ status waitlist ──▶ /lista-de-espera
```

### 9.2 Etapa 1 — Contato
- Indicador: **1 de 2**
- Campos (rótulo visível, sempre):
  - **Seu nome** — texto, obrigatório, mín. 2 caracteres. `autocomplete="name"`
  - **WhatsApp com DDD** — máscara `(11) 98765-4321`, obrigatório, valida celular BR (DDD válido + 9 dígitos começando com 9), salva em E.164. `inputmode="tel"` `autocomplete="tel"`
  - **E-mail** — obrigatório, validação de formato. `inputmode="email"` `autocomplete="email"`
- Caixa obrigatória: ☐ **Aceito receber o contato do Outra Vez sobre a demo por WhatsApp e e-mail. Veja a [Política de privacidade].**
- Botão: **Continuar**
- Erros (abaixo do campo, ícone + texto, `aria-describedby`):
  - Nome: **Escreva seu nome.**
  - WhatsApp: **Confira o número: DDD + 9 dígitos.**
  - E-mail: **Confira o e-mail. Exemplo: voce@sualoja.com.br**
  - Caixa: **Marque para a gente poder falar com você.**

### 9.3 Etapa 2 — Sua loja
- Indicador: **2 de 2** · link **Voltar**
- Campos:
  - **Nome da loja** — texto, obrigatório
  - **Onde você vende?** — múltipla escolha em chips (mín. 1): Mercado Livre · Shopee · Amazon · Magalu · TikTok Shop · Loja própria · Outro
  - **Quantos pedidos por mês, somando todos os canais?** — `Select`: Até 300 · 300 a 1.000 · 1.000 a 3.000 · 3.000 a 10.000 · Mais de 10.000 *(pré-preenchido pelo simulador quando vier de lá)*
  - **Qual ERP você usa?** — `RadioGroup`: Bling · Tiny/Olist · Omie · Outro · Não uso ERP · Não sei
- Botão: **Escolher horário**
- Se ERP = "Outro", aparece campo **Qual?** (texto, opcional).

### 9.4 Calendário (Cal.com inline)
- Substitui o formulário no mesmo card, com transição de 250 ms. Título: **Escolha o melhor horário** · subtítulo: **30 minutos por videochamada.**
- Evento Cal.com `{NEXT_PUBLIC_CAL_LINK}` (ex.: `diego/demo-outra-vez`), duração 30 min, fuso America/Sao_Paulo, sincronizado com o Google Agenda do Diego, buffer de 15 min, antecedência mínima de 4 h, janela de 14 dias.
- Pré-preenchido: nome, e-mail, WhatsApp (campo personalizado), nome da loja; `metadata[demo_request_id]` para o webhook casar com o registro.
- Tema do embed: cores da marca (`brandColor: #1F2A6B`), fonte da página, layout `month_view` no desktop e `column_view` no mobile.
- Listener `bookingSuccessful` → evento `demo_scheduled` → `router.push('/obrigado?…')` com data/hora formatadas.
- Fallback se o embed não carregar em 8 s: mensagem **Não conseguimos abrir o calendário agora. A gente te chama no WhatsApp para marcar o horário.** + botão **Falar no WhatsApp**. O registro já está salvo como `qualified`; o aviso interno chega mesmo assim.

### 9.5 Persistência e retomada
- `demo_request_id` em `sessionStorage`; se a pessoa recarregar, volta para a etapa em que parou.
- Etapa 1 enviada e não agendada em 30 min → aviso interno "pedido de demo sem horário" para o Diego chamar no WhatsApp (job via Supabase `pg_cron` ou checagem no webhook de notificação — ver 11.3).

### 9.6 Anti-spam
- Campo honeypot oculto (`company_website`) + tempo mínimo de 3 s entre render e envio.
- Cloudflare Turnstile invisível validado na server action (P0).
- Limite: 5 envios por IP por hora (hash do IP, contado no Supabase).

### 9.7 Avisos internos (a cada pedido)
- **E-mail (Resend)** para `NOTIFY_EMAIL_TO` nas mudanças para `qualified`, `scheduled` e `waitlist`, com todos os campos + UTMs.
- **Webhook opcional** `DEMO_WEBHOOK_URL` (Make / DataCrazy) com o mesmo payload em JSON, para cair no CRM/WhatsApp do Diego.
- Assunto: `Demo marcada — {loja} · {pedidos/mês} · {data hora}` / `Pedido de demo sem horário — {loja}` / `Lista de espera — {erp} — {loja}`.

---

## 10. Stack, repo e Vercel

### 10.1 Decisões (ADRs curtos — gravar em `docs/adr/`)
| # | Decisão | Por quê | Alternativa descartada |
|---|---|---|---|
| ADR-LP-01 | **Repo e projeto Vercel separados do app** | Deploy, domínio e ritmo de mudança independentes; LP nunca derruba o app | Rota `(marketing)` dentro do app — acopla deploys e segredos |
| ADR-LP-02 | **Next.js 15 App Router, páginas estáticas (SSG)** + server actions só no formulário | Velocidade, mesma stack do app, componentes copiáveis | Astro — mais leve, mas sem reaproveitar os componentes React do app |
| ADR-LP-03 | **Mesma versão de Tailwind e shadcn/ui do repo do app** | Copiar componentes sem adaptação | Versões diferentes = retrabalho a cada cópia |
| ADR-LP-04 | **Cal.com para agendamento** (embed inline, webhooks, pré-preenchimento, Google Agenda) | Agendamento na mesma tela; webhooks no plano gratuito | Google Agenda (agendamento) — embed fraco, sem evento de sucesso confiável; Calendly — webhooks pagos |
| ADR-LP-05 | **Supabase em projeto próprio** (`outra-vez-site`, plano gratuito) para `demo_requests` | A LP não guarda a service role do banco do produto | Schema no banco do app — vazamento de segredo da LP exporia dados de clientes dos sellers |
| ADR-LP-06 | **Telas do tour como componentes, não imagens** | Nitidez, tema, peso, acessibilidade, manutenção | Screenshots — desatualizam, pesam, não têm tema escuro |
| ADR-LP-07 | **GTM + Consent Mode v2** com banner LGPD | Diego otimiza mídia paga; consentimento antes de pixel | Pixels direto no código — difícil de manter, sem controle de consentimento |

### 10.2 Dependências
`next@15` · `react@19` · `typescript` (strict) · `tailwindcss` · `shadcn/ui` (Radix) · `lucide-react` · `zod` · `react-hook-form` + `@hookform/resolvers` · `@calcom/embed-react` · `@supabase/supabase-js` · `resend` · `libphonenumber-js` (validação de WhatsApp) · `@vercel/analytics` · `@vercel/speed-insights` · dev: `eslint`, `prettier`, `vitest`, `@testing-library/react`, `@playwright/test`, `@axe-core/playwright`.
**Sem** `framer-motion` no P0: animações com CSS + `IntersectionObserver`. Só adicionar se o tour precisar e o orçamento de JS (seção 14) permitir.

### 10.3 Estrutura de pastas
```
/app
  layout.tsx                 fonte, metadata base, GTM, banner de consentimento
  page.tsx                   LP (composição das seções)
  obrigado/page.tsx
  lista-de-espera/page.tsx
  privacidade/page.tsx
  termos/page.tsx
  opengraph-image.tsx
  sitemap.ts  robots.ts
  api/cal/webhook/route.ts
/components
  /ui                        shadcn
  /outra-vez                 componentes do produto (copiados do app ou do registry)
  /sections                  Header, Hero, ChannelBar, Problem, HowItWorks, ProductTour,
                             Benefits, Safety, Simulator, Comparison, Demo, Faq, FinalCta, Footer,
                             MobileCtaBar
  /tour                      TourTabs, DeviceFrame, BrowserFrame, Hotspot, screens/*.tsx
  /form                      DemoForm, StepContact, StepStore, CalendarStep
  /brand                     Loop, LoopUnderline, Logo
/lib
  /copy/pt-BR.ts             TODO o texto da página
  /mock/loja-exemplo.ts      dados do tour e do hero
  /simulator/{config,calc}.ts
  /analytics/events.ts       dataLayer tipado
  /validation/demo.ts        schemas zod
  /supabase/admin.ts         client server-only
  phone.ts  utm.ts  rate-limit.ts
/actions/demo.ts             server actions (etapa 1, etapa 2)
/brand                       CLAUDE.md, DESIGN_SYSTEM_SPEC.md, tokens.json, registry/, assets/
/supabase/migrations
/docs/{PRD_LP.md, PROGRESS.md, adr/}
/tests                       unit (vitest) + e2e (playwright)
CLAUDE.md                    raiz: aponta para /brand/CLAUDE.md + regras desta LP
```

### 10.4 Vercel
- Projeto `{{PROJETO_VERCEL_LP}}` ligado ao repo `{{REPO_LP}}`. `main` = produção; cada PR = preview.
- Domínios: `{DOMINIO}` e `www.{DOMINIO}` (redirect 308 de `www` para o domínio raiz). O app fica em `app.{DOMINIO}` no projeto `crmarketplace` **[confirmar Diego]**.
- Previews com `noindex` (header `X-Robots-Tag: noindex` quando `VERCEL_ENV !== 'production'`).
- Vercel Analytics + Speed Insights ligados.
- Headers de segurança em `next.config.ts`: CSP (liberar `*.cal.com`, `challenges.cloudflare.com`, GTM/GA/Meta), `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, `Permissions-Policy` mínimo.

### 10.5 Variáveis de ambiente (`.env.example` sem valores)
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_URL=                 # opcional — mostra "Entrar" no header
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_CAL_LINK=                # ex.: diego/demo-outra-vez
NEXT_PUBLIC_WHATSAPP_NUMBER=         # E.164 sem "+", ex.: 5551999999999
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_FEATURE_SIMULATOR=true
NEXT_PUBLIC_FEATURE_PILOT=false

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=           # server-only
TURNSTILE_SECRET_KEY=
CAL_WEBHOOK_SECRET=
RESEND_API_KEY=
NOTIFY_EMAIL_TO=
DEMO_WEBHOOK_URL=                    # opcional — Make/DataCrazy
IP_HASH_PEPPER=
CRON_SECRET=

# P1 — eventos server-side
META_PIXEL_ID=
META_CAPI_TOKEN=
GA4_MEASUREMENT_ID=
GA4_API_SECRET=
```

---

## 11. Dados (Supabase — projeto `outra-vez-site`)

### 11.1 Tabela
```sql
create table public.demo_requests (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  status             text not null default 'started'
                     check (status in ('started','qualified','scheduled','waitlist','no_show','done','spam')),
  -- etapa 1
  name               text not null,
  whatsapp_e164      text not null,
  email              text not null,
  consent_contact    boolean not null,
  consent_text_version text not null,          -- ex.: '2026-10-08'
  -- etapa 2
  store_name         text,
  marketplaces       text[],
  orders_range       text check (orders_range in ('ate_300','300_1000','1000_3000','3000_10000','10000_mais')),
  erp                text check (erp in ('bling','tiny_olist','omie','outro','nenhum','nao_sei')),
  erp_other          text,
  simulator_snapshot jsonb,                     -- {orders, ticket, rate} se veio do simulador
  -- agendamento
  cal_booking_uid    text unique,
  scheduled_for      timestamptz,
  -- origem
  utm_source text, utm_medium text, utm_campaign text, utm_content text, utm_term text,
  gclid text, fbclid text, referrer text, landing_path text,
  user_agent         text,
  ip_hash            text,
  notified_no_slot_at timestamptz
);
create index on public.demo_requests (created_at desc);
create index on public.demo_requests (status);
create index on public.demo_requests (ip_hash, created_at);

alter table public.demo_requests enable row level security;
-- sem políticas: só a service role (server actions e webhook) lê e escreve.
```
- `updated_at` por trigger.
- UTMs capturadas na primeira visita (cookie first-party `ov_utm`, 30 dias, só após consentimento de análise; sem consentimento, captura apenas da URL atual).

### 11.2 Retenção (LGPD)
- `waitlist` e `started` sem avanço: apagar após 12 meses. `spam`: apagar após 30 dias. Job `pg_cron` mensal.
- Pedido de exclusão: e-mail de contato na Política de privacidade; exclusão manual por SQL documentada em `docs/RUNBOOK.md`.

### 11.3 Webhook do Cal.com (`/api/cal/webhook`)
- Valida assinatura `X-Cal-Signature-256` (HMAC SHA-256 com `CAL_WEBHOOK_SECRET`, comparação em tempo constante, corpo bruto).
- `BOOKING_CREATED` → acha o registro por `metadata.demo_request_id` (fallback: e-mail mais recente) → `status = scheduled`, `cal_booking_uid`, `scheduled_for` → e-mail + webhook interno.
- `BOOKING_CANCELLED` → `status = qualified` + aviso. `BOOKING_RESCHEDULED` → atualiza `scheduled_for`.
- Idempotente por `cal_booking_uid`. Resposta 200 em < 2 s.
- **Sem horário em 30 min:** `pg_cron` a cada 10 min chama `pg_net` → rota `/api/cron/no-slot` (Bearer `CRON_SECRET`) que avisa os `qualified` com `created_at < now() - 30 min` e `notified_no_slot_at is null`.

---

## 12. Tracking e eventos

### 12.1 Consentimento
- Banner LGPD (componente próprio, não biblioteca pesada) com **Aceitar todos** · **Só os necessários** · **Configurar**. Categorias: necessários (sempre), análise (GA4, Vercel Analytics já é anônimo), publicidade (Meta Pixel, Google Ads).
- Google Consent Mode v2: padrão `denied` até a escolha. Escolha salva em cookie por 12 meses.
- Texto do banner: **Usamos cookies para entender como a página é usada e medir nossos anúncios. Você escolhe.**

### 12.2 Eventos (`dataLayer`, tipados em `lib/analytics/events.ts`)
| Evento | Quando | Parâmetros |
|---|---|---|
| `cta_click` | qualquer CTA "Agendar demo" | `location` (header, hero, tour, benefits, demo, final, mobile_bar) |
| `section_view` | seção 50% visível (uma vez) | `section` |
| `tour_tab_view` | troca de aba no tour | `tab`, `device` (mobile/desktop), `theme` |
| `tour_hotspot` | interação com marcador | `tab`, `hotspot` |
| `simulator_change` | ajuste no simulador (debounce 1 s) | `orders`, `ticket`, `rate` |
| `faq_open` | abre pergunta | `question_id` |
| `demo_form_start` | foco no 1º campo | — |
| `demo_form_step1` | etapa 1 válida e salva | — (**conversão secundária**: GA4 `generate_lead`, Meta `Lead`) |
| `demo_form_step2` | etapa 2 salva | `orders_range`, `erp`, `qualified` (bool) |
| `demo_waitlist` | ERP não suportado | `erp` |
| `demo_scheduled` | `bookingSuccessful` do Cal.com | — (**conversão principal**: GA4 `schedule_demo`, Meta `Schedule`, Google Ads conversão) |
| `whatsapp_click` | link do WhatsApp | `location` |

Nunca enviar nome, e-mail ou telefone em texto para o dataLayer. Para Meta Advanced Matching / Enhanced Conversions (P1), usar hash SHA-256 no servidor.

### 12.3 P1 — conversões server-side
No webhook `BOOKING_CREATED`, enviar `Schedule` para Meta CAPI e `schedule_demo` para GA4 Measurement Protocol com `event_id` igual ao do front (deduplicação). Necessário para medir bem com bloqueadores e iOS.

---

## 13. SEO e compartilhamento
- `title`: **Outra Vez — CRM para quem vende em marketplace**
- `description`: **Transforme as notas fiscais do Bling em clientes com WhatsApp e réguas de recompra. Venda de novo para quem já comprou, em qualquer marketplace. Agende uma demo grátis.**
- `lang="pt-BR"`, canonical no domínio raiz, `sitemap.xml` (/, /privacidade, /termos), `robots.txt` (bloquear /obrigado, /lista-de-espera, /api).
- JSON-LD: `Organization` (Vivaz/Outra Vez), `SoftwareApplication` (`applicationCategory: BusinessApplication`, sem `aggregateRating` — não temos avaliações), `FAQPage` com as 9 perguntas.
- Imagem OG 1200×630 com `next/og`: fundo ink-900, laço coral, H1 "Vendeu uma vez? Venda outra vez." em branco, logo negativo. Fonte Plus Jakarta Sans embutida.
- Favicon/ícones a partir de `logo-symbol.svg` (16, 32, 180 apple-touch, 512).
- Um H1 por página; H2 por seção na ordem da seção 5.

---

## 14. Performance e acessibilidade

### 14.1 Orçamento
| Item | Limite |
|---|---|
| JS inicial (gzip) | ≤ 150 KB |
| LCP mobile 4G | < 2,0 s (elemento LCP = H1 do hero, nunca imagem) |
| CLS | < 0,05 |
| INP | < 200 ms |
| Fontes | 1 família, ≤ 5 pesos, `latin`, `display: swap`, preload do peso do H1 |
| Imagens | só SVG da marca e foto do Diego (`next/image`, AVIF/WebP, ≤ 30 KB) |

Carregamento tardio (dynamic import ao se aproximar da viewport): tour, simulador, embed do Cal.com, Turnstile, GTM após consentimento ou `requestIdleCallback`.

### 14.2 Acessibilidade (WCAG 2.1 AA — invariantes do `CLAUDE.md`)
- Mobile-first real em **360 px**; frames de referência 390 e 1440; **sem rolagem horizontal** em nenhum breakpoint (360, 640, 768, 1024, 1280).
- Toque ≥ 44×44 px; foco visível com `--ring` em tudo que é interativo; link "Pular para o conteúdo".
- Status e comparação sempre ícone + texto + cor.
- Formulário: rótulos visíveis, erros com `aria-describedby` e `aria-invalid`, foco vai para o primeiro erro ao enviar, anúncio da troca de etapa via `aria-live="polite"`.
- Contraste conforme 4.3. Axe sem violações nos dois temas.
- `prefers-reduced-motion`: desliga deslizes, pulsações, contagens e o laço animado (mostra o estado final).
- Navegação completa só com teclado: header → hero → tabs do tour (setas) → simulador (setas nos sliders) → accordion → formulário → calendário.

---

## 15. Plano de execução por fases

> Ao fim de cada fase: `lint` + `typecheck` + `test` + `build` → commit (Conventional Commits) → push. Atualizar `docs/PROGRESS.md`. Conferir cada tela em 360, 390, 768 e 1440.

### Fase 0 — Fundação
- Criar o projeto (Next.js 15, TS strict, Tailwind e shadcn na mesma versão do app, ESLint/Prettier, Vitest, Playwright).
- Copiar a pasta `/brand` e criar `CLAUDE.md` na raiz apontando para ela + regras desta LP (seções 4 e 14).
- Tokens de `tokens.json` → variáveis CSS claro/escuro compatíveis com shadcn (`--background`, `--primary`, `--accent`, `--money`, `--whatsapp` etc.) + escalas primitivas 50–950.
- Fonte, logo (componente `Logo` com variantes positiva/negativa/mono), componente `Loop` e `LoopUnderline`.
- `lib/copy/pt-BR.ts` com **todo** o texto da seção 6.
- Headers de segurança, `noindex` em preview, Vercel Analytics.
- ADRs da seção 10.1 em `docs/adr/`.
- **Aceite:** deploy de produção abre uma página com header, hero e rodapé com a marca correta; Lighthouse acessibilidade 100.

### Fase 1 — Página estática completa
- Todas as seções da 6, exceto tour, simulador e formulário (placeholders com a altura final).
- Barra de CTA fixa no mobile, header com âncoras e rolagem suave, accordion de FAQ, tabela de comparação que vira cards.
- Animações de entrada do hero e do "Como funciona" com `prefers-reduced-motion`.
- **Aceite:** sem rolagem horizontal de 360 a 1440; contraste AA (axe); textos idênticos à seção 6; nenhum termo proibido da 4.5 (teste automatizado que varre `pt-BR.ts`); nenhum logo de marketplace.

### Fase 2 — Conheça por dentro
- `lib/mock/loja-exemplo.ts` com os dados da 7.5 (teste: soma das barras = R$ 4.820; soma dos pedidos da Maria = R$ 842,30; R$ 398,91 = 1.240 × R$ 0,3217 arredondado).
- Componentes `components/outra-vez/*` (copiados do app ou implementados do registry).
- `TourTabs`, `DeviceFrame`, `BrowserFrame` com escala, `Hotspot`, alternâncias Celular/Computador e claro/escuro, 6 telas, `inert` + `aria-label`, carregamento tardio.
- **Aceite:** as 6 abas renderizam em celular e computador, claro e escuro; rótulo "Dados de uma loja de exemplo." sempre visível; CLS da seção = 0; teclado navega pelas abas; JS da seção carregado só perto da viewport.

### Fase 3 — Simulador
- `config.ts` + `calc.ts` com teste reproduzindo o exemplo da 8.3; UI com sliders e inputs sincronizados; "Ver as contas"; passagem dos valores para o formulário; feature flag.
- **Aceite:** padrões mostram R$ 5.400 / 36 / R$ 835,02 / R$ 6,47; aviso de simulação visível; teclado opera os sliders.

### Fase 4 — Formulário, agendamento e dados
- Projeto Supabase `outra-vez-site`, migration da 11.1, RLS sem políticas.
- Server actions das etapas 1 e 2 com Zod, honeypot, tempo mínimo, Turnstile, rate limit, captura de UTMs.
- Embed Cal.com pré-preenchido, fallback de 8 s, `/obrigado`, `/lista-de-espera`.
- Webhook `/api/cal/webhook` com assinatura e idempotência; e-mail Resend; webhook interno opcional; cron "sem horário".
- `/privacidade` e `/termos` (texto-base para revisão jurídica **[confirmar Diego]**).
- **Aceite (E2E Playwright, Cal.com em modo teste):** etapa 1 grava `started`; etapa 2 com Bling grava `qualified` e abre o calendário; agendamento grava `scheduled` via webhook e chega e-mail; ERP "Omie" vai para `/lista-de-espera` com status `waitlist`; envio com honeypot preenchido não grava; assinatura inválida no webhook → 401.

### Fase 5 — Tracking, SEO e performance
- Banner de consentimento + Consent Mode v2, GTM, eventos da 12.2 (teste que verifica o `dataLayer`).
- Metadata, OG image, sitemap, robots, JSON-LD.
- Ajuste fino para o orçamento da 14.1.
- **Aceite:** Lighthouse mobile ≥ 90/100/100/100; LCP < 2,0 s no Speed Insights; nenhum pixel de publicidade dispara antes do consentimento; eventos `demo_form_step1` e `demo_scheduled` visíveis no preview do GTM.

### Fase 6 — QA e lançamento
- Checklist de QA (abaixo), domínio de produção, teste real ponta a ponta (agendar uma demo de verdade e cancelar).
- **Aceite:** checklist 100% marcado; `docs/RUNBOOK.md` com: como trocar textos, como desligar simulador/piloto, como ver pedidos de demo no Supabase, como excluir dados de alguém.

### P1 (depois do lançamento)
- Conversões server-side (Meta CAPI + GA4 MP) com deduplicação.
- Tema escuro para a página inteira.
- Variações de headline para teste A/B (Vercel Flags/Edge Config): H1 slogan vs. **"Seus clientes do marketplace podem comprar de você outra vez."**
- Página do programa piloto com condições.
- Seção de depoimentos — **só com clientes reais do piloto e autorização por escrito**.

### Checklist de QA final
- [ ] Textos idênticos à seção 6; nenhum termo proibido; nenhuma exclamação fora de comemoração; nenhum emoji.
- [ ] Nenhum logo/cor-assinatura de marketplace ou do Bling; verde WhatsApp só em WhatsApp.
- [ ] Coral nunca em botão; texto coral pequeno usa coral-700 (claro) ou coral-300 (escuro).
- [ ] Todo número com `tabular-nums` e formato BR.
- [ ] "Dados de uma loja de exemplo." no tour; "Exemplo ilustrativo." nos cards de número; aviso no simulador.
- [ ] Nenhum depoimento, logo de cliente ou contagem de clientes inventada.
- [ ] 360/390/768/1024/1440 sem rolagem horizontal; toque ≥ 44 px; teclado completo; axe sem violações.
- [ ] Formulário: validações, erros, retomada após recarregar, fallback do calendário, lista de espera.
- [ ] Webhook do Cal.com: criado, cancelado, reagendado, assinatura inválida.
- [ ] Consentimento respeitado; eventos corretos; UTMs gravadas.
- [ ] Previews com `noindex`; produção indexável; OG image correta no WhatsApp e no LinkedIn.
- [ ] Política de privacidade e termos revisados.

---

## 16. Riscos
| Risco | Prob. | Impacto | Mitigação |
|---|---|---|---|
| Promessa da LP vira problema jurídico (LGPD/marketplace) | Média | Alto | Copy descreve o que o produto faz, sem garantias; revisão jurídica das seções 7 e FAQ 1/3 antes de publicar |
| Números do tour lidos como resultado real | Média | Médio | Rótulos "loja de exemplo"/"exemplo ilustrativo" fixos; sem depoimento inventado |
| Tour desatualiza em relação ao app | Alta | Baixo | Componentes copiados do app; P2: pacote compartilhado de componentes |
| Embed do Cal.com lento/quebrado derruba conversão | Baixa | Alto | Carregamento tardio, fallback para WhatsApp, registro salvo antes do calendário |
| Spam no formulário | Média | Baixo | Honeypot, tempo mínimo, Turnstile, rate limit, status `spam` |
| Simulador gera expectativa alta | Média | Médio | Padrões conservadores, premissas visíveis, aviso fixo, flag para desligar |
| Tráfego pago sem medição por bloqueio de pixel | Alta | Médio | Conversões server-side em P1 |

---

## 17. Perguntas em aberto para o Diego
| # | Pergunta | Bloqueia? |
|---|---|---|
| 1 | Nome do repo e do projeto Vercel da LP (sugestão: `agenciavivaz/outra-vez-site` / `outra-vez-site`) | Fase 0 |
| 2 | Domínio definitivo e onde fica o app (`app.{dominio}`?) | Fase 6 |
| 3 | Programa piloto existe? Quais condições? (liga/desliga o card da seção 10) | Não |
| 4 | Usar sua foto e o card "Eu mesmo faço a demo"? | Não |
| 5 | Link do evento no Cal.com, horários disponíveis e número de WhatsApp para o botão | Fase 4 |
| 6 | CNPJ e razão social para o rodapé e a política de privacidade | Fase 6 |
| 7 | Revisão jurídica da seção "Sem arriscar sua conta", FAQ 1 e 3, política e termos | Antes de publicar |
| 8 | Confirmar preço do crédito (R$ 0,30) e premissas do simulador — ou desligar o simulador no lançamento | Fase 3 |
| 9 | Os componentes `components/outra-vez/*` já existem no repo do app? (muda a Fase 2) | Fase 2 |
| 10 | Pedidos de demo também devem cair no DataCrazy/Make? Qual URL? | Não |

---

## 18. Prompt de kickoff para o Claude Code

```
Leia integralmente, nesta ordem:
1. docs/PRD_LP.md (este documento) — fonte da verdade da landing page
2. brand/CLAUDE.md, brand/DESIGN_SYSTEM_SPEC.md, brand/tokens.json, brand/registry/*.json
3. brand/design-system-v2.html (referência visual; os tokens e o CLAUDE.md são normativos)

Objetivo: construir a landing page do Outra Vez cujo único objetivo é agendar uma demo
gratuita, seguindo as fases da seção 15, uma por vez.

Regras:
- Não redesenhe a direção visual. Botão primário sempre azul-tinta; coral nunca é botão.
- Use os textos da seção 6 exatamente como estão, centralizados em lib/copy/pt-BR.ts.
- Nenhum logo de marketplace ou do Bling; canais como chips neutros com o nome escrito.
- Nenhum depoimento, logo de cliente ou número de resultado inventado.
- Mobile-first em 360 px, sem rolagem horizontal, WCAG 2.1 AA, tabular-nums em números.
- As telas do "Conheça por dentro" são componentes React reais com os dados de
  lib/mock/loja-exemplo.ts — não use screenshots.
- Ao fim de cada fase: lint, typecheck, test, build, commit, push, atualizar docs/PROGRESS.md.
- Nunca faça push com build quebrado: a main faz deploy em produção na Vercel.
- Quando algo da seção 17 bloquear, pare e pergunte; para o resto, siga o PRD.

Comece pela Fase 0.
```
