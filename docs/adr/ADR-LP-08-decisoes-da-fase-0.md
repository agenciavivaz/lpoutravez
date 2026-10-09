# ADR-LP-08 — Decisões de implementação da Fase 0

**Status:** aceita · 09/10/2026

1. **Tema por atributo `data-theme`**, não por classe. O Tailwind usa `@custom-variant dark` com `[data-theme='dark']`, e os tokens semânticos são redefinidos em qualquer contêiner com `data-theme`. Assim o tour troca claro/escuro só dentro da moldura (PRD 7.2). A página inteira fica em claro (tema escuro global é P1).
2. **`accent` = coral**, como no `registry/outra-vez-style.json`. Como o shadcn usa `accent` em hover de botão, o `Button` copiado do app foi ajustado: hover de `outline`/`ghost` usa `secondary`, nunca `accent`. Todos os tamanhos têm no mínimo 44 px de altura.
3. **Logo** é a cópia literal de `brand/assets/*.svg`, importada como arquivo estático (`components/brand/logo.tsx`). Nenhum logo foi redesenhado.
4. **Laço (`Loop`)** é um SVG que reproduz o `.loop` do DS (anel + ponta coral). `LoopUnderline` é um traço coral decorativo sob "outra vez." no H1.
5. **CNPJ ausente:** enquanto não houver CNPJ confirmado (PRD 17, pergunta 6), o rodapé mostra "Outra Vez é um produto da Vivaz" sem o trecho do CNPJ. O valor entra em `lib/site.ts`.
6. **CSP com `'unsafe-inline'` em `script-src`:** páginas estáticas não têm nonce. Revisar na Fase 5 com hashes se o orçamento permitir.
7. **`noindex` fora da produção:** header `X-Robots-Tag` e meta robots quando `VERCEL_ENV !== 'production'`.
8. **Faixa `#agendar` já existe na Fase 0** (título, subtítulo, lista de checks) para que os CTAs tenham destino desde o primeiro deploy. O formulário entra na Fase 4.
