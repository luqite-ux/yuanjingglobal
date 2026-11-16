import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProductStage } from '@/components/products/product-stage'
import { CtaBand } from '@/components/site/cta-band'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { fetchCategories } from '@/lib/products-db'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Products — Brake Pad Backing Plates',
  description:
    'Browse steel brake pad backing plates by FMSI, OE, WVA and TRW reference, with dimensions, material and vehicle fitment for each model.',
  path: '/products',
})

export const revalidate = 60
export default async function ProductsPage() {
  const categories = await fetchCategories()
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
        lead="One launch category today: stamped Q235B steel backing plates for brake pads."
        crumbs={crumbs}
      />
      <section aria-labelledby="categories-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <h2 id="categories-title" className="sr-only">
            Product categories
          </h2>
          <ul className="grid gap-8">
            {categories.map((category) => (
              <li key={category.slug}>
                <Reveal>
                  <article className="group relative grid border border-line bg-paper transition-[border-color,box-shadow] duration-200 hover:border-yj-blue/60 hover:shadow-[0_12px_32px_-18px_rgba(10,50,144,0.45)] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-yj-blue md:grid-cols-[minmax(0,2fr)_3fr]">
                    <ProductStage
                      image={category.image}
                      sizes="(min-width: 768px) 40vw, 90vw"
                      className="aspect-[4/3]"
                    />
                    <div className="flex flex-col justify-center gap-4 border-t border-line p-8 md:border-l md:border-t-0 lg:p-12">
                      <p className="eyebrow">{category.productCount} launch models</p>
                      <h3 className="display-lg text-ink">
                        <Link
                          href={category.href}
                          className="after:absolute after:inset-0 focus-visible:outline-none"
                        >
                          {category.name}
                        </Link>
                      </h3>
                      <p className="max-w-xl leading-relaxed text-slate">
                        {category.description}
                      </p>
                      <span className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-yj-blue">
                        View all models
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </article>
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
