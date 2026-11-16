'use client'

import { useEffect, useRef, useState } from 'react'

type RevealState = 'visible' | 'hidden'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<RevealState>('visible')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    if (rect.bottom <= 0 || rect.top < window.innerHeight * 0.92) return

    setState('hidden')

    const show = () => {
      setState('visible')
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show()
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const onScroll = () => {
      if (el.getBoundingClientRect().bottom < 0) show()
    }
    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={className}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
