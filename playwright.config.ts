import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT ?? 3100);

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Escolha de cookies já feita ("Só os necessários") para o banner não cobrir botões.
    // Os testes de consentimento abrem um contexto limpo (tests/e2e/tracking.spec.ts).
    storageState: {
      cookies: [
        {
          name: 'ov_consent',
          value: '0,0',
          domain: 'localhost',
          path: '/',
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: 'Lax',
        },
      ],
      origins: [],
    },
  },
  webServer: {
    command: `pnpm start -p ${PORT}`,
    port: PORT,
    reuseExistingServer: true,
    // Os testes do formulário sobem um receptor local no lugar do CRM (tests/e2e/form.spec.ts).
    env: { DEMO_WEBHOOK_URL: 'http://127.0.0.1:3999/hook' },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
