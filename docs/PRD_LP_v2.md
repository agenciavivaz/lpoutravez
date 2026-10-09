# PRD · Revisão e ajustes da Landing Page do Outra Vez (v2)

**Produto:** Landing page outravez.com.br (repo e projeto Vercel próprios, separados do app)
**Objetivo da página:** agendar demo gratuita de 30 minutos
**Autor:** Diego Rodrigues (Vivaz) · **Data:** 09/10/2026 · **Status:** pronto para implementação
**Ambiente de construção:** Claude Code (ver `PROMPT_ClaudeCode_LP.md`)
**Base obrigatória:** `CLAUDE.md`, `DESIGN_SYSTEM_SPEC.md`, `tokens.json` e `outra-vez-style.json` do design system Outra Vez v2. Nada neste PRD autoriza criar cor, fonte ou componente fora dele, salvo a exceção de logos descrita na seção 7.

---

## 0. Resumo do que muda

| # | Mudança | Por quê |
|---|---|---|
| 1 | Revisão completa da copy (concordância, contexto, travessões, padrões de texto de IA) | Erros como "você disputa ele do zero com quem anunciar mais" e 9 travessões tiram credibilidade |
| 2 | Nova narrativa de **tecnologia e dados**: identificamos o comprador, unificamos os canais, prevemos a recompra e decidimos para onde levar cada cliente | Hoje o texto descreve o processo de forma operacional ("pegamos a nota e achamos o WhatsApp"), o que soa pequeno e levanta dúvida de privacidade |
| 3 | Nova seção **Rota de recompra**: o cliente volta pelo marketplace ou pelo seu canal próprio, conforme regra | Pedido do Diego e principal diferencial frente ao concorrente direto |
| 4 | ERP: Bling validado + qualquer ERP ou hub com API na implantação | Primeiros clientes vêm por relacionamento; travar no Bling perde venda |
| 5 | Logos de marketplaces e ERPs, em versão monocromática | Prova de compatibilidade imediata (exceção controlada à regra do DS) |
| 6 | Calculadora nova: receita **anual**, por categoria, baseada em benchmark público, sem custos da Meta | A atual mostra R$ 5,4 mil/mês para quem fatura R$ 300 mil/mês. Não convence e subestima o produto |
| 7 | Revisão 360 de estrutura e design, dentro do design system | Página longa, com seções redundantes e headline igual à do concorrente |

---

## 1. Contexto

O Outra Vez é um CRM para quem vende em marketplace. Lê os pedidos do ERP do seller, identifica cada comprador, unifica o mesmo cliente entre Mercado Livre, Shopee, Amazon e outros canais, encontra um contato válido e roda réguas de pós-venda, reposição e reativação pelo WhatsApp oficial, medindo quanto voltou em vendas.

**Público da LP:** dono ou gestor de operação de seller PME, faturando a partir de ~R$ 50 mil/mês em marketplace, que já usa ERP. O player ideal do exemplo do Diego: 2.000 pedidos/mês, ticket R$ 150, ~R$ 300 mil/mês.

**Métricas de sucesso da LP**
- Primária: taxa de visitante → demo agendada (form etapa 2 concluída).
- Secundárias: interação com a calculadora (≥ 1 alteração de campo), clique em "Ver isso com os meus números", rolagem até o form, cliques no WhatsApp.
- Instrumentar eventos: `calc_interact`, `calc_category_change`, `calc_cta_click`, `form_step1_submit`, `form_step2_submit`, `whatsapp_click`, `erp_other_click`.

---

## 2. O que a pesquisa encontrou

### 2.1 Concorrente direto: Segunda Venda (segundavenda.com.br)
Posicionamento quase idêntico e já em escala. Pontos que importam para a nossa LP:
- Headline "A primeira venda é do marketplace. A segunda é sua." e seção **"Do pedido à recompra"**, mesma expressão que usamos hoje. **Precisamos trocar a nossa.**
- Declara integração com Bling, Tiny, UpSeller e outros hubs, e lista Mercado Livre (inclusive Full), Shopee, TikTok Shop, Amazon, Magalu, Shein, Kwai, Leroy Merlin, MadeiraMadeira, Casas Bahia.
- Prova social com números da própria plataforma (+1.200 contas, 2 em 3 clientes respondem à primeira mensagem). **Não publica taxa de recompra nem receita recuperada.**
- Modelo de serviço feito por time ("Você aprova. A gente faz."), base em 11 segmentos de RFV, IA que classifica respostas.
- LGPD apoiada em legítimo interesse (art. 7º, IX e art. 10), descadastro por SAIR/PARAR.
- Diz que a recompra pode acontecer no marketplace ou no canal do seller.

**Como nos diferenciar (sem atacar):**
1. **Rota de recompra explícita e configurável** (seção 5): eles mencionam numa linha de FAQ, nós tornamos o centro da proposta.
2. **Transparência de custo e de premissa:** calculadora aberta com fonte de cada número. Eles não mostram nada antes da call.
3. **Você no controle, com implantação assistida:** produto para o seller operar, com a gente montando junto no começo. Eles vendem time terceirizado.
4. **Previsão de reposição por produto** visível no produto (a "Oportunidade do dia" já existe no nosso tour).

### 2.2 Outros players no espaço
- **Martz:** CRM de retenção para e-commerce (carrinho, giftback, pós-venda no WhatsApp). Foco em loja própria.
- **SocialHub:** CRM de WhatsApp com integração Bling/Tiny/Nuvemshop, R$ 99 a 399/mês. Genérico, não é feito para marketplace.
- **Zenvia Customer Cloud:** conteúdo e plataforma para jornada do seller até recompra no WhatsApp. Enterprise.
Nenhum deles publica taxa de conversão de cliente de marketplace em cliente próprio.

