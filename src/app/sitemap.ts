import type { MetadataRoute } from 'next';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...collections
      .filter((c) => !c.comingSoon)
      .map((collection) => ({
        url: `${siteUrl}${collection.href}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      })),
    ...products.map((product) => ({
      url: `${siteUrl}/product/${product.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
}
