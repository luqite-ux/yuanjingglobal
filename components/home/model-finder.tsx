'use client'

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { ProductStage } from '@/components/products/product-stage'
import { ButtonLink } from '@/components/site/button-link'
import { referenceLabels, type ProductView } from '@/lib/data/products'
import { cn } from '@/lib/utils'

type Field = 'all' | keyof typeof referenceLabels | 'vehicle'

const filters: { value: Field; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'fmsi', label: 'FMSI' },
  { value: 'oe', label: 'OE' },
  { value: 'wva', label: 'WVA' },
  { value: 'trw', label: 'TRW' },
  { value: 'vehicle', label: 'Vehicle' },
]

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

interface Entry {
  field: Exclude<Field, 'all'>
  label: string
  value: string
}

function entriesFor(product: ProductView): Entry[] {
  const entries: Entry[] = []
  for (const key of Object.keys(referenceLabels) as (keyof typeof referenceLabels)[]) {
    for (const value of product.references[key]) {
      entries.push({ field: key, label: referenceLabels[key], value })
    }
  }
  for (const vehicle of product.vehicles) {
    for (const model of vehicle.models) {
      entries.push({
        field: 'vehicle',
        label: 'Vehicle',
        value: `${vehicle.make} ${model}`,
      })
    }
  }
  return entries
}

const MAX_COMPARE = 3

export function ModelFinder({ products }: { products: ProductView[] }) {
  const [query, setQuery] = useState('')
  const [field, setField] = useState<Field>('all')
  const [compare, setCompare] = useState<string[]>([])
  const inputId = useId()
  const statusId = useId()

  const results = useMemo(() => {
    const q = normalize(query)
    return products
      .map((product) => {
        const matches = q
          ? entriesFor(product).filter(
              (entry) =>
                (field === 'all' || entry.field === field) &&
                normalize(entry.value).includes(q),
            )
          : []
        const codeMatch =
          q && (field === 'all' || field === 'fmsi')
            ? normalize(product.code).includes(q)
            : false
        return { product, matches, show: !q || matches.length > 0 || codeMatch }
      })
      .filter((r) => r.show)
  }, [products, query, field])

  const selected = products.filter((p) => compare.includes(p.slug))

  const toggleCompare = (slug: string) =>
    setCompare((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : current.length >= MAX_COMPARE
          ? current
          : [...current, slug],
    )

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-xl">
          <label htmlFor={inputId} className="text-sm font-semibold text-ink">
            Search a reference number or vehicle
          </label>
          <div className="relative mt-2">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. D976, 04465-25040, GDB1583, Hilux"
              autoComplete="off"
              aria-describedby={statusId}
              className="h-14 w-full rounded-sm border border-input bg-paper pl-12 pr-12 text-base text-ink transition-colors placeholder:text-slate/70 hover:border-ink/50 focus-visible:border-yj-blue focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-yj-blue"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-sm text-slate transition-colors hover:text-yj-blue"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div role="group" aria-label="Search within" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={field === f.value}
              onClick={() => setField(f.value)}
              className={cn(
                'inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border px-4 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px',
                field === f.value
                  ? 'border-yj-blue bg-yj-blue text-white'
                  : 'border-input bg-paper text-ink hover:border-yj-blue hover:text-yj-blue',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p
        id={statusId}
        role="status"
        className="mt-5 text-sm text-slate"
      >
        {results.length === 1
          ? '1 model shown'
          : `${results.length} models shown`}
        {compare.length > 0 && ` · ${compare.length} selected to compare`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {results.map(({ product, matches }) => {
            const checked = compare.includes(product.slug)
            const disabled = !checked && compare.length >= MAX_COMPARE
            return (
              <li
                key={product.slug}
                className="group relative grid grid-cols-[6.5rem_1fr] items-center gap-x-5 gap-y-3 py-5 transition-colors duration-150 hover:bg-yj-tint/50 has-[a:focus-visible]:bg-yj-tint/60 sm:grid-cols-[9rem_1fr_auto] sm:gap-x-8"
              >
                <ProductStage
                  image={product.image}
                  sizes="144px"
                  className="size-[6.5rem] sm:size-36"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-2xl text-ink sm:text-3xl">
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {product.code}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-yj-blue transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm tabular-nums text-slate">
                    {product.material} · {product.dimensions}
                  </p>
                  <p className="mt-2 hidden text-sm leading-relaxed text-ink sm:block">
                    {product.fitmentSummary}
                  </p>
                  {matches.length > 0 && (
                    <p className="mt-2 text-xs font-semibold text-yj-blue">
                      Matched {matches.slice(0, 3).map((m) => `${m.label} ${m.value}`).join(' · ')}
                    </p>
                  )}
                </div>
                <label
                  className={cn(
                    'relative z-10 col-span-2 flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border px-3 text-sm font-medium transition-colors sm:col-span-1',
                    checked
                      ? 'border-yj-blue bg-yj-tint text-yj-blue-deep'
                      : 'border-input bg-paper text-ink hover:border-yj-blue',
                    disabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleCompare(product.slug)}
                    className="size-5 accent-[#0a3290]"
                  />
                  Compare
                  <span className="sr-only"> {product.code}</span>
                </label>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="mt-4 border border-dashed border-input bg-paper p-8 text-center">
          <p className="font-display text-2xl text-ink">No listed model matches that number</p>
          <p className="mx-auto mt-3 max-w-md text-slate">
            Send the reference, a vehicle or a sample and we will check it against
            existing molds or quote new tooling.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/contact">Request a Quote</ButtonLink>
          </div>
        </div>
      )}

      {selected.length >= 2 ? (
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h3 className="display-md text-ink">Side-by-side comparison</h3>
            <button
              type="button"
              onClick={() => setCompare([])}
              className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-yj-blue underline-offset-4 hover:underline"
            >
              Clear selection
            </button>
          </div>
          <div className="mt-4 overflow-x-auto border border-line bg-paper">
            <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Comparison of selected backing plate models
              </caption>
              <thead>
                <tr className="border-b border-line bg-mist">
                  <th scope="col" className="p-4 font-semibold text-slate">
                    Specification
                  </th>
                  {selected.map((p) => (
                    <th key={p.slug} scope="col" className="p-4 font-display text-xl font-normal text-ink">
                      <Link href={p.href} className="underline-offset-4 hover:text-yj-blue hover:underline">
                        {p.code}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line align-top">
                {[
                  { label: 'FMSI', get: (p: ProductView) => p.references.fmsi.join(', ') },
                  { label: 'OE', get: (p: ProductView) => p.references.oe.join(', ') },
                  { label: 'WVA', get: (p: ProductView) => p.references.wva.join(', ') },
                  { label: 'TRW', get: (p: ProductView) => p.references.trw.join(', ') },
                  { label: 'Material', get: (p: ProductView) => p.material },
                  { label: 'Dimensions', get: (p: ProductView) => p.dimensions },
                  { label: 'MOQ', get: (p: ProductView) => p.moqLabel },
                  { label: 'Fitment', get: (p: ProductView) => p.fitmentSummary },
                ].map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="p-4 font-semibold text-slate">
                      {row.label}
                    </th>
                    {selected.map((p) => (
                      <td key={p.slug} className="p-4 tabular-nums text-ink">
                        {row.get(p) || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        compare.length === 1 && (
          <p className="mt-6 text-sm text-slate">
            Select one more model to compare references, dimensions and fitment side by side. Up to three can be compared.
          </p>
        )
      )}
    </div>
  )
}