### 2.3 Benchmarks usados na calculadora
Não existe benchmark público de "cliente de marketplace que vira cliente recorrente do seller". O que existe é taxa de recompra do e-commerce (loja própria), que usamos como teto e aplicamos um desconto.

| Dado | Valor | Fonte |
|---|---|---|
| Taxa média de recompra do e-commerce | 28,2% | Rivo / Opensend (repetido por Sender e Brevo) |
| Suplementos e saúde | 29% | Rivo / Opensend |
| Beleza e cosméticos | 25,9% | Rivo / Opensend |
| Luxo e alto valor | 9,9% | Rivo / Opensend |
| Mercado e consumíveis | acima de 40% (mercado chega a 65,2%) | Focus Digital; Rivo |
| Média em grandes varejistas | 16,5% | Bluecore, citado pela Brevo |
| Comissão Mercado Livre | 10% a 19% + taxa fixa | UpSeller, XP via Money Times |
| Comissão Shopee | 14% a 20% + taxa fixa de R$ 4 a R$ 26 | E-commerce na Prática |
| Comissão Magalu | 16% | YAV |

### 2.4 Regras de marketplace (risco)
- O Mercado Livre pune vendedor que tenta **levar a venda para fora pelo chat da plataforma** (telefone, WhatsApp, e-mail ou link externo). Fontes: Nubimetrics, Ideris.
- O Outra Vez não usa o chat do marketplace e parte dos dados do ERP. Isso reduz o risco, mas **não elimina**: os termos de cada marketplace sobre uso de dados do comprador precisam de revisão jurídica antes de a LP prometer "levar para o canal próprio" de forma ampla. Por isso a copy da Rota de recompra mantém o marketplace como padrão e o canal próprio como opção para quem aceitou novidades.

---

## 3. Crítica de design (design-critique)

> Base: conteúdo completo da página em produção e print da seção "Faça as contas". A revisão visual seção a seção deve ser refeita no Claude Code com screenshots em 390 px e 1440 px antes e depois.

### Impressão geral
A marca está bem aplicada (azul-tinta, coral pontual, Plus Jakarta Sans) e o tour do produto é o ponto mais forte da página. O maior problema é de **argumento**, não de estética: a calculadora devolve um número pequeno, a seção "Como funciona" descreve operação em vez de tecnologia e a página repete a mesma ideia em três seções (Como funciona, O que muda, Por dentro).

### Usabilidade
| Achado | Severidade | Recomendação |
|---|---|---|
| Slider de pedidos linear de 200 a 30.000: o caso típico (2.000) fica colado na esquerda e é impossível ajustar com o dedo | 🔴 Crítico | Escala logarítmica de 100 a 50.000, com o campo numérico como entrada principal |
| Slider de ticket linear de R$ 30 a R$ 1.000: mesmo problema | 🟡 Moderado | Escala log de R$ 20 a R$ 2.000 |
| Campo de % com largura e alinhamento diferentes dos outros dois campos | 🟡 Moderado | Mesmo componente de input dos demais, valor alinhado à direita |
| Calculadora mostra custo da Meta e ROI de R$ 6,47: puxa atenção para custo antes do valor | 🔴 Crítico | Remover custo e ROI da tela (premissa fica em "Ver as contas") e mostrar receita anual |
| "Ver as contas" parece card, não accordion | 🟢 Menor | Botão ghost com ícone ChevronDown e `aria-expanded` |
| Quatro CTAs diferentes para a mesma ação ("Agendar demo grátis", "Quero ver com os meus números", "Ver isso com os meus números", "Agendar demo") | 🟡 Moderado | Padronizar em "Agendar demo grátis" e uma variação contextual só na calculadora |
| Tabela de comparação em 4 colunas no mobile | 🟡 Moderado | No mobile, mostrar Outra Vez contra uma alternativa por vez (tabs) |
| Link "Prefere falar pelo WhatsApp?" abre `wa.me/` sem número | 🔴 Crítico | Incluir o número da Vivaz/Outra Vez no link |

### Hierarquia visual
- **O olho vai primeiro para:** headline do hero e a conversa ilustrativa. Correto.
- **Fluxo:** quebra depois do hero porque a faixa "Para quem vende em" é texto puro. Com logos monocromáticos vira prova imediata.
- **Ênfase:** na calculadora o número verde é forte, mas os cards de custo têm o mesmo peso visual que "Clientes que compram de novo". Custo não deve competir com resultado.

### Consistência
| Elemento | Problema | Recomendação |
|---|---|---|
| Copy | Mistura "réguas", "mensagens de novidade", "Busca de WhatsApp" sem definir | Glossário fixo da seção 4.3 |
| Disclaimers | Cinza pequeno sobre azul-tinta no bloco escuro | Validar contraste AA (4,5:1) com `--muted-foreground` do tema escuro |
| Números | Verificar `tabular-nums` em todos os valores (regra do DS) | Aplicar em calculadora, tour e comparação |

### O que funciona
- Conversa ilustrativa do hero mostra o produto em uso real, com pedido, permissão e recompra.
- Tour "Por dentro" com telas reais, claro/escuro e anotações numeradas.
- FAQ honesto sobre risco de punição e LGPD.

