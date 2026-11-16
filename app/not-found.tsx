import { ButtonLink } from '@/components/site/button-link'

export default function NotFound() {
  return (
    <section className="bg-ivory py-28">
      <div className="container-page">
        <p className="eyebrow">404</p>
        <h1 className="display-xl mt-4 max-w-3xl text-balance text-ink">
          That page is not here
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate">
          The link may be out of date. Search the model range or return home.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products">Browse Models</ButtonLink>
          <ButtonLink href="/" variant="outline" arrow={false}>
            Home
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
