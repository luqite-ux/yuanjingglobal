import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ManufacturingStack } from '@/components/home/manufacturing-stack'
import { ModelFinder } from '@/components/home/model-finder'
import { RfqForm } from '@/components/rfq/rfq-form'
import { ButtonLink } from '@/components/site/button-link'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { YuanjingPrecisionScene } from '@/components/three/yuanjing-precision-scene'
import { equipment, factStats, toolingSteps } from '@/lib/data/company'
import { getVehicleFamilies } from '@/lib/data/products'
import { fetchProductsData } from '@/lib/products-db'
import { company, fullAddress } from '@/lib/site'
import { cn } from '@/lib/utils'

export async function FinderSection() {
  const products = await fetchProductsData()
  return (
    <section id="model-finder" aria-labelledby="model-finder-title" className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="model-finder-title"
            eyebrow="Model finder"
            title="Start with the number on your list"
          >
            <p>
              Search FMSI, OE, WVA and TRW references or a vehicle name. Select up
              to three models to compare dimensions and fitment side by side.
            </p>
          </SectionHeading>
        </Reveal>
        <Reveal className="mt-12" delay={80}>
          <ModelFinder products={products} />
        </Reveal>
      </div>
    </section>
  )
}

export async function ApplicationsSection() {
  const products = await fetchProductsData()
  const fallbackFamilies = getVehicleFamilies()
  const families = fallbackFamilies.map(family => ({ ...family, products: family.products.filter(item => products.some(product => product.code === item.code)) }))
  return (
    <section id="applications" aria-labelledby="applications-title" className="bg-ivory py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="applications-title"
            eyebrow="Applications"
            title="Find the backing plate by vehicle family"
          >
            <p>
              Each family links straight to the backing plate model listed for it.
              Check the model page for the exact fitment and reference numbers.
            </p>
          </SectionHeading>
        </Reveal>
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family, index) => (
            <li
              key={family.make}
              className={cn(
                'bg-paper',
                index === families.length - 1 && 'lg:col-span-3',
              )}
            >
              <Reveal delay={index * 50} className="h-full">
                <div
                  className={cn(
                    'flex h-full flex-col p-6 lg:p-8',
                    index === families.length - 1 &&
                      'lg:grid lg:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.6fr)_auto] lg:items-center lg:gap-10',
                  )}
                >
                  <h3 className="font-display text-3xl text-ink">{family.make}</h3>
                  <p
                    className={cn(
                      'mt-3 flex-1 leading-relaxed text-slate',
                      index === families.length - 1 && 'lg:mt-0',
                    )}
                  >
                    {family.models.join(', ')}
                  </p>
                  <div
                    className={cn(
                      'mt-6 flex flex-wrap gap-2',
                      index === families.length - 1 && 'lg:mt-0 lg:justify-end',
                    )}
                  >
                    {family.products.map((p) => (
                      <Link
                        key={p.code}
                        href={p.href}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-sm border border-input bg-paper px-3.5 text-sm font-semibold text-yj-blue transition-[background-color,border-color] duration-150 hover:border-yj-blue hover:bg-yj-tint active:bg-[#d3dcf0]"
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
        <div className="mt-10">
          <ButtonLink href="/applications" variant="outline">
            See all applications
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export function PrecisionSection() {
  return (
    <section id="precision-scene" aria-labelledby="precision-title" className="border-y border-line bg-mist py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="precision-title"
            eyebrow="Structural support"
            title="A thin plate that has to sit true"
          >
            <p>
              The backing plate carries the friction material and passes caliper
              force across the pad. Outline, hole positions and ear geometry decide
              whether it seats in the bracket, so dimensional control starts with
              the tool.
            </p>
          </SectionHeading>
        </Reveal>
        <div className="mt-12">
          <YuanjingPrecisionScene />
        </div>
      </div>
    </section>
  )
}

export function ManufacturingSection() {
  return (
    <section id="manufacturing" aria-labelledby="manufacturing-title" className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="manufacturing-title"
            eyebrow="Manufacturing"
            title="From sheet steel to finished goods, under one roof"
          />
        </Reveal>
        <div className="mt-12">
          <ManufacturingStack />
        </div>
        <dl className="mt-16 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-5">
          {factStats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'bg-paper p-5 lg:p-6',
                index === factStats.length - 1 && 'col-span-2 lg:col-span-1',
              )}
            >
              <dt className="order-2 mt-2 text-sm text-slate">{stat.label}</dt>
              <dd className="font-display text-3xl tabular-nums text-ink lg:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function ToolingSection() {
  return (
    <section id="tooling" aria-labelledby="tooling-title" className="bg-ivory py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="tooling-title"
            eyebrow="Tooling and OEM/ODM"
            title="Your drawing becomes a mold, then a repeat part"
          >
            <p>
              More than 1,000 backing-plate molds already exist. If your part is
              not among them, we develop tooling from your drawing.
            </p>
          </SectionHeading>
          <div className="mt-8">
            <ButtonLink href="/contact">Discuss a Drawing</ButtonLink>
          </div>
        </Reveal>
        <ol className="divide-y divide-line border-y border-line lg:col-span-7">
          {toolingSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 60}>
                <div className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr]">
                  <span className="font-display text-3xl tabular-nums text-yj-blue">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function QualitySection() {
  return (
    <section id="quality" aria-labelledby="quality-title" className="border-y border-line bg-mist py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <SectionHeading
            id="quality-title"
            eyebrow="Quality"
            title="A dedicated inspection area, and reports on request"
          >
            <p>
              Quality inspection has its own area on the production floor, between
              finishing and the finished-goods area. Tell us which dimensions or
              documents you need and we will confirm what can be provided with your
              samples or order.
            </p>
          </SectionHeading>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={80}>
          <ul className="divide-y divide-line border-y border-line bg-paper">
            {[
              ['Inspection area', 'Separate quality-inspection zone in the facility'],
              ['Dimension checks', 'Specify the dimensions you want reported'],
              ['Reports', 'Available on request with a quote or sample'],
              ['Quality system', 'Operated under ISO 9001 quality management'],
            ].map(([term, detail]) => (
              <li key={term} className="grid gap-1 p-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <span className="text-sm font-semibold text-yj-blue">{term}</span>
                <span className="text-ink">{detail}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function DeliverySection() {
  const items = [
    {
      label: 'Sampling',
      value: 'Before production',
      text: 'New tooling is sampled so fit and dimensions can be reviewed first.',
    },
    {
      label: 'MOQ',
      value: '200 pcs',
      text: 'Listed on four catalog models. The quantity for D1044-7947 is confirmed in the quote.',
    },
    {
      label: 'Lead time',
      value: '15 days',
      text: 'Depends on quantity and process. The date for your order is confirmed in the quote.',
    },
    {
      label: 'Capacity',
      value: '1,000,000 pcs / month',
      text: 'Stated monthly capacity across three production lines.',
    },
  ]
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="bg-paper py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="delivery-title"
            eyebrow="Delivery"
            title="Plan your first order with clear numbers"
          />
        </Reveal>
        <dl className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.label} className="bg-paper p-6 lg:p-8">
              <Reveal delay={index * 50}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-4">
                  <span className="block font-display text-2xl leading-tight text-ink lg:text-3xl">
                    {item.value}
                  </span>
                  <span className="mt-3 block leading-relaxed text-slate">{item.text}</span>
                </dd>
              </Reveal>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function CompanySection() {
  return (
    <section id="company" aria-labelledby="company-title" className="bg-ivory py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <SectionHeading
            id="company-title"
            eyebrow="Company"
            title="A Ningbo stamping plant focused on backing plates"
          >
            <p>
              {company.legalName} was established in {company.founded} in Ningbo,
              China. It manufactures automotive brake pad backing plates and custom
              metal stamping parts.
            </p>
          </SectionHeading>
          <div className="mt-8">
            <ButtonLink href="/about" variant="outline">
              About Yuanjing
            </ButtonLink>
            <a href="/about#company-film" className="ml-4 inline-flex min-h-11 items-center font-semibold text-yj-blue underline underline-offset-4">
              Watch our company film
            </a>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={80}>
          <dl className="divide-y divide-line border-y border-line">
            <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate">Address</dt>
              <dd className="text-ink">{fullAddress}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate">Email</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center text-yj-blue underline underline-offset-4">
                  {company.email}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate">Phone</dt>
              <dd>
                <a href={company.phoneHref} className="inline-flex min-h-11 items-center text-yj-blue underline underline-offset-4">
                  {company.phone}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

export function RfqSection() {
  return (
    <section id="rfq" aria-labelledby="rfq-title" className="border-t border-line bg-paper py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading
            id="rfq-title"
            eyebrow="Request a quote"
            title="Send a model number or a drawing"
          >
            <p>We reply by email. No prices are shown online; each quote is prepared for your quantity and specification.</p>
          </SectionHeading>
          <address className="mt-10 border-y border-line py-2 not-italic">
            <div className="border-b border-line py-5">
              <p className="text-sm font-semibold text-yj-blue">Company</p>
              <p className="mt-2 leading-relaxed text-ink">{company.legalName}</p>
            </div>
            <div className="border-b border-line py-5">
              <p className="text-sm font-semibold text-yj-blue">Address</p>
              <p className="mt-2 leading-relaxed text-slate">{fullAddress}</p>
            </div>
            <div className="grid gap-4 py-5">
              <div>
                <p className="text-sm font-semibold text-yj-blue">Email</p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1 inline-flex min-h-11 items-center break-all text-ink underline decoration-yj-blue/40 underline-offset-4 hover:text-yj-blue"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-yj-blue">Phone</p>
                <a
                  href={company.phoneHref}
                  className="mt-1 inline-flex min-h-11 items-center text-ink underline decoration-yj-blue/40 underline-offset-4 hover:text-yj-blue"
                >
                  {company.phone}
                </a>
              </div>
            </div>
          </address>
        </Reveal>
        <Reveal className="lg:col-span-7 lg:col-start-6" delay={80}>
          <RfqForm variant="short" />
        </Reveal>
      </div>
    </section>
  )
}

export function EquipmentList() {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {equipment.map((row) => (
        <div key={row.item} className="grid grid-cols-[6rem_minmax(0,1fr)] items-baseline gap-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto]">
          <dt className="font-display text-3xl tabular-nums text-yj-blue">{row.count}</dt>
          <dd className="text-ink">{row.item}</dd>
          {row.spec && <dd className="col-start-2 text-sm tabular-nums text-slate sm:col-start-3">{row.spec}</dd>}
        </div>
      ))}
    </dl>
  )
}

export function FacilityImage({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  caption: string
}) {
  return (
    <figure className="border border-line bg-mist">
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
      <figcaption className="border-t border-line px-4 py-2 text-xs text-slate">
        {caption}
      </figcaption>
    </figure>
  )
}
