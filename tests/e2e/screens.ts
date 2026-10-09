// Script auxiliar (não é teste): tira screenshots em 360/390/768/1440 para revisão manual.
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:3100';
const out = process.argv[3] ?? 'test-results/screens';

(async () => {
  const browser = await chromium.launch();
  for (const width of [360, 390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base);
    await page.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
    await page.close();
  }
  await browser.close();
})();
