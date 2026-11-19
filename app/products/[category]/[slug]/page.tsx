import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/products/product-card'
import { ProductStage } from '@/components/products/product-stage'
import { JsonLd, breadcrumbJsonLd, productJsonLd } from '@/components/seo/json-ld'
import { ButtonLink } from '@/components/site/button-link'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { CtaBand } from '@/components/site/cta-band'
import {
  categorySlug,
  getCategory,
  referenceGroups,
} from '@/lib/data/products'
import { fetchProduct, fetchProductsData } from '@/lib/products-db'
import { buildMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export function generateStaticParams() {
  return []
}
export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params
  const product = await fetchProduct(slug)
  if (!product || category !== categorySlug) return {}
  return buildMetadata({
    title: `${product.code} Brake Pad Backing Plate`,
    description: `${product.code} steel backing plate, ${product.material}, ${product.dimensions}. Fits ${product.fitmentSummary}.`,
    path: product.href,
    image: product.image,
  })
}

export default async function ProductPage({ params }: Props) {
  const { category: categoryParam, slug } = await params
  const product = await fetchProduct(slug)
  const category = getCategory(categoryParam)
  if (!product || !category || product.categorySlug !== category.slug) notFound()

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: category.name, path: category.href },
    { name: product.code, path: product.href },
  ]
  const references = referenceGroups(product)
  const related = (await fetchProductsData()).filter((p) => p.slug !== product.slug)
  const specs = [
    { label: 'Model', value: product.code },
    { label: 'Material', value: product.material },
    { label: 'Overall dimensions', value: product.dimensions },
    { label: 'Minimum order', value: product.moqLabel },
    { label: 'Lead time', value: '15 days for standard orders' },
  ]

  return (
    <>
      <JsonLd data={[productJsonLd(product), breadcrumbJsonLd(crumbs)]} />
      <header className="border-b border-line bg-ivory">
        <div className="container-page py-6">
          <Breadcrumbs items={crumbs} />
        </div>
      </header>

      <section className="bg-paper py-12 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ProductStage
              image={product.image}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="border border-line"
            />
          </div>
          <div className="lg:col-span-6">
            <p className="eyebrow">Brake pad backing plate</p>
            <h1 className="display-xl mt-4 text-balance text-ink">{product.code}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              {product.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/contact?model=${encodeURIComponent(product.code)}`}>
                Request a Quote for {product.code}
              </ButtonLink>
              <ButtonLink href="/products" variant="outline" arrow={false}>
                All models
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="specs-title" className="border-t border-line bg-ivory py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 id="specs-title" className="display-md text-ink">
              Specifications
            </h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {specs.map((row) => (
                <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-slate">{row.label}</dt>
                  <dd className="tabular-nums text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
            {product.dimensionNote && (
              <p className="mt-4 text-sm text-slate">{product.dimensionNote}</p>
            )}
          </div>

          <div className="lg:col-span-6">
            <h2 className="display-md text-ink">Reference numbers</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {references.map((group) => (
                <div key={group.key} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-slate">{group.label}</dt>
                  <dd className="tabular-nums text-ink">{group.values.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="fitment-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <h2 id="fitment-title" className="display-md text-ink">
            Vehicle fitment
          </h2>
          <div className="mt-8 overflow-x-auto border border-line">
            <table className="w-full min-w-[26rem] border-collapse text-left">
              <caption className="sr-only">Vehicle makes and models for {product.code}</caption>
              <thead>
                <tr className="border-b border-line bg-mist text-sm text-slate">
                  <th scope="col" className="p-4 font-semibold">Make</th>
                  <th scope="col" className="p-4 font-semibold">Models</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {product.vehicles.map((v) => (
                  <tr key={v.make}>
                    <th scope="row" className="p-4 font-medium text-ink">{v.make}</th>
                    <td className="p-4 text-ink">{v.models.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
            Confirm model year and caliper type against the reference numbers
            above before ordering. Send us a sample or drawing if you are unsure.
          </p>
        </div>
      </section>

      <section aria-labelledby="related-title" className="border-t border-line bg-ivory py-16 lg:py-24">
        <div className="container-page">
          <h2 id="related-title" className="display-md text-ink">
            Other models
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Ask about ${product.code}`}
        text="Send your quantity and any drawing or sample requirements."
        href={`/contact?model=${encodeURIComponent(product.code)}`}
      />
    </>
  )
}
