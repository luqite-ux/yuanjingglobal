import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { ButtonLink } from '@/components/site/button-link'
import { PageHeader } from '@/components/site/page-header'
import { getPublishedArticles } from '@/lib/articles-db'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'News',
  description:
    'Company news and product updates from Ningbo Yuanjing Automotive Parts.',
  path: '/news',
})

export const revalidate = 60
export default async function NewsPage() {
  const articles = await getPublishedArticles()
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'News', path: '/news' },
  ]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="News"
        title="Updates from the plant"
        crumbs={crumbs}
      />
      <section aria-label="Articles" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          {articles.length === 0 ? (
            <div className="mx-auto max-w-xl border border-dashed border-input p-10 text-center">
              <Newspaper aria-hidden="true" className="mx-auto size-8 text-yj-blue" />
              <h2 className="display-md mt-5 text-ink">No articles published yet</h2>
              <p className="mt-3 leading-relaxed text-slate">
                Company news will appear here. In the meantime, browse the model
                range or send us a question.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/products">Browse Models</ButtonLink>
                <ButtonLink href="/contact" variant="outline" arrow={false}>
                  Contact us
                </ButtonLink>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {articles.map((article) => (
                <li key={article.slug} className="py-6">
                  <time dateTime={article.publishedAt} className="text-sm text-slate">
                    {article.publishedAt}
                  </time>
                  <h2 className="display-md mt-2 text-ink">
                    <Link href={article.href} className="underline-offset-4 hover:text-yj-blue hover:underline">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-2xl text-slate">{article.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
