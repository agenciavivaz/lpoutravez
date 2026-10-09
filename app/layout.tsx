import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { copy } from '@/lib/copy/pt-BR';
import { isProduction, site } from '@/lib/site';
import { CONSENT_DEFAULT_SCRIPT } from '@/lib/consent';
import { ConsentBanner } from '@/components/consent/consent-banner';
import { Gtm } from '@/components/consent/gtm';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: { canonical: '/' },
  // Previews e builds locais não são indexados (PRD 10.4).
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F8F7F3',
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID || null;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light" className={jakarta.variable}>
      <head>
        {/* Consent Mode v2: padrão "denied" antes de qualquer tag (PRD 12.1). */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="bg-primary text-primary-foreground sr-only z-50 rounded-[10px] px-4 py-3 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {copy.a11y.skipToContent}
        </a>
        {children}
        <ConsentBanner />
        {gtmId ? <Gtm id={gtmId} /> : null}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
