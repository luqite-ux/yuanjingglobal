'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import type { SceneStep } from '@/components/three/precision-scene-canvas'
import { PrecisionSceneFallback } from '@/components/three/precision-scene-fallback'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils'

const SceneCanvas = dynamic(
  () => import('@/components/three/precision-scene-canvas'),
  { ssr: false },
)

const steps: { label: string; title: string; text: string }[] = [
  {
    label: 'Dimension guides',
    title: 'Overall length and height',
    text: 'Blue guides mark the spans that decide whether a plate seats in the caliper bracket: overall length across the ears and overall height at the arc.',
  },
  {
    label: 'Press-tool relationship',
    title: 'Punch, plate and die',
    text: 'A punch and die pair work the steel sheet. The locating outline shows how the plate position stays repeatable from stroke to stroke. The tool is a simplified generic shape.',
  },
  {
    label: 'Fit check',
    title: 'Holes and ears from the drawing',
    text: 'Hole centers and ear positions are carried from the drawing into the tool, then read against the same reference lines when a sample is checked.',
  },
]

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function YuanjingPrecisionScene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<SceneStep>(0)
  const [load, setLoad] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const compact = useMediaQuery('(max-width: 639px)')

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    let idle = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 1.5) {
          if (!load && webglAvailable()) {
            const start = () => setLoad(true)
            if ('requestIdleCallback' in window) {
              idle = window.requestIdleCallback(start)
            } else {
              idle = (window as Window).setTimeout(start, 120)
            }
          } else if (!webglAvailable()) {
            setFailed(true)
          }
        }
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle)
    }
  }, [load])

  const animated = !reduced && !compact
  const running = animated && visible && !userPaused
  const active = steps[step]

  return (
    <div ref={rootRef} className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <div
          role="img"
          aria-label="Illustrative three-dimensional model of an abstract steel backing plate between a punch and a die, with blue dimension guides. It is not a specific customer product, machine or test result."
          className="relative aspect-[4/3] overflow-hidden border border-line bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#eef1f4_70%)] sm:aspect-[16/10]"
        >
          <PrecisionSceneFallback step={step} />
          {load && !failed && (
            <div
              className={cn(
                'absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#eef1f4_70%)] transition-opacity duration-500',
                ready ? 'opacity-100' : 'opacity-0',
              )}
            >
              <SceneCanvas
                step={step}
                running={running}
                onReady={() => setReady(true)}
                onFailure={() => {
                  setFailed(true)
                  setReady(false)
                }}
              />
            </div>
          )}
          <p className="absolute bottom-3 right-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-slate">
            Illustrative model
          </p>
        </div>
        {animated && load && ready && !failed && (
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-sm font-semibold text-yj-blue transition-colors hover:bg-yj-tint active:bg-[#d3dcf0]"
          >
            {userPaused ? (
              <Play aria-hidden="true" className="size-4" />
            ) : (
              <Pause aria-hidden="true" className="size-4" />
            )}
            {userPaused ? 'Resume animation' : 'Pause animation'}
          </button>
        )}
      </div>

      <div className="lg:col-span-5">
        <div role="group" aria-label="Scene view" className="flex flex-wrap gap-2">
          {steps.map((s, index) => (
            <button
              key={s.label}
              type="button"
              aria-pressed={step === index}
              onClick={() => setStep(index as SceneStep)}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px',
                step === index
                  ? 'border-yj-blue bg-yj-blue text-white'
                  : 'border-input bg-paper text-ink hover:border-yj-blue hover:text-yj-blue',
              )}
            >
              <span className="tabular-nums opacity-70">{index + 1}</span>
              {s.label}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-8">
          <h3 className="display-md text-ink">{active.title}</h3>
          <p className="mt-4 leading-relaxed text-slate">{active.text}</p>
        </div>
        <p className="mt-8 border-t border-line pt-4 text-sm leading-relaxed text-slate">
          This model is a teaching illustration. It does not represent an exact
          customer product, machine or measured result.
        </p>
      </div>
    </div>
  )
}
