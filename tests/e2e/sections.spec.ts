import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Fase 1 — página estática completa', () => {
  test('tem todas as seções na ordem do PRD 5', async ({ page }) => {
    await page.goto('/');
    const ids = await page
      .locator('main > section[id]')
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual([
      'inicio',
      'problema',
      'como-funciona',
      'por-dentro',
      'o-que-muda',
      'seguranca',
      'simulador',
      'comparacao',
      'demo',
      'perguntas',
      'agendar',
    ]);
    // Um H2 por seção (exceto hero, que tem o H1).
    await expect(page.locator('main h2')).toHaveCount(10);
  });

  test('só tem imagens da marca (nenhum logo de marketplace)', async ({ page }) => {
    await page.goto('/');
    const srcs = await page
      .locator('img')
      .evaluateAll((els) => els.map((el) => (el as HTMLImageElement).getAttribute('src') ?? ''));
    for (const src of srcs) expect(src).toMatch(/logo-(horizontal|symbol)/);
  });

  test('FAQ: uma aberta por vez, respostas no HTML e evento faq_open', async ({ page }) => {
    await page.goto('/');
    const faq = page.locator('#perguntas');
    // Respostas estão no HTML mesmo fechadas (indexáveis).
    await expect(faq.locator('details')).toHaveCount(9);
    expect(await page.content()).toContain('Só lemos pedidos, notas fiscais e contatos.');
    const first = faq.getByText('Nunca usamos o chat do marketplace.', { exact: false });
    await faq.getByText('Posso ser punido pelo marketplace?').click();
    await expect(first).toBeVisible();
    await faq.getByText('Quanto custa?').click();
    await expect(
      faq.getByText('Depende do tamanho da sua operação.', { exact: false }),
    ).toBeVisible();
    await expect(first).toBeHidden();
    const events = await page.evaluate(() =>
      window.dataLayer?.filter((e) => e.event === 'faq_open').map((e) => e.question_id),
    );
    expect(events).toEqual(['punicao', 'preco']);
  });

  test('FAQ abre pelo teclado', async ({ page }) => {
    await page.goto('/');
    const summary = page.locator('#perguntas summary').first();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#perguntas details').first()).toHaveAttribute('open', '');
  });

  test('comparação: tabela no desktop, cards no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('#comparacao table')).toBeVisible();
    await page.setViewportSize({ width: 360, height: 800 });
    await expect(page.locator('#comparacao table')).toBeHidden();
    await expect(page.locator('#comparacao li h3')).toHaveCount(4);
  });

  test('barra de CTA do mobile aparece depois do hero e some em #agendar', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    const bar = page.locator('[data-slot="mobile-cta-bar"]');
    await expect(bar).toHaveAttribute('data-visible', 'false');
    await page.locator('#problema').scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById('problema')?.scrollIntoView());
    await expect(bar).toHaveAttribute('data-visible', 'true');
    await page.evaluate(() => document.getElementById('agendar')?.scrollIntoView());
    await expect(bar).toHaveAttribute('data-visible', 'false');
  });

  test('barra de CTA não aparece no desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.evaluate(() => document.getElementById('problema')?.scrollIntoView());
    await expect(page.locator('[data-slot="mobile-cta-bar"]')).toBeHidden();
  });

  test('com prefers-reduced-motion o laço do "Como funciona" já aparece completo', async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('[data-loop-stage]')).toHaveAttribute('data-loop-stage', 'static');
    await context.close();
  });

  test('o laço do "Como funciona" completa quando o nó 5 aparece', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    const stage = page.locator('[data-loop-stage]');
    await expect(stage).toHaveAttribute('data-loop-stage', 'armed');
    await page.locator('[data-step="5"]').scrollIntoViewIfNeeded();
    await expect(stage).toHaveAttribute('data-loop-stage', 'done');
  });

  test('axe sem violações com uma pergunta aberta e o menu fechado (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1000 });
    await page.goto('/');
    await page.locator('#perguntas').getByText('Preciso usar o Bling?').click();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`),
    ).toEqual([]);
  });

  test('alvos de toque têm pelo menos 44 px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/');
    const small = await page.locator('a, button').evaluateAll((els) =>
      els
        .filter((el) => {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (r.width === 0 || style.visibility === 'hidden' || el.closest('[inert]')) return false;
          if (el.classList.contains('sr-only')) return false;
          // Links dentro de uma frase são isentos (WCAG 2.5.8, exceção "inline").
          if (style.display === 'inline' && el.closest('p, label span')) return false;
          return r.height < 44 || r.width < 44;
        })
        .map((el) => el.textContent?.trim() || el.getAttribute('aria-label')),
    );
    expect(small).toEqual([]);
  });
});
