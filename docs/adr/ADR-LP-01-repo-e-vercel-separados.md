# ADR-LP-01 — Repo e projeto Vercel separados do app

**Status:** aceita · 09/10/2026

**Decisão:** a LP vive em `agenciavivaz/lpoutravez`, com projeto Vercel próprio (`lpoutravez-d6bn.vercel.app` até o domínio ser definido). O app fica em `agenciavivaz/CRM_Marketplace`.

**Por quê:** deploy, domínio e ritmo de mudança independentes; a LP nunca derruba o app.

**Alternativa descartada:** rota `(marketing)` dentro do app — acopla deploys e segredos.

**Nota:** o PRD sugeria o nome `outra-vez-site`; o repo criado pelo Diego é `lpoutravez`. O nome do pacote no `package.json` segue `outra-vez-site`.