### Prioridades
1. **Refazer a calculadora** (seção 8). Maior alavanca de conversão da página.
2. **Reescrever "Como funciona" como tecnologia e dados + criar "Rota de recompra"** (seções 5 e 9).
3. **Logos e integrações** logo abaixo do hero e numa seção própria de integrações (seções 6 e 7).

---

## 4. Revisão de copy (ux-copy)

### 4.1 Erros encontrados na versão atual

| Onde | Atual | Problema | Corrigido |
|---|---|---|---|
| Problema, card 1 | "Quando o cliente quer comprar de novo, você disputa ele do zero com quem anunciar mais." | "disputa ele" (pronome reto como objeto); "com quem anunciar mais" (futuro do subjuntivo sem condicional, leitura confusa) | "Na hora de comprar de novo, ele volta para a busca. E você paga anúncio para reconquistar quem já tinha comprado de você." |
| Hero, subtítulo | "...WhatsApp — e manda a mensagem certa..." | Travessão; frase longa demais | Ver hero na seção 9 |
| Problema, card 2 | "Milhares de nomes e CPFs nas notas fiscais, sem telefone..." | Expõe CPF de forma crua, tom de dado sensível | "Milhares de compradores registrados no seu ERP, sem contato, sem histórico entre canais e sem ninguém olhando." |
| Problema, card 3 | "Não precisava ser assim." | Clichê de IA | Remover |
| Como funciona | "Do pedido à recompra, no automático." | Mesma expressão do concorrente | "Da venda no marketplace ao cliente que volta." |
| Como funciona, passo 3 | "Encontramos o WhatsApp de cada cliente a partir do CPF da nota." | Operacional e sensível | Ver passo "Identificação" na seção 9 |
| O que muda | "...pronto para a próxima campanha — sem depender do anúncio." | Travessão | Seção removida (conteúdo vai para o tour) |
| Segurança | "...pela API oficial — sem gambiarra que derruba número." | Travessão; "gambiarra" pode soar informal demais em segurança | "Pela API oficial do WhatsApp, com o número da sua loja. Nada de ferramenta não oficial que derruba número." |
| Calculadora | "É uma simulação, não uma promessa — na demo..." | Travessão | "É uma simulação com dados de mercado. Na demo, a gente refaz com os seus números." |
| FAQ punição | "Cada canal tem regras próprias — na demo mostramos..." | Travessão | "Cada marketplace tem regras próprias. Na demo, mostramos como o Outra Vez lida com cada uma." |
| FAQ Bling | "Hoje, sim... Outros ERPs estão nos planos." | Informação desatualizada | Ver FAQ na seção 9 |
| Comparação | "WhatsApp Web + extensão: Funciona bem no celular: Sim" | Linha não diferencia nada | Trocar a linha por "Mostra quanto voltou em vendas" (já existe) ou remover |
| Geral | "na demo mostramos" aparece 4 vezes | Repetição | Máximo 2 ocorrências na página |
| Meta description | "Transforme as notas fiscais do Bling em clientes..." | Restringe ao Bling e repete o enquadramento operacional | Ver seção 10 |

### 4.2 Regras de estilo (valem para toda a página)
1. **Zero travessão** (— ou –) em texto visível, alt, meta e JSON-LD. Usar ponto, vírgula, dois-pontos ou parênteses. Verificar com `grep -rn "[—–]"` no código de conteúdo.
2. **Sem padrões de texto de IA:** nada de "não é X, é Y", trincas forçadas ("rápido, simples e seguro"), "no automático" repetido, "Não precisava ser assim", "transforme", "revolucione", "potencialize", "jornada", "alavancar", "solução completa", adjetivos inflados.
3. **Frases curtas.** Uma ideia por frase. Subtítulos com no máximo 2 frases.
4. **Você, não "o seller".** Tratar o leitor por você. "Seller" só onde o leitor usaria a palavra.
5. **Concordância e regência:** "disputá-lo", "comprar de você", "para quem já comprou".
6. **Números com unidade e contexto:** "R$ 230 mil em 12 meses", nunca número solto.
7. **Glossário do DS:** não usar lead, opt-in, enrichment, conversion, journey (nem traduções jargão como "enriquecimento", "conversão" em título, "jornada").

### 4.3 Glossário fixo da LP
| Termo | Uso |
|---|---|
| Réguas | sequências automáticas de mensagens (pós-venda, reposição, reativação) |
| Aceitou novidades | cliente que respondeu "Quero receber" |
| Identificação do comprador | o processo de reconhecer e unificar quem comprou e achar um contato válido |
| Rota de recompra | regra que decide se o link leva ao marketplace ou ao seu canal |
| Vendas que voltaram | pedidos de quem recebeu mensagem e comprou de novo |
| ERP | sistema de gestão (Bling, Tiny, Omie...). Na primeira menção: "seu ERP (Bling, Tiny e outros)" |

---

## 5. Nova narrativa: tecnologia e dados

**Ideia central:** o marketplace entrega o pedido, o Outra Vez entrega o cliente. A tecnologia reconhece quem comprou, junta o mesmo comprador de todos os canais, prevê quando ele vai precisar de novo e conduz o relacionamento até a próxima compra, no marketplace ou no seu canal.

