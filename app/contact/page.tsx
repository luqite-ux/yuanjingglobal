import { RfqForm } from '@/components/rfq/rfq-form'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { PageHeader } from '@/components/site/page-header'
import { buildMetadata } from '@/lib/seo'
import { company, fullAddress } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Contact — Request a Quote',
  description:
    'Request a quote for brake pad backing plates or custom metal stamping parts. Send a model number, drawing or sample to Ningbo Yuanjing.',
  path: '/contact',
})

interface Props {
  searchParams: Promise<{ model?: string | string[] }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { model } = await searchParams
  const defaultModel = (Array.isArray(model) ? model[0] : model)?.slice(0, 120) ?? ''
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        eyebrow="Contact"
        title="Request a quote"
        lead="Tell us the model or send a drawing. We reply by email."
        crumbs={crumbs}
      />
      <section aria-label="Quote request" className="bg-paper py-16 lg:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RfqForm variant="full" defaultModel={defaultModel} />
          </div>
          <aside aria-label="Contact details" className="lg:col-span-4 lg:col-start-9">
            <h2 className="display-md text-ink">Direct contact</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              <div className="py-4">
                <dt className="text-sm font-semibold text-slate">Email</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center text-yj-blue underline underline-offset-4">
                    {company.email}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-semibold text-slate">Phone</dt>
                <dd>
                  <a href={company.phoneHref} className="inline-flex min-h-11 items-center text-yj-blue underline underline-offset-4">
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-sm font-semibold text-slate">Address</dt>
                <dd className="mt-1 text-ink">{fullAddress}</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-slate">
              Lead time is typically 15–25 days, depending on quantity and process.
              Prices are quoted by our team for your specification.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
