/**
 * Screenshots por seção em 390 e 1440 px, claro e escuro (prefers-color-scheme).
 * Uso: pnpm build && pnpm start -p 3100 & node scripts/screenshots.mjs docs/screens/depois
 * A LP é só tema claro (<html data-theme="light">); a captura "escuro" mostra o que vê quem usa o
 * sistema no modo escuro.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2] ?? 'docs/screens/depois';
const base = process.env.BASE_URL ?? 'http://localhost:3100';
const widths = [390, 1440];
const themes = ['claro', 'escuro'];

const browser = await chromium.launch();
for (const width of widths) {
  for (const theme of themes) {
    const dir = join(out, `${width}-${theme}`);
    mkdirSync(dir, { recursive: true });
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 844 : 900 },
      deviceScaleFactor: 1,
      colorScheme: theme === 'escuro' ? 'dark' : 'light',
      reducedMotion: 'reduce',
    });
    await context.addCookies([{ name: 'ov_consent', value: '0,0', url: base }]);
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    // Rola até o fim para carregar tour, simulador e formulário (carregamento tardio).
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(800);
    // Header fixo e barra de CTA do mobile cobririam as capturas de cada seção.
    await page.addStyleTag({
      content:
        'header{position:static!important} [data-slot="mobile-cta-bar"]{display:none!important}',
    });
    const sections = await page.$$('main > section, main > div > section, footer');
    let index = 0;
    for (const section of sections) {
      index += 1;
      const name =
        (await section.getAttribute('id')) ??
        (await section.evaluate((el) => (el.tagName === 'FOOTER' ? 'rodape' : 'faixa'))) ??
        'secao';
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await section.screenshot({
        path: join(dir, `${String(index).padStart(2, '0')}-${name}.jpg`),
        type: 'jpeg',
        quality: 70,
        animations: 'disabled',
      });
    }
    await context.close();
  }
}
await browser.close();
console.log(`Screenshots em ${out}`);
