// Script auxiliar (não é teste): screenshots por seção em 390 e 1440 para revisão manual.
// Uso: node --experimental-strip-types tests/e2e/screens.ts [baseURL] [pastaDeSaída]
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:3100';
const out = process.argv[3] ?? 'test-results/screens';

(async () => {
  const browser = await chromium.launch();
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base);
    await page.waitForTimeout(2000);
    const sections = await page.locator('main > section, footer').all();
    for (const [index, section] of sections.entries()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      const id = (await section.getAttribute('id')) ?? `s${index}`;
      await section.screenshot({
        path: `${out}/${width}-${String(index).padStart(2, '0')}-${id}.png`,
      });
    }
    await page.close();
  }
  await browser.close();
})();
