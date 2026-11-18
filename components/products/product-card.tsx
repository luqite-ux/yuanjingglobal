import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProductStage } from '@/components/products/product-stage'
import type { ProductView } from '@/lib/data/products'

export function ProductCard({ product }: { product: ProductView }) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-paper transition-[border-color,box-shadow] duration-200 hover:border-yj-blue/60 hover:shadow-[0_12px_32px_-18px_rgba(10,50,144,0.45)] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-yj-blue">
      <ProductStage
        image={product.image}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
        className="transition-transform duration-300 [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col gap-3 border-t border-line p-5">
        <h3 className="font-display text-2xl text-ink">
          <Link
            href={product.href}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {product.code}
          </Link>
        </h3>
        <p className="text-sm tabular-nums text-slate">
          {product.material} · {product.dimensions}
        </p>
        <p className="text-sm leading-relaxed text-slate">
          {product.fitmentSummary}
        </p>
        <span className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-2 text-sm font-semibold text-yj-blue">
          View specifications
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  )
}
