import type { MetadataRoute } from 'next';
import { isProduction, site } from '@/lib/site';

/** PRD 13: bloqueia /obrigado, /lista-de-espera e /api. Fora da produção, bloqueia tudo. */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/obrigado', '/lista-de-espera', '/api/'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
