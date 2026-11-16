import type { MetadataRoute } from 'next'
import { getArticles } from '@/lib/data/news'
import { categorySlug, getProducts } from '@/lib/data/products'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '/',
    '/products',
    `/products/${categorySlug}`,
    '/capabilities',
    '/applications',
    '/about',
    '/news',
    '/contact',
  ]
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...getProducts().map((p) => ({ url: absoluteUrl(p.href) })),
    ...getArticles().map((a) => ({
      url: absoluteUrl(a.href),
      lastModified: a.updatedAt ?? a.publishedAt,
    })),
  ]
}
