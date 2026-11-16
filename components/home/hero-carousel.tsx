'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { ButtonLink } from '@/components/site/button-link'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface Slide {
  id: string
  src: string
  alt: string
  eyebrow: string
  title: string
  body: string
  cta: { label: string; href: string }
  tone: 'dark' | 'light'
  side: 'left' | 'right'
  mobilePosition: string
  scrim: string
}

const slides: Slide[] = [
  {
    id: 'model-discovery',
    src: '/images/hero/hero-model-discovery.jpg',
    alt: 'Rows of steel brake pad backing plates on a brushed metal surface, fading into a blue gradient',
    eyebrow: 'Model discovery',
    title: 'Backing Plates Identified by the Numbers Buyers Use',
    body: 'Search by FMSI, OE, WVA or TRW reference and open the dimensions, material and fitment for each steel substrate.',
    cta: { label: 'Browse Models', href: '/products' },
    tone: 'dark',
    side: 'right',
    mobilePosition: 'object-[28%_50%]',
    scrim:
      'lg:bg-[radial-gradient(ellipse_at_center,rgba(8,30,80,0.72)_0%,rgba(8,30,80,0.55)_55%,rgba(8,30,80,0)_78%)]',
  },
  {
    id: 'fit-stability',
    src: '/images/hero/hero-fit-stability.jpg',
    alt: 'Stack of steel backing plates on a metal measuring plate beside a caliper and dial gauge on a light studio surface',
    eyebrow: 'Dimensions and assembly',
    title: 'Steel Substrates Built Around Fit and Stability',
    body: 'Compare overall dimensions, Q235B material and vehicle fitment before you request a quote.',
    cta: { label: 'Review Specifications', href: '/products' },
    tone: 'light',
    side: 'left',
    mobilePosition: 'object-[70%_50%]',
    scrim:
      'lg:bg-[radial-gradient(ellipse_at_center,rgba(247,246,242,0.88)_0%,rgba(247,246,242,0.7)_55%,rgba(247,246,242,0)_78%)]',
  },
  {
    id: 'tooling',
    src: '/images/hero/hero-tooling.jpg',
    alt: 'Mold tooling assemblies with a blue highlight standing on engineering drawings of backing plates',
    eyebrow: 'Mold development',
    title: 'From Tooling Development to Repeat Production',
    body: 'Share a drawing and we develop the mold, sample the part and move into repeat OEM/ODM production.',
    cta: { label: 'Discuss a Drawing', href: '/contact' },
    tone: 'dark',
    side: 'left',
    mobilePosition: 'object-[78%_50%]',
    scrim:
      'lg:bg-[radial-gradient(ellipse_at_center,rgba(10,32,84,0.5)_0%,rgba(10,32,84,0.3)_55%,rgba(10,32,84,0)_78%)]',
  },
]

const SLIDE_MS = 7500

export function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const touchStart = useRef<number | null>(null)

  const autoplay = !userPaused && !reduced && !hovered && !focused

  useEffect(() => {
    if (!autoplay) return
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      SLIDE_MS,
    )
    return () => window.clearTimeout(id)
  }, [autoplay, active])

  const go = (index: number) =>
    setActive((index + slides.length) % slides.length)

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label="Featured capabilities"
      className="relative bg-ivory"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocused(false)
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return
        const delta = event.changedTouches[0].clientX - touchStart.current
        touchStart.current = null
        if (Math.abs(delta) > 50) go(active + (delta < 0 ? 1 : -1))
      }}
    >
      <h1 className="sr-only">
        NINGBO YUANJING AUTOMOTIVE PARTS CO., LTD. — brake pad backing plates and
        custom metal stamping parts
      </h1>

      <div
        className="grid touch-pan-y"
        aria-live={autoplay ? 'off' : 'polite'}
      >
        {slides.map((slide, index) => {
          const isActive = index === active
          const dark = slide.tone === 'dark'
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={cn(
                'hero-slide relative col-start-1 row-start-1 flex flex-col lg:block lg:h-[clamp(540px,41.7vw,760px)]',
                isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0',
              )}
            >
              <div className="relative aspect-[16/10] w-full sm:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={cn(
                    'object-cover lg:object-center',
                    slide.mobilePosition,
                  )}
                />
              </div>

              <div className="lg:absolute lg:inset-0 lg:flex lg:items-center">
                <div className="container-page w-full pb-4 pt-8 lg:py-0">
                  <div
                    className={cn(
                      'lg:w-[44%] lg:max-w-[40rem] lg:p-10 lg:-m-10',
                      slide.side === 'right' && 'lg:ml-auto',
                      slide.scrim,
                      dark && 'on-dark',
                    )}
                  >
                    <p
                      className={cn(
                        'eyebrow',
                        dark && 'lg:!text-white/90',
                      )}
                    >
                      {slide.eyebrow}
                    </p>
                    <h2
                      className={cn(
                        'mt-4 text-balance font-display text-[clamp(2.25rem,3.9vw,4.25rem)] font-normal leading-[1.03] tracking-[-0.015em]',
                        dark ? 'text-ink lg:text-white' : 'text-ink',
                      )}
                    >
                      {slide.title}
                    </h2>
                    <p
                      className={cn(
                        'mt-5 max-w-md text-base leading-relaxed lg:text-lg',
                        dark ? 'text-slate lg:text-white/95' : 'text-slate lg:text-ink',
                      )}
                    >
                      {slide.body}
                    </p>
                    <div className="mt-7">
                      <ButtonLink
                        href={slide.cta.href}
                        variant={dark ? 'primary' : 'primary'}
                        className={cn(
                          dark &&
                            'lg:border-white lg:bg-white lg:text-yj-blue lg:hover:bg-yj-tint',
                        )}
                      >
                        {slide.cta.label}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative z-20 lg:absolute lg:inset-x-0 lg:bottom-6">
        <div className="container-page flex items-center gap-2 pb-8 pt-2 lg:pb-0 lg:pt-0">
          <div className="flex items-center gap-1 rounded-sm border border-line bg-paper/95 p-1 shadow-sm lg:backdrop-blur">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous slide"
              className="inline-flex size-11 items-center justify-center rounded-sm text-ink transition-colors hover:bg-yj-tint hover:text-yj-blue active:bg-[#d3dcf0]"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <div role="group" aria-label="Choose slide" className="flex">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => go(index)}
                  aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
                  aria-current={index === active}
                  className="group/dot inline-flex size-11 items-center justify-center"
                >
                  <span
                    className={cn(
                      'block h-1.5 rounded-full transition-all duration-300 group-hover/dot:bg-yj-sky',
                      index === active
                        ? 'w-8 bg-yj-blue'
                        : 'w-3 bg-ink/30',
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next slide"
              className="inline-flex size-11 items-center justify-center rounded-sm text-ink transition-colors hover:bg-yj-tint hover:text-yj-blue active:bg-[#d3dcf0]"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            {!reduced && (
              <button
                type="button"
                onClick={() => setUserPaused((v) => !v)}
                aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
                className="inline-flex size-11 items-center justify-center rounded-sm border-l border-line text-ink transition-colors hover:bg-yj-tint hover:text-yj-blue active:bg-[#d3dcf0]"
              >
                {userPaused ? (
                  <Play aria-hidden="true" className="size-4" />
                ) : (
                  <Pause aria-hidden="true" className="size-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
