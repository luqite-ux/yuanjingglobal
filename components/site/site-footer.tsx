import Image from 'next/image'
import Link from 'next/link'
import { CopyrightYear } from '@/components/site/copyright-year'
import { getProducts } from '@/lib/data/products'
import { categorySlug } from '@/lib/data/products'
import { company, fullAddress, navItems, quoteLink } from '@/lib/site'

const linkClass =
  'inline-flex min-h-11 items-center text-sm text-slate underline-offset-4 transition-colors hover:text-yj-blue hover:underline'

export function SiteFooter() {
  const products = getProducts()
  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link
            href="/"
            aria-label={`${company.legalName} — Home`}
            className="inline-flex min-h-11 items-center"
          >
            <span className="relative block h-[62px] w-[110px] overflow-hidden">
              <Image
                src={company.logo.src}
                alt=""
                width={110}
                height={110}
                className="absolute left-0 top-1/2 size-[110px] max-w-none -translate-y-1/2 object-contain"
              />
            </span>
          </Link>
          <p className="mt-4 text-sm font-semibold text-ink">
            {company.legalName}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
            Brake pad backing plates and custom metal stamping parts, made in
            Ningbo since {company.founded}.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-3">
            {[...navItems, quoteLink].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product models" className="lg:col-span-3">
          <h2 className="eyebrow">Backing plate models</h2>
          <ul className="mt-3">
            <li>
              <Link href={`/products/${categorySlug}`} className={linkClass}>
                All brake pad backing plates
              </Link>
            </li>
            {products.map((product) => (
              <li key={product.slug}>
                <Link href={product.href} className={linkClass}>
                  {product.code}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic lg:col-span-3">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={`mailto:${company.email}`} className={linkClass}>
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className={linkClass}>
                {company.phone}
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            {fullAddress}
          </p>
        </address>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 text-sm text-slate">
          © <CopyrightYear initialYear={new Date().getFullYear()} />{' '}
          {company.legalName} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
