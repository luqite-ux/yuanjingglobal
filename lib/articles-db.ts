import { getSupabaseClient } from '@/lib/supabase'
import type { ArticleView } from '@/lib/data/news'

const localized = (value: unknown) => typeof value === 'object' && value ? String((value as Record<string,unknown>).en ?? '') : ''
export async function getPublishedArticles(): Promise<ArticleView[]> {
  const client = getSupabaseClient(); const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!client || !tenantId) return []
  const { data, error } = await client.from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,featured_image,published_at,updated_at').eq('tenant_id', tenantId).eq('is_published', true).order('published_at', { ascending: false })
  if (error || !data) return []
  return data.map(row => ({ slug: row.slug, href: `/news/${row.slug}`, title: localized(row.title_i18n) || row.title || '', excerpt: localized(row.excerpt_i18n) || row.excerpt || '', body: [localized(row.content_i18n) || row.content || ''], publishedAt: row.published_at || row.updated_at, updatedAt: row.updated_at, image: row.featured_image ? { src: row.featured_image, width: 1600, height: 900, alt: localized(row.title_i18n) || row.title || '' } : undefined }))
}
export async function getPublishedArticle(slug: string) { return (await getPublishedArticles()).find(article => article.slug === slug) }
