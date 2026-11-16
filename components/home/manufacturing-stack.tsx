'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { processSteps, type ProcessStep } from '@/lib/data/company'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface ManufacturingStackProps {
  stepIds?: string[]
}

export function ManufacturingStack({ stepIds }: ManufacturingStackProps) {
  const steps: ProcessStep[] = stepIds
    ? processSteps.filter((s) => stepIds.includes(s.id))
    : processSteps
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const enhanced = wide && !reduced
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (!enhanced) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [enhanced, steps.length])

  return (
    <div className={cn(enhanced && 'grid grid-cols-12 gap-12')}>
      {enhanced && (
        <div className="col-span-7">
          <div className="sticky top-24 h-[min(72vh,34rem)]">
            <div className="relative size-full overflow-hidden border border-line bg-mist">
              {steps.map((step, index) => (
                <Image
                  key={step.id}
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="55vw"
                  aria-hidden={index !== activeIndex}
                  className={cn(
                    'object-cover transition-opacity duration-500',
                    index === activeIndex ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
            </div>
            <p className="mt-3 text-sm text-slate">
              <span className="tabular-nums font-semibold text-yj-blue">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>{' '}
              {steps[activeIndex]?.caption} · Representative facility photography
            </p>
          </div>
        </div>
      )}

      <ol
        className={cn(
          enhanced ? 'col-span-5' : 'grid gap-14',
        )}
      >
        {steps.map((step, index) => (
          <li
            key={step.id}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            data-index={index}
            className={cn(enhanced && 'flex min-h-[clamp(18rem,38vh,25rem)] items-center')}
          >
            <div>
              {!enhanced && (
                <figure className="mb-6 border border-line bg-mist">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      sizes="(min-width: 640px) 90vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-line px-4 py-2 text-xs text-slate">
                    {step.caption} · Representative facility photography
                  </figcaption>
                </figure>
              )}
              <p className="eyebrow tabular-nums">
                Step {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="display-md mt-3 text-balance text-ink">{step.title}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-slate">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
