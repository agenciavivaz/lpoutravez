# ADR-LP-12 — Formulário sem banco, com envio para o CRM

**Status:** aceita · 09/10/2026 · decisão do Diego

**Contexto:** o PRD (9, 11) previa Supabase, Resend, Cloudflare Turnstile, webhook do Cal.com e cron "sem horário". O Diego decidiu que os pedidos de demo vão direto para um CRM, conectado depois, e que Resend e Turnstile não entram (o CRM conduz avisos e contato).

**Decisão:**
1. **Sem banco na LP.** As server actions (`actions/demo.ts`) validam cada etapa e chamam `forwardDemoRequest()` (`lib/crm/forward.ts`), o único ponto de saída. Hoje ele faz POST JSON para `DEMO_WEBHOOK_URL` (Make, DataCrazy ou o próprio CRM). Para ligar uma API de CRM, troca-se só essa função.
2. **Payload** por etapa: `request_id` (UUID gerado no navegador e mantido na sessão), `status` (`started` na etapa 1; `qualified` ou `waitlist` na etapa 2), contato com WhatsApp em E.164, versão do texto de aceite, dados da loja, `simulator_snapshot`, UTMs/gclid/fbclid/referrer/página de entrada e user agent. Os nomes seguem a tabela da seção 11.1 para facilitar o mapeamento no CRM.
3. **Anti-spam sem serviço externo:** honeypot `company_website` + tempo mínimo de 3 s. Bot recebe resposta de sucesso e nada é encaminhado. Turnstile e limite por IP ficam para o CRM ou para depois.
4. **Sem `DEMO_WEBHOOK_URL`, nada é guardado**: o formulário funciona para a pessoa, mas o pedido não chega a lugar nenhum (só um aviso sem dados pessoais no log da Vercel). **Configurar antes de divulgar a página.**
5. **Calendário:** o passo existe. Com `NEXT_PUBLIC_CAL_LINK`, abre o embed do Cal.com (carregado só nesse passo, pré-preenchido com nome, e-mail, WhatsApp, loja e `metadata[demo_request_id]`); sem ele, ou se o embed não abrir em 8 s, mostra o fallback do PRD com o botão "Falar no WhatsApp". O webhook do Cal.com (`/api/cal/webhook`) e o cron "sem horário" não foram feitos: o status `scheduled` passa a ser responsabilidade do CRM.
6. **WhatsApp:** os botões já existem e usam `NEXT_PUBLIC_WHATSAPP_NUMBER`. Sem número, o link abre o WhatsApp só com a mensagem (a pessoa escolhe o contato). **Configurar o número antes de divulgar.**
7. **/obrigado** recebe data/hora e `uid` pela URL; o e-mail vem do sessionStorage, não da URL, para não aparecer em analytics nem em logs.
8. **Leveza:** validação própria e sem dependências (`lib/validation/demo.ts`), compartilhada entre navegador e servidor, em vez de zod + react-hook-form; controles nativos (select, radio, checkbox em chips). O formulário interativo carrega tarde, com a etapa 1 estática no HTML. `buttonVariants` saiu de `button.tsx` para `button-variants.ts`, porque importar o pacote `radix-ui` num componente de servidor puxava o Radix inteiro para o bundle inicial.
9. **Páginas legais:** `/privacidade` e `/termos` com texto-base em linguagem simples, **para revisão jurídica**. Sem e-mail de contato confirmado (`site.contactEmail`), a política aponta para os canais de contato da página.
