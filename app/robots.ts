import type { MetadataRoute } from 'next';
import { CANONICAL_URL, isProduction } from '@/lib/site';

/** PRD 13: bloqueia /obrigado e /api. Fora da produção, bloqueia tudo. */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/obrigado', '/api/'] }],
    sitemap: `${CANONICAL_URL}/sitemap.xml`,
  };
}
