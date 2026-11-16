import { ButtonLink } from '@/components/site/button-link'

interface CtaBandProps {
  title: string
  text: string
  href?: string
  label?: string
}

export function CtaBand({
  title,
  text,
  href = '/contact',
  label = 'Request a Quote',
}: CtaBandProps) {
  return (
    <section aria-label={title} className="border-t border-line bg-mist">
      <div className="container-page grid gap-8 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-8">
          <h2 className="display-md text-balance text-ink">{title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate">{text}</p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <ButtonLink href={href}>{label}</ButtonLink>
        </div>
      </div>
    </section>
  )
}
