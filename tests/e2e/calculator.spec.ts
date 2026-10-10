import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function openCalculator(page: Page) {
  await page.locator('#faca-as-contas').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-calculator-ready]')).toHaveAttribute(
    'data-calculator-ready',
    'true',
  );
}

const calc = (page: Page) => page.locator('#faca-as-contas');
const revenue = (page: Page) => calc(page).locator('[data-calc="revenue"]');

test.describe('Calculadora (PRD v2 8)', () => {
  test('padrões: R$ 230 mil em 12 meses, 1.279 clientes, 1.535 pedidos (já no HTML)', async ({
    page,
  }) => {
    await page.goto('/');
    const html = await page.content();
    for (const text of [
      'R$ 230 mil',
      'Cerca de R$ 19 mil por mês. 6,4% do que você fatura no ano.',
    ])
      expect(html).toContain(text);
    await openCalculator(page);
    await expect(revenue(page)).toHaveText('R$ 230 mil');
    await expect(calc(page)).toContainText('1.279');
    await expect(calc(page)).toContainText('1.535');
    // Sem custo da Meta e sem ROI na tela.
    await expect(calc(page)).not.toContainText('Para cada R$ 1');
    await expect(calc(page)).not.toContainText('Meta');
  });

  test('categoria e canal próprio: suplementos com 20% no canal', async ({ page }) => {
    await page.goto('/');
    await openCalculator(page);
    await calc(page).locator('label', { hasText: 'Suplementos e saúde' }).click();
    await expect(revenue(page)).toHaveText('R$ 296 mil');
    await expect(calc(page)).toContainText('Ative se você tem canal próprio');
    await calc(page).getByRole('button', { name: 'Ative se você tem canal próprio' }).click();
    await expect(calc(page).getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    await expect(calc(page).getByRole('slider', { name: 'Recompras no seu canal' })).toHaveValue(
      '20',
    );
    await expect(calc(page)).toContainText('R$ 9.471');
  });

  test('"Ver as contas" é um accordion com fontes', async ({ page }) => {
    await page.goto('/');
    await openCalculator(page);
    const toggle = calc(page).getByRole('button', { name: 'Ver as contas' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(calc(page).getByText('Parte do benchmark que o Outra Vez captura')).toBeVisible();
    await expect(
      calc(page).getByText('Hipótese a validar com os primeiros clientes'),
    ).toBeVisible();
    await expect(calc(page).getByRole('link', { name: 'Rivo' })).toBeVisible();
    await expect(
      calc(page).getByText('Não é promessa de resultado.', { exact: false }),
    ).toBeVisible();
  });

  test('sliders logarítmicos pelo teclado, com aria-valuetext', async ({ page }) => {
    await page.goto('/');
    await openCalculator(page);
    const orders = calc(page).getByRole('slider', { name: 'Pedidos por mês' });
    await expect(orders).toHaveAttribute('aria-valuetext', '2.000 pedidos por mês');
    // 2.000 fica perto do meio da trilha (escala log), não colado na esquerda.
    expect(Number(await orders.inputValue())).toBeGreaterThan(450);
    await orders.focus();
    await page.keyboard.press('End');
    await expect(calc(page).getByLabel('Pedidos por mês', { exact: true }).first()).toHaveValue(
      '50.000',
    );
    const ticket = calc(page).getByRole('slider', { name: 'Ticket médio' });
    await expect(ticket).toHaveAttribute('aria-valuetext', 'R$ 150 de ticket médio');
  });

  test('campo numérico aceita digitação e limita à faixa ao sair', async ({ page }) => {
    await page.goto('/');
    await openCalculator(page);
    const field = page.locator('#calc-orders');
    await field.fill('5.000');
    await field.blur();
    await expect(field).toHaveValue('5.000');
    await field.fill('999999');
    await field.blur();
    await expect(field).toHaveValue('50.000');
  });

  test('CTA leva os valores para os campos do formulário', async ({ page }) => {
    await page.goto('/');
    await openCalculator(page);
    await calc(page).locator('label', { hasText: 'Beleza e cuidados' }).click();
    await calc(page).getByRole('link', { name: 'Agendar demo com os meus números' }).click();
    const snapshot = await page.evaluate(() => sessionStorage.getItem('ov_calculator_snapshot'));
    expect(JSON.parse(snapshot!)).toEqual({ orders: 2000, ticket: 150, category: 'beleza' });
  });

  test('axe sem violações com as contas abertas', async ({ page }) => {
    await page.goto('/');
    await openCalculator(page);
    await calc(page).getByRole('button', { name: 'Ver as contas' }).click();
    const results = await new AxeBuilder({ page })
      .include('#faca-as-contas')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
