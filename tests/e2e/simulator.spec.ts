import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function openSimulator(page: Page) {
  await page.locator('#simulador').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-simulator-ready]')).toHaveAttribute(
    'data-simulator-ready',
    'true',
  );
}

const output = (page: Page, label: string) =>
  page.locator('#simulador [aria-live] > div').filter({ hasText: label }).locator('p').nth(1);

test.describe('Fase 3 — Simulador', () => {
  test('padrões mostram R$ 5.400 / 36 / R$ 835,02 / R$ 6,47 (já no HTML)', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    for (const text of ['R$ 5.400', 'R$ 835,02', 'R$ 6,47 em vendas']) expect(html).toContain(text);
    await openSimulator(page);
    await expect(output(page, 'Vendas que podem voltar por mês')).toHaveText('R$ 5.400');
    await expect(output(page, 'Clientes que compram de novo')).toHaveText('36');
    await expect(output(page, 'Custo estimado')).toHaveText('R$ 835,02');
    await expect(output(page, 'Para cada R$ 1 investido')).toHaveText('R$ 6,47 em vendas');
  });

  test('aviso de simulação visível e "Ver as contas" abre as premissas', async ({ page }) => {
    await page.goto('/');
    await openSimulator(page);
    await expect(
      page.getByText('Simulação com premissas médias, não é promessa de resultado.', {
        exact: false,
      }),
    ).toBeVisible();
    await expect(page.getByText('Preço da Busca de WhatsApp por cliente')).toBeHidden();
    await page.getByText('Ver as contas').click();
    await expect(page.getByText('Preço da Busca de WhatsApp por cliente')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'R$ 0,3217' })).toBeVisible();
  });

  test('teclado opera os sliders', async ({ page }) => {
    await page.goto('/');
    await openSimulator(page);
    const slider = page.getByRole('slider', { name: 'Pedidos por mês' });
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(slider).toHaveValue('2100');
    await expect(page.locator('#sim-orders')).toHaveValue('2.100');
    await expect(output(page, 'Clientes que compram de novo')).toHaveText('38');
  });

  test('campo numérico aceita digitação e limita ao intervalo ao sair', async ({ page }) => {
    await page.goto('/');
    await openSimulator(page);
    const field = page.locator('#sim-ticket');
    await field.fill('5');
    await expect(field).toHaveValue('5');
    await field.press('Tab');
    await expect(field).toHaveValue('30');
    await field.fill('200');
    await field.press('Tab');
    await expect(output(page, 'Vendas que podem voltar por mês')).toHaveText('R$ 7.200');
  });

  test('CTA leva os valores para o formulário', async ({ page }) => {
    await page.goto('/');
    await openSimulator(page);
    await page.locator('#sim-orders').fill('5000');
    await page.locator('#sim-orders').press('Tab');
    await page.getByRole('link', { name: 'Ver isso com os meus números' }).click();
    await expect(page).toHaveURL(/#agendar$/);
    const snapshot = await page.evaluate(() => sessionStorage.getItem('ov_simulator_snapshot'));
    expect(JSON.parse(snapshot ?? '{}')).toEqual({ orders: 5000, ticket: 150, rate: 3 });
  });

  test('axe sem violações no simulador com as contas abertas', async ({ page }) => {
    await page.goto('/');
    await openSimulator(page);
    await page.getByText('Ver as contas').click();
    const results = await new AxeBuilder({ page })
      .include('#simulador')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`),
    ).toEqual([]);
  });
});
