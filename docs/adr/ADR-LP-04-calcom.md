# ADR-LP-04 — Cal.com para agendamento

**Status:** aceita · 09/10/2026

**Decisão:** embed inline do Cal.com no mesmo card do formulário, com pré-preenchimento, `metadata[demo_request_id]` e webhooks (`BOOKING_CREATED`, `BOOKING_CANCELLED`, `BOOKING_RESCHEDULED`).

**Por quê:** agendamento na mesma tela; webhooks no plano gratuito; sincroniza com o Google Agenda.

**Alternativas descartadas:** agendamento do Google Agenda (embed fraco, sem evento de sucesso confiável); Calendly (webhooks pagos).
