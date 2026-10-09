import type { MetadataRoute } from 'next';
import { CANONICAL_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/privacidade', '/termos'].map((path) => ({
    url: `${CANONICAL_URL}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'yearly',
    priority: path === '/' ? 1 : 0.3,
  }));
}
