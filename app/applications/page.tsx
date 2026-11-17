import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CtaBand } from '@/components/site/cta-band'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { getVehicleFamilies } from '@/lib/data/products'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Applications — Vehicle Fitment for Backing Plates',
  description:
    'Vehicle families covered by the current backing plate catalog: Toyota, Lexus, Jinbei, Foton, Ford, Mazda, Volvo, Great Wall, Hyundai and Kia.',
  path: '/applications',
})

export default function ApplicationsPage() {
  const families = getVehicleFamilies()
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Applications', path: '/applications' },
  ]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Applications"
        title="Find the plate by the vehicle it fits"
        lead="Passenger cars, light commercial vehicles and SUVs from Japanese, Chinese, Korean, American and European brands."
        crumbs={crumbs}
      />
      <section aria-labelledby="families-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <h2 id="families-title" className="sr-only">Vehicle families</h2>
          <ul className="divide-y divide-line border-y border-line">
            {families.map((family) => (
              <li key={family.make}>
                <Reveal>
                  <div className="grid gap-4 py-8 lg:grid-cols-12 lg:items-start">
                    <h3 className="font-display text-4xl text-ink lg:col-span-3">{family.make}</h3>
                    <p className="text-lg leading-relaxed text-slate lg:col-span-5">
                      {family.models.join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
                      {family.products.map((p) => (
                        <Link
                          key={p.code}
                          href={p.href}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-input bg-paper px-4 text-sm font-semibold text-yj-blue transition-[background-color,border-color] duration-150 hover:border-yj-blue hover:bg-yj-tint active:bg-[#d3dcf0]"
                        >
                          {p.code}
                          <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand
        title="Your vehicle is not on the list?"
        text="Send the vehicle, a reference number or a sample. Existing molds may already cover it, and new tooling can be developed from a drawing."
      />
    </>
  )
}
