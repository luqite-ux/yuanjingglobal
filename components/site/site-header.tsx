'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ButtonLink } from '@/components/site/button-link'
import { company, navItems, quoteLink } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/92 backdrop-blur-md">
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${company.legalName} — Home`}
          className="flex min-h-11 items-center gap-3"
        >
          <span className="relative block h-[50px] w-[88px] shrink-0 overflow-hidden">
            <Image
              src={company.logo.src}
              alt=""
              width={88}
              height={88}
              priority
              className="absolute left-0 top-1/2 size-[88px] max-w-none -translate-y-1/2 object-contain"
            />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg tracking-tight text-ink">
              Yuanjing
            </span>
            <span className="block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-slate">
              Automotive Parts
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors duration-150 after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-yj-blue after:transition-transform after:duration-200 hover:text-yj-blue hover:after:scale-x-100',
                      active ? 'text-yj-blue after:scale-x-100' : 'text-ink',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={quoteLink.href}
            arrow={false}
            className="hidden lg:inline-flex"
          >
            {quoteLink.label}
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-line bg-paper text-ink transition-colors hover:border-yj-blue hover:text-yj-blue active:bg-yj-tint lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-ivory lg:hidden"
      >
        <ul className="container-page divide-y divide-line py-2">
          {[...navItems, quoteLink].map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-14 items-center justify-between text-lg transition-colors hover:text-yj-blue active:bg-yj-tint',
                    active ? 'font-semibold text-yj-blue' : 'text-ink',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <noscript>
        <nav
          aria-label="Primary fallback"
          className="border-t border-line bg-ivory lg:hidden"
        >
          <ul className="container-page flex flex-wrap gap-x-5 py-2">
            {[...navItems, quoteLink].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>
    </header>
  )
}
