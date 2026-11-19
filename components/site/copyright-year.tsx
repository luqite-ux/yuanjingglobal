'use client'

import { useSyncExternalStore } from 'react'

export function CopyrightYear({ initialYear }: { initialYear: number }) {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => initialYear,
  )
  return <>{year}</>
}
