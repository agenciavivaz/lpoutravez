import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Fase 1 — página estática completa', () => {
  test('tem todas as seções na ordem da PRD v2 9', async ({ page }) => {
    await page.goto('/');
    const ids = await page
      .locator('main > section[id]')
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual([
      'inicio',
      'problema',
      'como-funciona',
      'rota-de-recompra',
      'faca-as-contas',
      'por-dentro',
      'seguranca',
      'integracoes',
      'comparacao',
      'demo',
      'perguntas',
      'agendar',
    ]);
    // Um H2 por seção (exceto hero, que tem o H1).
    await expect(page.locator('main h2')).toHaveCount(11);
  });

  test('só tem imagens da marca; logos de terceiros só na faixa e em Integrações (PRD v2 7)', async ({
    page,
  }) => {
    await page.goto('/');
    const srcs = await page
      .locator('img')
      .evaluateAll((els) => els.map((el) => (el as HTMLImageElement).getAttribute('src') ?? ''));
    for (const src of srcs) expect(src).toMatch(/logo-(horizontal|symbol)/);
    const logos = page.locator('[data-brand-logo]');
    const outside = await logos.evaluateAll(
      (els) =>
        els.filter(
          (el) => !el.closest('section[aria-label="Marketplaces compatíveis"], #integracoes'),
        ).length,
    );
    expect(outside).toBe(0);
    // Monocromático: o símbolo é pintado com currentColor (cor do texto), nunca cor de marca.
    const colors = await logos.evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).backgroundColor === getComputedStyle(el).color),
    );
    expect(colors.every(Boolean)).toBe(true);
  });

  test('rota de recompra e integrações (PRD v2 5.2 e 6)', async ({ page }) => {
    await page.goto('/');
    const rota = page.locator('#rota-de-recompra');
    await expect(rota.locator('[data-route]')).toHaveCount(3);
    await expect(rota.locator('[data-route="marketplace"]')).toContainText('Padrão');
    await expect(rota).toContainText(
      'O marketplace é a rota padrão. O seu canal só entra para clientes que aceitaram receber novidades.',
    );
    const integ = page.locator('#integracoes');
    await expect(integ.locator('[data-erp="bling"]')).toContainText('Integração ativa');
    await expect(integ.getByText('Integração ativa')).toHaveCount(1);
    await expect(integ.getByText('Conectamos na implantação')).toHaveCount(7);
    expect(await page.content()).not.toMatch(/integração nativa/i);
  });

  test('"O que muda" não existe mais e não há travessão no texto da página', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#o-que-muda')).toHaveCount(0);
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/[\u2013\u2014]/);
    const head = await page.locator('head').innerHTML();
    expect(head).not.toMatch(/[\u2013\u2014]/);
  });

  test('FAQ: uma aberta por vez, respostas no HTML e evento faq_open', async ({ page }) => {
    await page.goto('/');
    const faq = page.locator('#perguntas');
    // Respostas estão no HTML mesmo fechadas (indexáveis).
    await expect(faq.locator('details')).toHaveCount(10);
    expect(await page.content()).toContain('Só lemos pedidos, notas e contatos.');
    const first = faq.getByText('Nunca usamos o chat do marketplace,', { exact: false });
    await faq.getByText('Posso ser punido pelo marketplace?').click();
    await expect(first).toBeVisible();
    await faq.getByText('Quanto custa?').click();
    await expect(
      faq.getByText('Depende do volume da sua operação.', { exact: false }),
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

  test('comparação: tabela no desktop, abas no mobile (PRD v2 9.10)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('#comparacao table')).toBeVisible();
    await expect(page.locator('#comparacao table')).not.toContainText('Funciona bem no celular');
    await page.setViewportSize({ width: 360, height: 800 });
    await expect(page.locator('#comparacao table')).toBeHidden();
    const tabs = page.locator('#comparacao [role="tab"]');
    await expect(tabs).toHaveText(['Planilha do ERP', 'WhatsApp Web + extensão', 'CRM genérico']);
    const panel = page.locator('#comparacao [role="tabpanel"]');
    await expect(panel).toContainText('Planilha do ERP');
    await tabs.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(panel).toContainText('WhatsApp Web + extensão');
    await expect(panel).toContainText('Outra Vez');
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

  test('a seta do "Como funciona" (5 → 3) completa quando o passo 5 aparece', async ({ page }) => {
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
    await page.locator('#perguntas').getByText('Funciona com o meu ERP?').click();
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

test.describe('Faixa "Funciona com" (PRD v2 11.3.2)', () => {
  test('mobile: rola, pausa pelo botão e fica parada com reduced motion', async ({ browser }) => {
    const moving = await browser.newContext({ viewport: { width: 390, height: 800 } });
    const page = await moving.newPage();
    await page.goto('/');
    const marquee = page.locator('[data-marquee]');
    const track = marquee.locator('[data-marquee-track]');
    expect(await track.evaluate((el) => getComputedStyle(el).animationName)).toBe('marquee');
    await marquee.getByRole('button', { name: 'Pausar a rolagem dos logos' }).click();
    await expect(marquee).toHaveAttribute('data-paused', 'true');
    expect(await track.evaluate((el) => getComputedStyle(el).animationPlayState)).toBe('paused');
    await moving.close();

    const still = await browser.newContext({
      viewport: { width: 390, height: 800 },
      reducedMotion: 'reduce',
    });
    const quiet = await still.newPage();
    await quiet.goto('/');
    const quietTrack = quiet.locator('[data-marquee-track]');
    expect(await quietTrack.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    await expect(quiet.locator('[data-marquee-pause]')).toBeHidden();
    await still.close();
  });

  test('desktop: estática', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('[data-marquee]')).toBeHidden();
  });
});