### 5.1 Os 5 blocos (substituem os 5 passos atuais)
1. **Conecta o ERP.** Leitura de pedidos, itens e notas. Somente leitura.
2. **Identifica o comprador.** Cruza os dados do pedido com bases cadastrais para reconhecer quem comprou e chegar a um contato válido. Quando o dado não confere, o contato fica em "a confirmar" e não recebe mensagem automática.
3. **Unifica e prevê.** O mesmo comprador do Mercado Livre, da Shopee e da Amazon vira uma ficha só. O sistema aprende o ciclo de cada produto e avisa quando cada cliente está perto de precisar de novo.
4. **Conduz o pós-venda.** Primeira mensagem sempre útil (pedido faturado, entrega, suporte) e pedido de permissão. Depois: reposição, reativação e novidades, só para quem aceitou.
5. **Mede o retorno.** Cada venda que volta aparece no painel, com canal, valor e custo para trazer.

**O que NÃO dizer:** "pegamos o CPF da nota e achamos o WhatsApp", "consultamos bases de CPF", "enriquecimento". Os detalhes técnicos e de LGPD ficam no FAQ, em linguagem clara e honesta (não esconder: transparência é argumento de venda).

### 5.2 Rota de recompra (seção nova)
Mensagem: **você escolhe para onde cada cliente volta.**

| Rota | Quando usar | O que o cliente recebe |
|---|---|---|
| **Marketplace (padrão)** | Sempre que você não tem canal próprio, ou para produtos em que o ranking do anúncio importa | Link para o seu anúncio no marketplace. Recompra conta para sua reputação e posição |
| **Seu canal** | Cliente que aceitou novidades, quando você tem loja virtual ou vende pelo WhatsApp | Link para sua loja ou atendimento direto. Sem comissão de marketplace nessa venda |
| **Por regra** | Por produto, margem ou segmento | Ex.: kits e recompra recorrente vão para o seu canal; produto de entrada vai para o marketplace |

Benefício a destacar com número da calculadora: "Comissão que fica com você" (seção 8).
Copy obrigatória de proteção: "O marketplace é a rota padrão. O seu canal só entra para clientes que aceitaram receber novidades."

---

## 6. ERPs e integrações

**Regra de comunicação:**
- **Bling:** integração ativa (selo "Integração ativa").
- **Demais ERPs e hubs com API:** "Conectamos na implantação". Exibir: Tiny (Olist), Omie, UpSeller, Anymarket, Magis5, Ideris, Eccosys + card "Seu ERP tem API? A gente conecta."
- Nunca dizer "integração nativa" para quem não é Bling.

**Seção "Integrações" (nova, depois de Segurança):**
- Título: "Funciona com o ERP que você já usa."
- Subtítulo: "Começamos pelo Bling. Se o seu ERP ou hub tem API, a gente conecta durante a implantação."
- Grid de logos ERPs (seção 7) + card CTA "Usa outro sistema? Me conta qual" que leva ao form com campo `erp` pré-preenchido como "outro".

**Form:** adicionar campo "Qual ERP você usa?" (select: Bling, Tiny, Omie, UpSeller, Outro) na etapa 2. Ajuda a qualificar e alimenta o evento `erp_other_click`.

---

## 7. Logos de marketplaces e ERPs

> **Conflito com o design system:** `CLAUDE.md` proíbe "logo, mascote ou cor-assinatura de marketplace" e "reproduzir logos dos marketplaces". A decisão do Diego é usar logos na LP. Implementar como **exceção documentada**: atualizar o `CLAUDE.md` da LP com a regra abaixo para que a proibição continue valendo no produto e nas peças de marketing.

**Regra da exceção (LP apenas):**
- Logos **monocromáticos** (`currentColor`, cor `--muted-foreground`), sem cor-assinatura, nem no hover.
- Uso apenas nominativo (indicar compatibilidade): faixa "Funciona com" e seção Integrações. Nunca ao lado de promessas de resultado, nunca maior que o logo do Outra Vez.
- Altura óptica uniforme: 20 a 24 px no mobile, 28 px no desktop. Alinhamento por altura óptica, não por bounding box.
- SVG local em `/public/logos/marketplaces/` e `/public/logos/erps/` (nunca hotlink). Fonte: kit de imprensa oficial de cada marca ou Simple Icons (verificar licença e diretrizes de marca de cada uma). Se não houver SVG confiável, usar o nome em texto no mesmo estilo e listar a pendência.
- `alt` com o nome da marca. Faixa com `aria-label="Marketplaces compatíveis"`.
- Manter e ampliar o disclaimer do rodapé (seção 9).

**Marketplaces:** Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop, Shein + "e outros canais do seu ERP".
**ERPs:** Bling (ativo), Tiny, Omie, UpSeller, Anymarket, Magis5, Ideris, Eccosys.

**Ponto de validação jurídica:** confirmar diretrizes de uso de marca de Mercado Livre, Shopee e Amazon antes de publicar. Se alguma proibir, cair para nome em texto.

---

## 8. Calculadora nova

### 8.1 Princípios
- Mostrar **receita em 12 meses**. O número anual é o que faz sentido para o player de R$ 300 mil/mês.
- **Sem custos da Meta e sem ROI** na tela. Disclaimer avisa que não estão incluídos.
- Premissas **abertas** e com fonte em "Ver as contas". O usuário pode desconfiar e conferir. Isso diferencia do concorrente.
- Agressivo dentro do real: parte do benchmark de recompra de loja própria, com desconto explícito.

### 8.2 Entradas
| Campo | Tipo | Faixa | Padrão |
|---|---|---|---|
| Pedidos por mês | input numérico + slider **logarítmico** | 100 a 50.000 | 2.000 |
| Ticket médio | input R$ + slider **logarítmico** | R$ 20 a R$ 2.000 | R$ 150 |
| O que você vende | chips de seleção única (radiogroup) | 5 categorias abaixo | Média do e-commerce |
| Recompras no seu canal | slider (aparece num toggle "Tenho loja virtual ou vendo pelo WhatsApp") | 0% a 50% | 20% quando ativado; 0% desligado |

