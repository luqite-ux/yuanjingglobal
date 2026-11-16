import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  name: string
  path: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-slate">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-medium text-ink">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-yj-blue hover:underline"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3.5" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
