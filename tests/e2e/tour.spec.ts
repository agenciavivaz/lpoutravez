import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const TABS = ['Início', 'Clientes', 'Réguas', 'WhatsApp', 'Envio em massa', 'Bling'];

async function openTour(page: Page) {
  await page.locator('#por-dentro').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-tour-ready]')).toHaveAttribute('data-tour-ready', 'true');
}

test.describe('Fase 2 — Conheça por dentro', () => {
  test('aba Início está no HTML estático (indexável) antes do JS do tour', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-tour-ready]')).toHaveAttribute('data-tour-ready', 'false');
    const label = await page.locator('#tour-panel [role="img"]').first().getAttribute('aria-label');
    expect(label).toContain('Quanto voltou, num relance.');
    expect(label).toContain('R$ 4.820');
    expect(await page.content()).toContain('Bom dia, Diego');
  });

  test('o JS do tour só carrega perto da viewport', async ({ page }) => {
    const loaded: string[] = [];
    page.on('response', (response) => {
      if (response.url().includes('/_next/static/chunks/')) loaded.push(response.url());
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const before = loaded.length;
    await expect(page.locator('[data-tour-ready]')).toHaveAttribute('data-tour-ready', 'false');
    await openTour(page);
    expect(loaded.length).toBeGreaterThan(before);
  });

  for (const width of [390, 1440]) {
    test(`as 6 abas renderizam em ${width}px, claro e escuro`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/');
      await openTour(page);
      const devices = width === 1440 ? ['Computador', 'Celular'] : ['Celular'];
      for (const device of devices) {
        if (width === 1440) await page.getByRole('button', { name: device, exact: true }).click();
        for (const theme of ['Claro', 'Escuro']) {
          await page.getByRole('button', { name: theme, exact: true }).click();
          for (const tab of TABS) {
            await page.getByRole('tab', { name: tab, exact: true }).click();
            await expect(page.getByRole('tab', { name: tab, exact: true })).toHaveAttribute(
              'aria-selected',
              'true',
            );
            const frame = page.locator('#tour-panel [role="img"]:visible');
            await expect(frame).toHaveCount(1);
            await expect(frame.locator('[inert]')).toHaveCount(1);
            await expect(page.locator('#tour-panel [data-hotspot]:visible')).toHaveCount(3);
            await expect(page.locator('#tour-panel [data-theme]')).toHaveAttribute(
              'data-theme',
              theme === 'Claro' ? 'light' : 'dark',
            );
          }
        }
      }
      await expect(page.getByText('Dados de uma loja de exemplo.', { exact: true })).toBeVisible();
    });
  }

  test('aba WhatsApp usa moldura de celular mesmo em "Computador"', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');
    await openTour(page);
    await page.getByRole('tab', { name: 'WhatsApp' }).click();
    await expect(page.locator('#tour-panel [data-slot="phone-frame"]:visible')).toHaveCount(1);
    await expect(page.locator('#tour-panel [data-slot="browser-frame"]')).toHaveCount(0);
  });

  test('alternância Celular/Computador fica escondida no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    await openTour(page);
    await expect(page.getByRole('button', { name: 'Computador', exact: true })).toBeHidden();
  });

  test('teclado navega pelas abas com as setas', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');
    await openTour(page);
    await page.getByRole('tab', { name: 'Início' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Clientes' })).toBeFocused();
    await expect(page.getByRole('tab', { name: 'Clientes' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await page.keyboard.press('End');
    await expect(page.getByRole('tab', { name: 'Bling' })).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Início' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('marcador abre o balão com o item da legenda', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');
    await openTour(page);
    const marker = page.getByRole('button', { name: /Marcador 2:/ }).locator('visible=true');
    await marker.click();
    await expect(marker).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#tour-panel [role="note"]:visible')).toContainText('o funil mostra');
  });

  test('CLS da seção = 0 na troca do estático pelo interativo', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.evaluate(() => {
      (window as unknown as { __shifts: number }).__shifts = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as {
          value: number;
          hadRecentInput: boolean;
        }[]) {
          if (!entry.hadRecentInput)
            (window as unknown as { __shifts: number }).__shifts += entry.value;
        }
      }).observe({ type: 'layout-shift', buffered: false });
    });
    const box = await page.locator('#por-dentro').boundingBox();
    await openTour(page);
    await page.waitForTimeout(500);
    const after = await page.locator('#por-dentro').boundingBox();
    expect(after?.height).toBeCloseTo(box?.height ?? 0, 0);
    const shifts = await page.evaluate(() => (window as unknown as { __shifts: number }).__shifts);
    expect(shifts).toBeLessThan(0.001);
  });

  test('axe sem violações no tour (claro e escuro, balão aberto)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');
    await openTour(page);
    await page.getByRole('tab', { name: 'Clientes' }).click();
    await page
      .getByRole('button', { name: /Marcador 1:/ })
      .locator('visible=true')
      .click();
    for (const theme of ['Claro', 'Escuro']) {
      await page.getByRole('button', { name: theme, exact: true }).click();
      const results = await new AxeBuilder({ page })
        .include('#por-dentro')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(
        results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`),
      ).toEqual([]);
    }
  });
});
