import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/privacidade', '/termos'].map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'yearly',
    priority: path === '/' ? 1 : 0.3,
  }));
}