### 8.3 Categorias e premissas
| Categoria (rótulo na UI) | Benchmark de recompra (fonte) | Pedidos extras por cliente que volta em 12 meses |
|---|---|---|
| Média do e-commerce | 28,2% (Rivo/Opensend) | 1,2 |
| Suplementos e saúde | 29% (Rivo/Opensend) | 1,5 |
| Beleza e cuidados | 25,9% (Rivo/Opensend) | 1,2 |
| Pet, alimentos e reposição | 40% (Focus Digital: consumíveis acima de 40%) | 1,5 |
| Alto valor (eletrônicos, luxo) | 9,9% (Rivo/Opensend) | 1,0 |

Premissas globais (editáveis só no código, exibidas em "Ver as contas"):
| Premissa | Valor | Observação |
|---|---|---|
| Clientes únicos por pedido | 90% | Na demo usamos os CPFs únicos reais do seu ERP |
| Compradores com contato válido encontrado | 60% | Mantido da versão atual |
| Parte do benchmark que o Outra Vez captura | 35% | **Hipótese a validar com os primeiros clientes**. Corrige o fato de o benchmark ser de loja própria |
| Comissão média de marketplace evitada | 16% | Faixa real: ML 10 a 19%, Shopee 14 a 20%, Magalu 16% |

### 8.4 Fórmula
```
clientes_ano      = pedidos_mes × 12 × 0,90
alcancaveis       = clientes_ano × 0,60
taxa_retorno      = benchmark_categoria × 0,35
clientes_voltam   = alcancaveis × taxa_retorno
pedidos_extras    = clientes_voltam × extras_categoria
receita_12m       = pedidos_extras × ticket
receita_mes       = receita_12m / 12
pct_faturamento   = receita_12m / (pedidos_mes × 12 × ticket)
comissao_evitada  = receita_12m × pct_canal_proprio × 0,16
```
Guard-rail: `pct_faturamento` nunca passa de 12%. Se passar, limitar `receita_12m` a 12% do faturamento anual. (Com as premissas atuais o máximo é 11,3%.)

Implementar a fórmula como **função pura** em `lib/calculator.ts`, com as premissas num objeto exportado, e testes unitários com os casos abaixo.

### 8.5 Casos de teste (tolerância ±1 real; contagens arredondadas)
| Pedidos | Ticket | Categoria | Canal | Receita 12m | Por mês | % fat. | Clientes que voltam | Pedidos extras | Comissão evitada |
|---|---|---|---|---|---|---|---|---|---|
| 2.000 | 150 | Média | 20% | R$ 230.247 | R$ 19.187 | 6,4% | 1.279 | 1.535 | R$ 7.368 |
| 2.000 | 150 | Suplementos | 20% | R$ 295.974 | R$ 24.664 | 8,2% | 1.315 | 1.973 | R$ 9.471 |
| 500 | 90 | Beleza | 20% | R$ 31.720 | R$ 2.643 | 5,9% | 294 | 352 | R$ 1.015 |
| 5.000 | 60 | Pet/reposição | 30% | R$ 408.240 | R$ 34.020 | 11,3% | 4.536 | 6.804 | R$ 19.596 |
| 1.000 | 800 | Alto valor | 0% | R$ 179.626 | R$ 14.969 | 1,9% | 225 | 225 | R$ 0 |

Comparação com a versão atual no caso de referência (2.000 × R$ 150): **R$ 64,8 mil/ano → R$ 230 mil/ano**.

### 8.6 Saída (layout)
- **Destaque (cor `--money`, tabular-nums, contagem animada 400 ms respeitando reduced-motion):** "Receita que pode voltar em 12 meses" · **R$ 230 mil** (até R$ 999 mil arredondar para "mil"; acima, "R$ 1,2 mi").
- Linha de apoio: "Cerca de R$ 19 mil por mês. 6,4% do que você fatura no ano."
- 3 cards secundários de mesmo peso:
  - "Clientes que compram de novo" · 1.279
  - "Pedidos a mais no ano" · 1.535
  - "Comissão que fica com você" · R$ 7.368 (só quando o toggle de canal próprio está ativo; quando desligado, o card mostra "Ative se você tem canal próprio" com link que liga o toggle)
- Accordion "Ver as contas": tabela de premissas da 8.3 com fontes e a fórmula em linguagem simples.
- Disclaimer: "Simulação com dados públicos de recompra do e-commerce e premissas médias. Não é promessa de resultado. Não inclui a assinatura do Outra Vez nem o custo das mensagens, que mostramos na demo."
- CTA: "Agendar demo com os meus números" (envia `calc_cta_click` com os valores escolhidos e pré-preenche campos ocultos do form: `calc_pedidos`, `calc_ticket`, `calc_categoria`).

### 8.7 Copy da seção
- Eyebrow: "Faça as contas"
- Título: "Quanto pode voltar para a sua loja em um ano?"
- Subtítulo: "É uma simulação com dados de mercado. Na demo, a gente refaz com os pedidos reais do seu ERP."

---

## 9. Copy nova, seção a seção (draft-content)

> Ordem final da página. Seções marcadas [nova] não existem hoje.

### 9.1 Header
Menu: Como funciona · Rota de recompra · Por dentro · Integrações · Perguntas · botão "Agendar demo"

