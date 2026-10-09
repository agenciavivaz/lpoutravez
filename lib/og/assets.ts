import 'server-only';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Arquivos da marca e da fonte para imagens geradas com next/og (OG e ícones). */
const root = process.cwd();

export async function brandSvgDataUri(name: 'logo-symbol' | 'logo-horizontal-negative') {
  const svg = await readFile(join(root, 'brand/assets', `${name}.svg`));
  return `data:image/svg+xml;base64,${svg.toString('base64')}`;
}

export async function jakarta(weight: 400 | 800) {
  return readFile(
    join(
      root,
      `node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-${weight}-normal.woff`,
    ),
  );
}

/**
 * O texto do logo oficial usa Arial (`font-family="Arial"` no SVG), que o next/og não tem.
 * Arimo tem as mesmas métricas da Arial; usamos só para desenhar o lockup na imagem OG.
 */
export async function arimoBold() {
  return readFile(join(root, 'node_modules/@fontsource/arimo/files/arimo-latin-700-normal.woff'));
}
