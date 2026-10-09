import { createServer, type Server } from 'node:http';
import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Receptor local no lugar do CRM (DEMO_WEBHOOK_URL no playwright.config.ts).
type Payload = {
  request_id: string;
  status: string;
  step: number;
  contact: { name: string; whatsapp_e164: string };
  store?: Record<string, unknown>;
  attribution: Record<string, string>;
};
const received: Payload[] = [];
let server: Server;

test.beforeAll(async () => {
  server = createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      received.push(JSON.parse(body) as Payload);
      res.writeHead(200).end('ok');
    });
  });
  await new Promise<void>((resolve) => server.listen(3999, '127.0.0.1', resolve));
});
test.afterAll(() => new Promise<void>((resolve) => server.close(() => resolve())));

test.describe.configure({ mode: 'serial' });

async function openForm(page: Page, url = '/') {
  await page.goto(url);
  await page.locator('#agendar').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-form-ready]')).toHaveAttribute('data-form-ready', 'true');
  // Tempo mínimo anti-spam (3 s entre aparecer e enviar).
  await page.waitForTimeout(3100);
}

async function fillContact(page: Page, name = 'Ana Teste') {
  await page.getByLabel('Seu nome').fill(name);
  await page.getByLabel('WhatsApp com DDD').pressSequentially('11987654321');
  await page.getByLabel('E-mail', { exact: true }).fill('ana@sualoja.com.br');
  await page.getByLabel(/Aceito receber o contato/).check();
}

async function fillStore(page: Page, erp: string) {
  await page.getByLabel('Nome da loja').fill('Loja da Ana');
  await page.locator('#demo-marketplaces').getByText('Shopee', { exact: true }).click();
  await page
    .getByLabel('Quantos pedidos por mês, somando todos os canais?')
    .selectOption('1000_3000');
  await page.getByLabel(erp, { exact: true }).check();
}

