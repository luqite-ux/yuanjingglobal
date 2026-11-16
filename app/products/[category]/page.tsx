import { notFound } from 'next/navigation'
import { ModelFinder } from '@/components/home/model-finder'
import { ProductCard } from '@/components/products/product-card'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CtaBand } from '@/components/site/cta-band'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { categorySlug, getCategory, getProducts } from '@/lib/data/products'
import { buildMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return [{ category: categorySlug }]
}

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return buildMetadata({
    title: `${category.name} — Steel Backing Plates by Model`,
    description: category.description,
    path: category.href,
    image: category.image,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()
  const products = getProducts()
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: category.name, path: category.href },
  ]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Product category"
        title={category.name}
        lead={category.intro}
        crumbs={crumbs}
      />
      <section aria-labelledby="models-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <h2 id="models-title" className="display-lg text-ink">
            All models
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <li key={product.slug}>
                <Reveal delay={(index % 3) * 60} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="finder-title" className="border-t border-line bg-ivory py-16 lg:py-24">
        <div className="container-page">
          <h2 id="finder-title" className="display-md mb-8 text-ink">
            Search by reference or vehicle
          </h2>
          <ModelFinder products={products} />
        </div>
      </section>
      <CtaBand
        title="Request a quote for any listed model"
        text="Include the model or cross-reference and your expected quantity."
      />
    </>
  )
}
