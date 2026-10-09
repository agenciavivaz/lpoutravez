# DESIGN_SYSTEM_SPEC.md — Outra Vez v2

## 1. Produto
CRM para quem vende em marketplace. Conecta ao ERP, transforma notas fiscais em clientes,
busca WhatsApp, roda réguas de pós-venda e recompra e mostra vendas geradas pelo Outra Vez.

## 2. Sensação
“Foi feito pra mim, entendo tudo e está me trazendo dinheiro de volta.”

## 3. Personalidade
Parceiro de balcão · prático · otimista com os pés no chão · claro · caloroso · confiável com dados.

Nunca: corporativo · frio · hype · cheio de jargão · invasivo.

## 4. Glossário
- customer → Cliente
- channel → Canal
- enrichment → Busca de WhatsApp
- journey → Régua
- campaign → Envio em massa
- segment → Lista de clientes
- conversion → Comprou de novo
- attributed revenue → Vendas geradas pelo Outra Vez
- holdout → Grupo de comparação
- opted_in → Aceitou novidades
- transactional_only → Só avisos do pedido
- opted_out → Não quer mensagens
- unknown → Ainda não contatado
- low_confidence → Número a confirmar

## 5. Foundations
Ver `tokens.json`. Escalas 50–950 para ink/coral/warm/success/warning/danger/info.

### Semântica
- Azul-tinta: ação e confiança
- Coral: retorno e assinatura de marca
- Verde semântico: sucesso
- Verde WhatsApp: apenas WhatsApp
- Fundo claro: quente, nunca branco clínico
- Fundo escuro: carvão, nunca preto puro

## 6. Tipografia
Plus Jakarta Sans.
Escala: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36.
Display pode usar 48–72 em comunicação.
Tabular nums em dados.

## 7. Espaçamento
Base 4 px.
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96.

## 8. Raio
6 · 10 · 14 · 20 · 28 · full.

## 9. Movimento
150 ms micro.
250 ms painel.
600 ms máximo para celebração.
Respeitar prefers-reduced-motion.

## 10. Breakpoints
360 base · 640 · 768 · 1024 · 1280.

## 11. Componentes base
Button, Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, Badge, Card,
Table/list mobile, Tabs, Dialog, Sheet, Dropdown, Tooltip, Toast, Alert, Skeleton,
Progress, Avatar, Breadcrumb, Pagination, Date Picker.

## 12. Componentes Outra Vez
KPI Card · Status de consentimento · Chip de canal · Badge RFM · Saúde de integração ·
Medidor de créditos · Timeline do cliente · Preview WhatsApp · Editor de régua vertical ·
Construtor de lista · Confirmação com custo · Funil · Stepper onboarding ·
Progresso de importação · Empty state · Banner global · Navegação.

## 13. Telas obrigatórias
1. Dashboard
2. Ficha do cliente
3. Editor de régua
4. Confirmação de envio em massa
5. Onboarding — Conectar Bling
6. Página pública de saída

Cada uma em 390 e 1440, light e dark.

## 14. Comunicação
O design system também governa:
- anúncios;
- social;
- apresentações;
- landing pages;
- email headers;
- cards de resultado;
- peças institucionais.

Uma peça deve parecer Outra Vez mesmo sem o logotipo.