test.describe('Fase 4 — formulário (sem banco, envio para o CRM)', () => {
  test('etapa 1: erros do PRD, foco no primeiro erro e axe', async ({ page }) => {
    await openForm(page);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('Escreva seu nome.')).toBeVisible();
    await expect(page.getByText('Confira o número: DDD + 9 dígitos.')).toBeVisible();
    await expect(page.getByText('Confira o e-mail. Exemplo: voce@sualoja.com.br')).toBeVisible();
    await expect(page.getByText('Marque para a gente poder falar com você.')).toBeVisible();
    await expect(page.getByLabel('Seu nome')).toBeFocused();
    await expect(page.getByLabel('Seu nome')).toHaveAttribute('aria-invalid', 'true');
    const results = await new AxeBuilder({ page })
      .include('#agendar')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });

  test('máscara do WhatsApp e envio da etapa 1 para o CRM (status started)', async ({ page }) => {
    received.length = 0;
    await openForm(page, '/?utm_source=meta&utm_campaign=lancamento');
    await fillContact(page);
    await expect(page.getByLabel('WhatsApp com DDD')).toHaveValue('(11) 98765-4321');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('2 de 2', { exact: true })).toBeVisible();
    await expect.poll(() => received.length).toBe(1);
    expect(received[0]).toMatchObject({
      status: 'started',
      step: 1,
      contact: { name: 'Ana Teste', whatsapp_e164: '+5511987654321' },
      attribution: { utm_source: 'meta', utm_campaign: 'lancamento', landing_path: '/' },
    });
    const events = await page.evaluate(() => window.dataLayer?.map((e) => e.event));
    expect(events).toContain('demo_form_step1');
    // Nada pessoal no dataLayer (PRD 12.2).
    expect(JSON.stringify(await page.evaluate(() => window.dataLayer))).not.toContain('ana@');
  });

  test('recarregar volta para a etapa em que parou', async ({ page }) => {
    await openForm(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('2 de 2', { exact: true })).toBeVisible();
    await page.reload();
    await page.locator('#agendar').scrollIntoViewIfNeeded();
    await expect(page.getByText('2 de 2', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Voltar' }).click();
    await expect(page.getByLabel('Seu nome')).toHaveValue('Ana Teste');
  });

  test('Bling → qualified e calendário (sem Cal.com configurado mostra WhatsApp)', async ({
    page,
  }) => {
    received.length = 0;
    await openForm(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await fillStore(page, 'Bling');
    await page.getByRole('button', { name: 'Escolher horário' }).click();
    await expect(page.getByRole('heading', { name: 'Escolha o melhor horário' })).toBeVisible();
    await expect(
      page.getByText(
        'Não conseguimos abrir o calendário agora. A gente te chama no WhatsApp para marcar o horário.',
      ),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Falar no WhatsApp' })).toHaveAttribute(
      'href',
      /wa\.me/,
    );
    await expect.poll(() => received.map((p) => p.status)).toEqual(['started', 'qualified']);
    expect(received[1]?.store).toMatchObject({
      store_name: 'Loja da Ana',
      marketplaces: ['Shopee'],
      orders_range: '1000_3000',
      erp: 'bling',
    });
  });

  test('Omie → lista de espera (status waitlist)', async ({ page }) => {
    received.length = 0;
    await openForm(page);
    await fillContact(page);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await fillStore(page, 'Omie');
    await page.getByRole('button', { name: 'Escolher horário' }).click();
    await expect(page).toHaveURL(/\/lista-de-espera\?erp=Omie$/);
    await expect(page.getByRole('heading', { name: 'Você está na lista.' })).toBeVisible();
    await expect(page.getByText('Assim que chegar ao Omie', { exact: false })).toBeVisible();
    await expect.poll(() => received.map((p) => p.status)).toEqual(['started', 'waitlist']);
  });

  test('honeypot preenchido: avança mas não envia nada', async ({ page }) => {
    received.length = 0;
    await openForm(page);
    await fillContact(page);
    await page.locator('#company_website').fill('https://spam.example', { force: true });
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByText('2 de 2', { exact: true })).toBeVisible();
    await page.waitForTimeout(500);
    expect(received).toHaveLength(0);
  });

  test('simulador pré-preenche "pedidos por mês"', async ({ page }) => {
    await page.goto('/');
    await page.locator('#simulador').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-simulator-ready]')).toHaveAttribute(
      'data-simulator-ready',
      'true',
    );
    await page.locator('#sim-orders').fill('5000');
    await page.locator('#sim-orders').press('Tab');
    await page.getByRole('link', { name: 'Ver isso com os meus números' }).click();
    await expect(page.locator('[data-form-ready]')).toHaveAttribute('data-form-ready', 'true');
    await page.waitForTimeout(3100);
    await fillContact(page);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByLabel('Quantos pedidos por mês, somando todos os canais?')).toHaveValue(
      '3000_10000',
    );
  });

  test('link "Prefere falar pelo WhatsApp?" abre em nova aba', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: 'Prefere falar pelo WhatsApp?' });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\/\d*\?text=Oi%2C%20quero%20conhecer%20o%20Outra%20Vez$/,
    );
  });
});

test.describe('Páginas de apoio', () => {
  test('/obrigado mostra data/hora e o e-mail da sessão, com noindex', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() =>
      sessionStorage.setItem('ov_demo_thank_you', JSON.stringify({ email: 'ana@sualoja.com.br' })),
    );
    await page.goto('/obrigado?inicio=2026-10-20T17:30:00.000Z&uid=abc123');
    await expect(page.getByRole('heading', { name: 'Demo marcada.' })).toBeVisible();
    await expect(page.getByText('20/10/2026 às 14:30')).toBeVisible();
    await expect(page.getByText('ana@sualoja.com.br')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Adicionar ao calendário' })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });

  for (const path of ['/privacidade', '/termos', '/lista-de-espera?erp=Tiny%2FOlist']) {
    test(`${path} sem violações de axe e sem rolagem horizontal em 360px`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations.map((v) => v.id)).toEqual([]);
    });
  }
});
