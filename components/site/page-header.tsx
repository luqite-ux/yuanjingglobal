import { Breadcrumbs, type Crumb } from '@/components/site/breadcrumbs'

interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  crumbs?: Crumb[]
  children?: React.ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-ivory">
      <div className="container-page pb-16 pt-6 lg:pb-24">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display-xl mt-5 text-balance text-ink">{title}</h1>
          </div>
          {lead && (
            <div className="max-w-xl text-lg leading-relaxed text-slate lg:col-span-4">
              {lead}
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  )
}
