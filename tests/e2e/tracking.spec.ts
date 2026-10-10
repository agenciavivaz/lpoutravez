import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type Layer = Record<string, unknown>[];
// gtag() empurra objetos `arguments`; converte em arrays dentro da página para serializar.
const layer = (page: import('@playwright/test').Page) =>
  page.evaluate(
    () =>
      (window.dataLayer ?? []).map((entry) =>
        Object.prototype.toString.call(entry) === '[object Arguments]'
          ? Array.from(entry as unknown as ArrayLike<unknown>)
          : entry,
      ) as unknown as Layer,
  );

test.describe('Fase 5 — consentimento e eventos', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('Consent Mode começa em denied e nada do GTM carrega antes da escolha', async ({ page }) => {
    const gtm: string[] = [];
    page.on('request', (r) => {
      if (/googletagmanager|google-analytics|facebook/.test(r.url())) gtm.push(r.url());
    });
    await page.goto('/');
    const first = (await layer(page))[0] as unknown as unknown[];
    expect(first).toEqual([
      'consent',
      'default',
      expect.objectContaining({ ad_storage: 'denied', analytics_storage: 'denied' }),
    ]);
    await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toBeVisible();
    await expect(
      page.getByText(
        'Usamos cookies para entender como a página é usada e medir nossos anúncios. Você escolhe.',
      ),
    ).toBeVisible();
    await page.waitForTimeout(1500);
    expect(gtm).toEqual([]);
  });

  test('"Aceitar todos" grava o cookie e atualiza o Consent Mode', async ({ page, context }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Aceitar todos' }).click();
    await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toBeHidden();
    const cookie = (await context.cookies()).find((c) => c.name === 'ov_consent');
    expect(cookie?.value).toBe('1,1');
    expect(cookie && cookie.expires - Date.now() / 1000).toBeGreaterThan(360 * 24 * 3600);
    const updates = (await layer(page)).filter(
      (e) => Array.isArray(e) && e[1] === 'update',
    ) as unknown as unknown[][];
    expect(updates.at(-1)?.[2]).toMatchObject({
      ad_storage: 'granted',
      analytics_storage: 'granted',
    });
    await page.reload();
    await expect(page.getByRole('region', { name: 'Aviso de cookies' })).toBeHidden();
  });

  test('"Configurar" permite só análise e o rodapé reabre as preferências', async ({
    page,
    context,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Configurar' }).click();
    await page.getByLabel(/Análise/).check();
    await page.getByRole('button', { name: 'Salvar escolhas' }).click();
    expect((await context.cookies()).find((c) => c.name === 'ov_consent')?.value).toBe('1,0');
    await page.getByRole('button', { name: 'Preferências de cookies' }).click();
    await expect(page.getByLabel(/Análise/)).toBeChecked();
    await expect(page.getByLabel(/Publicidade/)).not.toBeChecked();
  });

  test('banner sem violações de axe (com o painel aberto)', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Configurar' }).click();
    const results = await new AxeBuilder({ page })
      .include('[data-slot="consent-banner"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  test('com consentimento de análise, a origem fica no cookie ov_utm', async ({
    page,
    context,
  }) => {
    await page.goto('/?utm_source=google&utm_medium=cpc&gclid=abc');
    await page.getByRole('button', { name: 'Aceitar todos' }).click();
    await page.locator('#agendar').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-form-ready]')).toHaveAttribute('data-form-ready', 'true');
    await expect
      .poll(async () => (await context.cookies()).find((c) => c.name === 'ov_utm')?.value ?? '')
      .toContain('google');
  });
});

test.describe('Fase 5 — eventos do dataLayer (PRD 12.2)', () => {
  test('cta_click, section_view, tour_tab_view, tour_hotspot e calc_*', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.getByRole('link', { name: 'Agendar demo grátis' }).first().click();
    await page.locator('#por-dentro').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-tour-ready]')).toHaveAttribute('data-tour-ready', 'true');
    await page.getByRole('tab', { name: 'Réguas' }).click();
    await page
      .getByRole('button', { name: /Marcador 2:/ })
      .locator('visible=true')
      .click();
    await page.locator('#faca-as-contas').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-calculator-ready]')).toHaveAttribute(
      'data-calculator-ready',
      'true',
    );
    const calc = page.locator('#faca-as-contas');
    await calc.locator('label', { hasText: 'Suplementos e saúde' }).click();
    await page.waitForTimeout(1300);
    await calc.getByRole('link', { name: 'Agendar demo com os meus números' }).click();

    const events = await layer(page);
    expect(events).toContainEqual({ event: 'cta_click', location: 'hero' });
    expect(events).toContainEqual({ event: 'section_view', section: 'por-dentro' });
    expect(events).toContainEqual({
      event: 'tour_tab_view',
      tab: 'reguas',
      device: 'desktop',
      theme: 'light',
    });
    expect(events).toContainEqual({ event: 'tour_hotspot', tab: 'reguas', hotspot: 2 });
    expect(events).toContainEqual({ event: 'calc_category_change', category: 'suplementos' });
    expect(events).toContainEqual({
      event: 'calc_interact',
      orders: 2000,
      ticket: 150,
      category: 'suplementos',
      own_channel: 0,
    });
    expect(events).toContainEqual({
      event: 'calc_cta_click',
      orders: 2000,
      ticket: 150,
      category: 'suplementos',
      own_channel: 0,
    });
    const sections = events.filter((e) => e.event === 'section_view').map((e) => e.section);
    expect(new Set(sections).size).toBe(sections.length);
  });
});

test.describe('Fase 5 — SEO', () => {
  test('metadata, JSON-LD com 10 perguntas e OG 1200×630 (PRD v2 10)', async ({
    page,
    request,
  }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Outra Vez | CRM para quem vende em marketplace');
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toMatch(/^Identifique quem comprou de você no Mercado Livre/);
    expect(description!.length).toBeLessThanOrEqual(160);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.outravez.com.br',
    );
    const ld = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    );
    const types = ld['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(['Organization', 'SoftwareApplication', 'FAQPage']);
    expect(ld['@graph'][2].mainEntity).toHaveLength(10);
    expect(JSON.stringify(ld)).not.toMatch(/[\u2013\u2014]/);
    expect(JSON.stringify(ld)).not.toContain('aggregateRating');
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    const image = await request.get(new URL(og!).pathname + new URL(og!).search);
    expect(image.headers()['content-type']).toBe('image/png');
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      'content',
      '1200',
    );
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
      'content',
      '630',
    );
  });

  test('sitemap lista /, /privacidade e /termos', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    for (const path of ['', '/privacidade', '/termos'])
      expect(xml).toContain(`https://www.outravez.com.br${path}</loc>`);
    expect(xml).not.toContain('obrigado');
  });

  test('ícones 16, 32, 180 e 512', async ({ page }) => {
    await page.goto('/');
    const sizes = await page
      .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('sizes')));
    for (const size of ['16x16', '32x32', '512x512', '180x180']) expect(sizes).toContain(size);
  });
});
