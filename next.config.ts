import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';
const isProductionDeploy = process.env.VERCEL_ENV === 'production';

/**
 * CSP (PRD 10.4): libera Cal.com, Turnstile, GTM/GA, Meta e Vercel Analytics.
 * `unsafe-inline` em script-src porque as páginas são estáticas (SSG) e o Next injeta scripts
 * inline; nonce exigiria renderização dinâmica.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://*.cal.com https://cal.com https://challenges.cloudflare.com https://www.googletagmanager.com https://*.google-analytics.com https://connect.facebook.net https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.cal.com https://cal.com https://challenges.cloudflare.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.facebook.com https://*.facebook.net https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://*.cal.com https://cal.com https://challenges.cloudflare.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // CSS inline no HTML: tira a folha de estilo do caminho crítico (LCP < 2 s, PRD 14.1).
  experimental: { inlineCss: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: isProductionDeploy
          ? securityHeaders
          : [...securityHeaders, { key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
};

export default nextConfig;
