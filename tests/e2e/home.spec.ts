import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const widths = [360, 390, 640, 768, 1024, 1280, 1440];

test.describe('Página inicial', () => {
  for (const width of widths) {
    test(`sem rolagem horizontal em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  for (const width of [360, 1440]) {
    test(`axe sem violações WCAG 2.1 AA em ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  }

  test('tem um único H1 com o slogan', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText('Vendeu uma vez? Venda outra vez.');
  });

  test('CTA do header leva até #agendar', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    await page.getByRole('link', { name: 'Agendar demo', exact: true }).click();
    await expect(page).toHaveURL(/#agendar$/);
    await expect(page.locator('#agendar h2')).toBeFocused();
  });

  test('menu mobile abre com as âncoras', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('link', { name: 'Como funciona' })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Perguntas' })).toBeVisible();
  });
});
