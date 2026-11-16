import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/articles-db'
import { categorySlug } from '@/lib/data/products'
import { fetchProductsData } from '@/lib/products-db'
import { absoluteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
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
    ...products.map((p) => ({ url: absoluteUrl(p.href) })),
    ...articles.map((a) => ({
      url: absoluteUrl(a.href),
      lastModified: a.updatedAt ?? a.publishedAt,
    })),
  ]
}
