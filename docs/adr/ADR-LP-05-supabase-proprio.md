# ADR-LP-05 — Supabase em projeto próprio

**Status:** aceita · 09/10/2026

**Decisão:** projeto Supabase separado (`outra-vez-site`, plano gratuito) só com `demo_requests`. RLS ligado sem políticas: só a service role (server actions e webhook) lê e escreve.

**Por quê:** a LP não guarda a service role do banco do produto.

**Alternativa descartada:** schema no banco do app — um vazamento de segredo da LP exporia dados de clientes dos sellers.
