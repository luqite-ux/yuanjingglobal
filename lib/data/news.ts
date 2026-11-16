import {
  defaultLocale,
  localize,
  type Locale,
  type Localized,
} from '@/lib/i18n'

interface ArticleRecord {
  slug: string
  title: Localized
  excerpt: Localized
  body: Localized<string[]>
  publishedAt: string
  updatedAt?: string
  image?: { src: string; width: number; height: number; alt: Localized }
}

export interface ArticleView {
  slug: string
  href: string
  title: string
  excerpt: string
  body: string[]
  publishedAt: string
  updatedAt?: string
  image?: { src: string; width: number; height: number; alt: string }
}

const articleRecords: ArticleRecord[] = []

function toView(record: ArticleRecord, locale: Locale): ArticleView {
  return {
    slug: record.slug,
    href: `/news/${record.slug}`,
    title: localize(record.title, locale),
    excerpt: localize(record.excerpt, locale),
    body: localize(record.body, locale),
    publishedAt: record.publishedAt,
    updatedAt: record.updatedAt,
    image: record.image
      ? { ...record.image, alt: localize(record.image.alt, locale) }
      : undefined,
  }
}

export function getArticles(locale: Locale = defaultLocale): ArticleView[] {
  return articleRecords
    .map((record) => toView(record, locale))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getArticle(
  slug: string,
  locale: Locale = defaultLocale,
): ArticleView | undefined {
  const record = articleRecords.find((a) => a.slug === slug)
  return record ? toView(record, locale) : undefined
}