### 9.2 Hero
- Eyebrow: "CRM para quem vende em marketplace"
- H1: "Vendeu uma vez? Venda *outra vez.*" (mantido; é o slogan)
- Subtítulo: "O Outra Vez identifica quem comprou de você em cada marketplace, cuida do pós-venda pelo WhatsApp e avisa o cliente na hora de comprar de novo. No marketplace ou no seu canal."
- CTA primário: "Agendar demo grátis" · secundário: "Ver como funciona"
- Microcopy: "30 minutos por videochamada. Grátis e sem compromisso."
- Mock da conversa: manter. Trocar "Loja Exemplo" por um nome fictício com cara de loja real (ex.: "Casa Lavanda"), mantendo a nota "Conversa ilustrativa".
- Faixa "Funciona com" [nova, com logos]: marketplaces + separador + "Bling e outros ERPs com API".

### 9.3 O problema
- Eyebrow: "O problema"
- H2: "Você paga para vender. E paga de novo para vender para o mesmo cliente."
- Card 1 · "O cliente fica com o marketplace." Comissão, frete e anúncio saem de cada venda. Na hora de comprar de novo, ele volta para a busca e você paga anúncio para reconquistar quem já tinha comprado de você.
- Card 2 · "Seus compradores estão parados no ERP." Milhares de pedidos registrados, sem contato, sem histórico entre canais e sem ninguém olhando para eles.
- Card 3 · "Ninguém avisa na hora de repor." O produto acaba, o cliente abre o app e compra de quem aparecer primeiro.
- Fecho: "A sua próxima venda já está na sua base de pedidos."

### 9.4 Como funciona [reescrita]
- Eyebrow: "Como funciona"
- H2: "Da venda no marketplace ao cliente que volta."
- Subtítulo: "Você conecta o ERP uma vez. A tecnologia faz o resto e mostra cada passo no painel."
- 5 blocos da seção 5.1, com ícones Lucide: `Plug`, `ScanSearch`, `Repeat`, `MessageCircle`, `ChartNoAxesColumn`. Textos curtos:
  1. **Conecta o seu ERP.** Lemos pedidos e notas. Não alteramos nada.
  2. **Identifica quem comprou.** Cruzamos os dados de cada pedido com bases cadastrais para reconhecer o comprador e chegar a um contato válido.
  3. **Junta os canais e prevê a recompra.** O mesmo cliente do Mercado Livre e da Shopee vira uma ficha só, e o sistema aprende quando cada produto costuma acabar.
  4. **Cuida do pós-venda.** A primeira mensagem é sobre o pedido e pede permissão. Novidades e reposição só para quem aceitou.
  5. **Mostra o que voltou.** Cada venda nova aparece no painel, com canal, valor e custo para trazer.

### 9.5 Rota de recompra [nova]
- Eyebrow: "Rota de recompra"
- H2: "Você decide para onde cada cliente volta."
- Subtítulo: "Algumas recompras valem mais no marketplace, outras no seu canal. O Outra Vez segue a regra que você definir."
- 3 cards (tabela 5.2): "No marketplace" (padrão, badge "Padrão") · "No seu canal" · "Por regra".
- Visual: diagrama simples com o cliente no centro e duas setas de retorno (coral como gesto de retorno, conforme DS), uma para "Seu anúncio" e outra para "Sua loja". Sem logos aqui.
- Nota: "O marketplace é a rota padrão. O seu canal só entra para clientes que aceitaram receber novidades."

### 9.6 Faça as contas
Seção 8.

### 9.7 Por dentro (tour do produto)
- Manter estrutura e telas. Ajustar textos:
  - H2: "O painel que você vai abrir todo dia."
  - Sub: "Telas reais do Outra Vez com dados de uma loja de exemplo."
- Absorver os benefícios da antiga seção "O que muda" como anotações do tour (Um cliente, todos os canais · Oportunidade do dia · Custo antes de enviar). **Remover a seção "O que muda".**
- CTA: "Agendar demo grátis"

### 9.8 Segurança
- H2: "Feito para vender de novo sem colocar sua conta em risco."
- Sub: "O medo de punição do marketplace é real. Por isso as regras de proteção já vêm ligadas."
- Itens (sem travessão):
  - "A primeira mensagem é sobre o pedido." Nada de oferta fria. O cliente recebe um aviso útil e escolhe se quer novidades.
  - "Novidade só para quem aceitou." Quem responde SAIR para de receber na hora.
  - "Nunca usamos o chat do marketplace." Tudo parte do pedido que já está no seu ERP.
  - "WhatsApp oficial." Pela API oficial, com o número da sua loja. Nada de ferramenta não oficial que derruba número.
  - "Seus dados, suas regras." Você é dono da base. Guardamos só o necessário e registramos a origem de cada dado.

### 9.9 Integrações [nova]
Seção 6, com grid de logos de ERPs e card "Usa outro sistema?".

### 9.10 Comparação
- H2: "O que muda em relação ao jeito de hoje."
- Remover a linha "Funciona bem no celular". Adicionar "Escolhe se a recompra vai para o marketplace ou para o seu canal". Status sempre ícone + texto (Sim / Em parte / Não), regra do DS.
- Mobile: tabs "Planilha do ERP" / "WhatsApp Web + extensão" / "CRM genérico", sempre contra a coluna Outra Vez. Renomear "Planilha do Bling" para "Planilha do ERP".

### 9.11 A demo
- H2: "30 minutos para ver se faz sentido para a sua loja."
- Passos: "Entendemos sua operação" · "Mostramos o Outra Vez por dentro" · "Fazemos as contas com os seus pedidos".
- CTA: "Agendar demo grátis".

