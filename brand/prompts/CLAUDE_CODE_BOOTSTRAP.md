# Prompt — bootstrap do Claude Code

Leia integralmente:
- `CLAUDE.md`
- `DESIGN_SYSTEM_SPEC.md`
- `tokens.json`
- `ACCEPTANCE.md`
- `design-system-v2.html`
- `registry/*.json`

Trate esses arquivos como fonte da verdade visual.

Objetivo:
Construir o design system do Outra Vez em Next.js + TypeScript + Tailwind + shadcn/ui,
com uma rota `/design-system` que reproduza a linguagem e os exemplos do arquivo
`design-system-v2.html`, mas usando componentes reais.

Depois:
1. implemente os componentes específicos em `components/outra-vez/`;
2. crie stories/examples para estados default, hover, focus, disabled, loading e error;
3. implemente as 6 telas de referência em light e dark;
4. teste 360/390/1440;
5. não use logos de marketplaces;
6. use Lucide;
7. rode a checklist de `ACCEPTANCE.md`.

Não redesenhe a direção visual.
