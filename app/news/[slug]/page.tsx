import Image from 'next/image'
import { notFound } from 'next/navigation'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { CtaBand } from '@/components/site/cta-band'
import { getPublishedArticle } from '@/lib/articles-db'
import { buildMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return []
}
export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = await getPublishedArticle(slug)
  if (!article) return {}
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: article.href,
    image: article.image,
    type: 'article',
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getPublishedArticle(slug)
  if (!article) notFound()
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
    { name: article.title, path: article.href },
  ]
  return (
    <>
      <JsonLd data={[articleJsonLd(article), breadcrumbJsonLd(crumbs)]} />
      <article className="bg-paper">
        <header className="border-b border-line bg-ivory">
          <div className="container-page pb-14 pt-6">
            <Breadcrumbs items={crumbs} />
            <time dateTime={article.publishedAt} className="mt-10 block text-sm text-slate">
              {article.publishedAt}
            </time>
            <h1 className="display-xl mt-4 max-w-4xl text-balance text-ink">{article.title}</h1>
          </div>
        </header>
        <div className="container-page max-w-3xl py-14">
          {article.image && (
            <Image
              src={article.image.src}
              alt={article.image.alt}
              width={article.image.width}
              height={article.image.height}
              className="mb-10 h-auto w-full"
            />
          )}
          <div className="space-y-6 text-lg leading-relaxed text-ink">
            {article.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <CtaBand title="Questions about this topic?" text="Send us a note and we will reply by email." />
    </>
  )
}