### 9.12 Perguntas (FAQ)
Ordem e textos (sem travessão):
1. **Posso ser punido pelo marketplace?** O Outra Vez foi desenhado para reduzir esse risco. Nunca usamos o chat do marketplace, a primeira mensagem é sempre sobre o pedido real e novidades só vão para quem aceitou. Por padrão, os links levam para o seu anúncio no próprio marketplace. Cada marketplace tem regras próprias, e na demo mostramos como lidamos com cada uma.
2. **Como vocês identificam o cliente e encontram o contato?** A partir dos dados do pedido no seu ERP, consultamos bases cadastrais para reconhecer o comprador e chegar a um telefone válido. Se o contato já está no seu ERP, usamos esse sem custo. Quando o nome encontrado não confere com o do pedido, o número fica como "a confirmar" e não recebe mensagem automática.
3. **Isso está de acordo com a LGPD?** Você continua dono dos dados e o Outra Vez trata esses dados em seu nome. Guardamos só o necessário, registramos de onde cada dado veio e toda mensagem tem saída fácil. O cliente também tem uma página para parar de receber quando quiser.
4. **A recompra acontece no marketplace ou no meu site?** Você escolhe. O padrão é o seu anúncio no marketplace. Se você tem loja virtual ou vende pelo WhatsApp, pode levar clientes que aceitaram novidades para o seu canal, por produto ou por segmento.
5. **Funciona com o meu ERP?** A integração com o Bling já está ativa. Se você usa Tiny, Omie, UpSeller ou outro ERP ou hub com API, a gente conecta durante a implantação.
6. **O Outra Vez altera alguma coisa no meu ERP?** Não. Só lemos pedidos, notas e contatos.
7. **Em quanto tempo vejo meus clientes?** Os primeiros aparecem minutos depois da conexão. O histórico completo carrega em segundo plano.
8. **Preciso ter a API oficial do WhatsApp?** Sim, as mensagens saem pelo número da sua loja na API oficial. Se você ainda não tem, a gente ajuda a conectar na implantação.
9. **Vou ter que montar as réguas do zero?** Não. Você começa com réguas prontas de pós-venda, reposição e reativação e ajusta o que quiser.
10. **Quanto custa?** Depende do volume da sua operação. A assinatura e o custo das mensagens aparecem na demo, já com os seus números. Você vê o custo antes de cada envio.

### 9.13 Form de agendamento
- H2: "Seu cliente já comprou. A próxima venda começa daí."
- Sub: "Leva menos de um minuto. Depois você escolhe o horário."
- Etapa 1: Nome · WhatsApp com DDD · E-mail · consentimento (manter texto e link de privacidade).
- Etapa 2: Site ou loja (opcional) · Qual ERP você usa? · Pedidos por mês (pré-preenchido pela calculadora quando houver).
- Link "Prefere falar pelo WhatsApp?" com **número real** em `wa.me/55DDDNUMERO?text=...`.

### 9.14 Rodapé
- Slogan + links (adicionar "Integrações").
- Disclaimer: "Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop, Shein, Bling, Tiny, Omie, UpSeller e demais marcas citadas pertencem a seus respectivos donos. O Outra Vez não é afiliado a elas. Logos usados apenas para indicar compatibilidade."
- "Outra Vez é um produto da Vivaz."

---

## 10. SEO e metadados
- `<title>`: "Outra Vez | CRM para quem vende em marketplace"
- Meta description (≤ 160): "Identifique quem comprou de você no Mercado Livre, Shopee e Amazon e venda de novo pelo WhatsApp. Integra com Bling e outros ERPs. Agende uma demo."
- OG: atualizar imagem com o slogan e a faixa "Funciona com" em monocromático.
- Corrigir `canonical`: hoje aponta para `lpoutravez-d6bn.vercel.app`. Deve ser `https://www.outravez.com.br`.
- JSON-LD: `SoftwareApplication` + `FAQPage` (perguntas da 9.12).
- Palavras-chave primárias: "CRM para marketplace", "pós-venda marketplace WhatsApp", "recompra Mercado Livre".

---

## 11. Design 360 (dentro do design system)

### 11.1 Regras
- Tokens só de `tokens.json` / `outra-vez-style.json`. Primário azul-tinta `#1F2A6B` para botões; coral `#E85D4A` só como gesto de retorno (setas, sublinhado do "outra vez", destaque pontual). **Coral nunca vira cor de botão.**
- Plus Jakarta Sans, escala 12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 (hero pode usar o tamanho de display já existente na LP).
- Lucide para ícones. Status sempre ícone + texto + cor.
- Mobile-first: resolver em 360/390 px, depois 1440 px. Toque ≥ 44 px. Sem rolagem horizontal.
- `prefers-reduced-motion` respeitado em toda animação.

### 11.2 Ritmo de fundo (alternância de seções)
Hero (claro quente) → Problema (claro) → Como funciona (card branco) → Rota de recompra (claro, com o diagrama coral) → **Faça as contas (azul-tinta, como hoje)** → Por dentro (claro) → Segurança (claro) → Integrações (claro) → Comparação (claro) → Demo + FAQ (claro) → Form (azul-tinta). Máximo dois blocos escuros para o escuro continuar sendo "momento".

