import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProductCard } from '@/components/products/product-card'
import { CtaBand } from '@/components/site/cta-band'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { fetchCategories, fetchProductsData } from '@/lib/products-db'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Products — Brake Pad Backing Plates',
  description:
    'Browse steel brake pad backing plates by FMSI, OE, WVA and TRW reference, with dimensions, material and vehicle fitment for each model.',
  path: '/products',
})

export const revalidate = 60
export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProductsData(),
  ])
  const primaryCategory = categories[0]
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Products"
        title="Backing plates, organized by the numbers you search"
        lead="Stamped Q235B steel backing plates organized by reference number, dimensions and vehicle fitment."
        crumbs={crumbs}
      />
      <section aria-labelledby="models-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">{products.length} catalog models</p>
              <h2 id="models-title" className="display-lg mt-3 text-ink">
                {primaryCategory?.name ?? 'Brake Pad Backing Plates'}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate">
                {primaryCategory?.description ?? 'Compare model dimensions, reference numbers and vehicle fitment.'}
              </p>
            </div>
            {primaryCategory && (
              <Link
                href={primaryCategory.href}
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-yj-blue underline decoration-yj-blue/30 underline-offset-4 hover:decoration-yj-blue"
              >
                Search and compare
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            )}
          </div>
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
      <CtaBand
        title="Need a plate that is not listed?"
        text="Send a drawing or a sample. We develop the mold, sample the part and move into OEM/ODM production."
      />
    </>
  )
}
