import Image from 'next/image'

import { ManufacturingStack } from '@/components/home/manufacturing-stack'
import { EquipmentList } from '@/components/home/home-sections'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CtaBand } from '@/components/site/cta-band'
import { Faq } from '@/components/site/faq'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { factoryAreas, faqItems, toolingSteps } from '@/lib/data/company'
import { factoryGallery } from '@/lib/data/factory-gallery'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Capabilities — Presses, Tooling and Production',
  description:
    'A 3,000 m² Ningbo facility with three production lines, 1,000+ backing-plate molds, automatic blanking, deburring and shot blasting, and drawing-based mold development.',
  path: '/capabilities',
})

export default function CapabilitiesPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Capabilities', path: '/capabilities' },
  ]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Capabilities"
        title="Presses, molds and finishing for steel backing plates"
        lead="A 3,000 m² facility with three production lines and a stated capacity of 1,000,000 pieces per month."
        crumbs={crumbs}
      />

      <section aria-labelledby="equipment-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="equipment-title" eyebrow="Equipment" title="Production equipment at a glance">
              <p>Press tonnage from 16 to 200 tons, plus automatic punching, chamfering, deburring and shot blasting.</p>
            </SectionHeading>
            <figure className="mt-8 overflow-hidden border border-line bg-mist">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/facility/press-hall.webp"
                  alt="Yuanjing press hall with hydraulic and high-precision stamping equipment"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-line px-4 py-3 text-sm text-slate">
                Press hall · Ningbo production facility
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={80}>
            <EquipmentList />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="areas-title" className="border-y border-line bg-mist py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading id="areas-title" eyebrow="Facility layout" title="Six working areas across three lines" />
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {factoryAreas.map((area, index) => (
              <li key={area} className="flex items-baseline gap-4 bg-paper p-6">
                <span className="font-display text-2xl tabular-nums text-yj-blue">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-lg text-ink">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading id="process-title" eyebrow="Process" title="Follow a plate through the plant" />
          </Reveal>
          <div className="mt-12">
            <ManufacturingStack />
          </div>
        </div>
      </section>

      <section aria-labelledby="tooling-flow-title" className="border-t border-line bg-ivory py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading id="tooling-flow-title" eyebrow="Tooling and OEM/ODM" title="Drawing-based development" />
          </Reveal>
          <ol className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {toolingSteps.map((step, index) => (
              <li key={step.title} className="bg-paper p-6 lg:p-8">
                <span className="font-display text-3xl tabular-nums text-yj-blue">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-slate">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="factory-gallery-title" className="border-t border-line bg-paper py-16 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading id="factory-gallery-title" eyebrow="Inside the factory" title="Production floor, equipment and handling areas">
              <p>Walk through the press shop, tooling storage, finishing equipment and material-handling areas used for backing-plate production.</p>
            </SectionHeading>
          </Reveal>
          <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {factoryGallery.slice(0, 9).map((image) => (
              <li key={image.src} className="mb-5 break-inside-avoid overflow-hidden border border-line bg-mist">
                <Image src={image.src} alt={image.alt} width={1200} height={650} sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="h-auto w-full" />
                <p className="border-t border-line px-4 py-3 text-sm text-slate"><span className="font-semibold text-ink">{image.group}</span> · {image.title}</p>
              </li>
            ))}
          </ul>
          <details className="group mt-8 border-y border-line py-5">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-yj-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yj-blue">
              View 14 more factory photographs
              <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {factoryGallery.slice(9).map((image) => (
                <li key={image.src} className="mb-5 break-inside-avoid overflow-hidden border border-line bg-mist">
                  <Image src={image.src} alt={image.alt} width={1200} height={650} sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw" className="h-auto w-full" />
                  <p className="border-t border-line px-4 py-3 text-sm text-slate"><span className="font-semibold text-ink">{image.group}</span> · {image.title}</p>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line bg-paper py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow="Questions" title="Before you request a quote" />
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqItems} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a drawing or a sample?"
        text="Share it and tell us the quantity you expect."
      />
    </>
  )
}
