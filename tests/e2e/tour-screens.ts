// Script auxiliar (não é teste): screenshots do tour por aba, moldura e tema.
// Uso: node --experimental-strip-types tests/e2e/tour-screens.ts [baseURL] [pastaDeSaída]
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:3100';
const out = process.argv[3] ?? 'test-results/tour';
const tabs = ['Início', 'Clientes', 'Réguas', 'WhatsApp', 'Envio em massa', 'Bling'];

(async () => {
  const browser = await chromium.launch();
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.goto(base);
    await page.locator('#por-dentro').scrollIntoViewIfNeeded();
    await page.locator('[data-tour-ready="true"]').waitFor();
    const variants = width === 1440 ? ['Computador', 'Celular'] : ['Celular'];
    for (const variant of variants) {
      if (width === 1440) await page.getByRole('button', { name: variant }).click();
      for (const [index, tab] of tabs.entries()) {
        await page.getByRole('tab', { name: tab }).click();
        await page.waitForTimeout(400);
        await page
          .locator('#tour-panel')
          .screenshot({ path: `${out}/${width}-${variant}-${index}.png` });
      }
    }
    await page.getByRole('tab', { name: 'Início' }).click();
    await page.getByRole('button', { name: 'Escuro' }).click();
    if (width === 1440) await page.getByRole('button', { name: 'Computador' }).click();
    await page.waitForTimeout(400);
    await page.locator('#tour-panel').screenshot({ path: `${out}/${width}-dark-0.png` });
    await page.close();
  }
  await browser.close();
})();