### 11.3 Melhorias de design (aplicar a skill frontend-design sem sair do DS)
1. **Hero:** headline com o "outra vez" sublinhado por um arco coral desenhado (SVG, animação de traço uma vez no carregamento). Conversa mock com leve entrada escalonada das bolhas.
2. **Faixa de logos:** monocromática, rolagem infinita lenta só no mobile (pausável, desligada em reduced-motion); estática e centralizada no desktop.
3. **Como funciona:** linha do tempo vertical no mobile e horizontal no desktop, com uma seta circular coral conectando o passo 5 de volta ao passo 3 (metáfora de ciclo do DS).
4. **Rota de recompra:** diagrama em SVG próprio (não ilustração genérica).
5. **Calculadora:** número grande com contagem animada; chips de categoria; cards com mesmo peso; "Ver as contas" como accordion acessível.
6. **Tour:** manter; garantir que as tabs funcionem por teclado (setas) e tenham `role="tablist"`.
7. **Densidade:** reduzir a página em pelo menos uma tela de rolagem no mobile ao remover "O que muda" e encurtar textos.
8. **Evitar:** dashboards flutuantes genéricos, gradientes de "IA futurista", glassmorphism, ícones 3D.

### 11.4 Acessibilidade
- Contraste AA em todos os textos, inclusive disclaimers no bloco azul-tinta.
- Sliders com `aria-valuetext` em reais e pedidos ("2.000 pedidos por mês").
- Resultado da calculadora em região `aria-live="polite"` com debounce de 500 ms.
- Foco visível com `--ring`.

---

## 12. Riscos e pontos a validar
| Risco | Impacto | Mitigação |
|---|---|---|
| Termos dos marketplaces sobre uso de dados do comprador fora da plataforma | Alto | Revisão jurídica antes de divulgar a Rota de recompra em mídia paga. Marketplace como rota padrão |
| Base legal da identificação do comprador por bases cadastrais (LGPD) | Alto | Parecer jurídico; manter transparência no FAQ; registrar origem do dado (já prometido) |
| Uso de logos de terceiros | Médio | Monocromático, uso nominativo, disclaimer; checar diretrizes de marca |
| Premissa de captura de 35% sem dado próprio | Médio | Marcar como hipótese; substituir pelo dado real dos 3 primeiros clientes; manter fontes visíveis |
| Concorrente com proposta igual e mais prova social | Médio | Diferenciar por rota de recompra, transparência e controle; buscar 1 case real o quanto antes |
| Prometer ERP que ainda não conectamos | Médio | "Conectamos na implantação" e nunca "integração nativa" fora do Bling |

---

## 13. Critérios de aceitação
- [ ] Nenhum "—" ou "–" no conteúdo (`grep` limpo), inclusive meta e JSON-LD.
- [ ] Todas as correções da tabela 4.1 aplicadas.
- [ ] Nenhuma ocorrência de: "no automático" (mais de 1x), "Não precisava ser assim", "enriquecimento", "jornada", "lead", "opt-in", "conversão" em título.
- [ ] Calculadora: testes unitários da 8.5 passando; sliders log; custo da Meta e ROI removidos; receita anual em destaque; "Ver as contas" com fontes.
- [ ] Seções Rota de recompra e Integrações publicadas; "O que muda" removida.
- [ ] Faixa de logos e grid de ERPs monocromáticos, SVG locais, com `alt`; `CLAUDE.md` da LP atualizado com a exceção.
- [ ] Bling com selo "Integração ativa"; demais com "Conectamos na implantação".
- [ ] Form com campo de ERP; campos ocultos da calculadora; link do WhatsApp com número.
- [ ] Canonical correto; JSON-LD FAQPage válido.
- [ ] Lighthouse mobile ≥ 90 em Performance, Acessibilidade, SEO e Boas práticas; axe sem erros críticos.
- [ ] Screenshots antes/depois em 390 px e 1440 px, claro e escuro, de todas as seções.
- [ ] Eventos de analytics da seção 1 disparando.

## 14. Fora de escopo
- Mudanças no app do Outra Vez.
- Novas integrações de ERP no produto (a LP só comunica).
- Página de preços.
- Prova social com números (entra quando houver o primeiro case).

---

## Fontes
- Segunda Venda: https://segundavenda.com.br/
- Martz: https://www.martz.com.br/
- SocialHub, CRM para marketplace: https://www.socialhub.pro/blog/crm-para-marketplace-sellers-mercado-livre-shopee-amazon/
- Zenvia, jornada do seller: https://zenvia.com/blog/sellers/
- Rivo, benchmarks de recompra: https://rivo.io/blog/repeat-purchase-rate-complete-guide
- Sender, estatísticas de recompra: https://www.sender.net/marketing-glossary/repeat-purchase-rate/statistics/
- Focus Digital, clientes que voltam por categoria: https://focus-digital.co/average-returning-customer-percentage/
- Brevo, retenção no e-commerce (Bluecore 16,5%): https://www.brevo.com/blog/ecommerce-customer-retention-strategies/
- UpSeller, comissões 2026: https://upseller.com/pt/blog-article-929
- Money Times / XP, Shopee x Mercado Livre: https://www.moneytimes.com.br/alta-na-taxa-da-shopee-pode-impulsionar-mercado-livre-meli34-segundo-xp-jals/
- E-commerce na Prática, taxa Shopee: https://ecommercenapratica.com/blog/taxa-shopee/
- YAV, comissões por canal: https://yav.com.br/comissoes-marketplace/
- Nubimetrics, suspensão no Mercado Livre: https://academia.nubimetrics.com/br/suspensao-de-conta-no-mercado-livre
- Ideris, conta bloqueada no Mercado Livre: https://www.ideris.com.br/?p=65720
- GoSmarter, ERPs para marketplace 2026: https://gosmarter.com.br/?p=14050
