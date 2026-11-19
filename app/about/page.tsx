import { FacilityImage } from '@/components/home/home-sections'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CtaBand } from '@/components/site/cta-band'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/site/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { factStats } from '@/lib/data/company'
import { buildMetadata } from '@/lib/seo'
import { company, fullAddress } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'About Us — Ningbo Yuanjing Automotive Parts',
  description:
    'NINGBO YUANJING AUTOMOTIVE PARTS CO., LTD. was established in 2017 and manufactures brake pad backing plates and custom metal stamping parts in Ningbo, China.',
  path: '/about',
})

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
  ]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="About us"
        title="Steel stamping for brake systems, made in Ningbo"
        lead={`${company.legalName} was established in ${company.founded}.`}
        crumbs={crumbs}
      />

      <section aria-labelledby="profile-title" className="bg-paper py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHeading id="profile-title" eyebrow="Company profile" title="What we make and how we work">
              <p>
                We manufacture automotive brake pad backing plates and custom
                metal stamping parts. An existing library of backing-plate
                molds shortens the path for common designs, and drawing-based
                mold development covers the rest.
              </p>
              <p className="mt-4">
                We support sampling and OEM/ODM production, and our quality
                management operates under ISO 9001.
              </p>
              <p className="mt-4">
                The company serves buyers in the Middle East, Europe and Africa,
                while also supporting selected domestic automotive programs.
              </p>
            </SectionHeading>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={80}>
            <FacilityImage
              src="/images/facility/facility-entrance.png"
              width={1773}
              height={887}
              alt="Entrance of Building 24 with a brass nameplate, opening onto a press hall"
              caption="Building 24, Yida Science and Innovation City"
            />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="verification-title" className="border-y border-line bg-paper py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="verification-title" eyebrow="Company verification" title="Registration and quality management" />
          </div>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            <article className="bg-paper p-6 lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yj-blue">Business registration</p>
              <h3 className="mt-4 font-display text-3xl text-ink">Registered in Ningbo</h3>
              <p className="mt-3 leading-relaxed text-slate">
                The registered legal entity is {company.legalName}, established in 2017. Use this full company name for supplier onboarding and quotation documents.
              </p>
            </article>
            <article className="bg-paper p-6 lg:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-yj-blue">Quality management</p>
              <h3 className="mt-4 font-display text-3xl text-ink">ISO 9001 system</h3>
              <p className="mt-3 leading-relaxed text-slate">
                Yuanjing states that its quality management operates under ISO 9001. Confirm the scope and documents required for your vendor qualification when requesting a quote.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section aria-label="Company figures" className="border-y border-line bg-mist py-16 lg:py-20">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-5">
            {factStats.map((stat) => (
              <div key={stat.label} className="bg-paper p-5 lg:p-6">
                <dd className="font-display text-3xl tabular-nums text-ink lg:text-4xl">{stat.value}</dd>
                <dt className="mt-2 text-sm text-slate">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="bg-ivory py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="visit-title" eyebrow="Location" title="Where to find us" />
          </div>
          <dl className="divide-y divide-line border-y border-line lg:col-span-7">
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate">Company</dt>
              <dd className="text-ink">{company.legalName}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate">Address</dt>
              <dd className="text-ink">{fullAddress}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate">Email</dt>
              <dd>
                <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center text-yj-blue underline underline-offset-4">
                  {company.email}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-slate">Phone</dt>
              <dd>
                <a href={company.phoneHref} className="inline-flex min-h-11 items-center text-yj-blue underline underline-offset-4">
                  {company.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand
        title="Talk to the team about your next part"
        text="Send a model number, drawing or sample."
      />
    </>
  )
}
