# ADR-LP-14: Revisão v2 da LP (PRD_LP_v2)

Data: 09/10/2026 · Status: aceito

## Contexto
`docs/PRD_LP_v2.md` revisa copy, estrutura, calculadora, integrações e design. Ele passa a ser a
fonte da verdade da LP. O que o v2 não redefine (tour, formulário, consentimento, páginas
internas) continua como em `docs/PRD_LP.md`.

## Decisões
- **Teste de copy**: todo texto de `lib/copy/pt-BR.ts` precisa existir literalmente no PRD v2 ou
  no v1. Também falha com travessão, "Não precisava ser assim", "jornada", "integração nativa",
  "no automático" ou mais de duas ocorrências de "na demo mostramos".
- **"segmento" → "lista de clientes"**: o v2 usa "segmento" no card "Por regra" e na FAQ 4. O
  glossário do DS e o `CLAUDE.md` da LP proíbem a palavra. Usamos o termo do glossário.
- **Comparação**: a linha "Encontra o WhatsApp a partir da nota" virou "Encontra um contato
  válido para cada comprador" (v2 5.1, "O que NÃO dizer").
- **Demo, passo 2**: "Da conexão com o ERP até a primeira venda que volta." (o v2 abre para
  outros ERPs).
- **Loja do mock**: "Loja Exemplo" virou "Casa Lavanda" no hero e no tour, mantendo "Conversa
  ilustrativa" e "Dados de uma loja de exemplo.".
- **"O que muda" removida**: os benefícios viraram anotações do tour (aba Clientes: "Um cliente,
  todos os canais"; Início: "Oportunidade do dia"; Envio em massa: "Custo antes de enviar.").
- **Logos de marketplace e ERP**: exceção documentada no `CLAUDE.md` da LP (PRD v2 7). Continua
  proibido no produto e nas peças de marketing.
- **ERP diferente do Bling** vai para o calendário, não para a lista de espera ("conectamos na
  implantação", PRD v2 6).
