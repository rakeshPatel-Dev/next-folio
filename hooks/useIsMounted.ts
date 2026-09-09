"use client"

import { useSyncExternalStore } from "react"

/**
 * Returns `false` during server render and the first client render, then `true`
 * after hydration. Use it to defer client-only UI (e.g. theme-aware markup)
 * without calling setState from an effect.
 */
export function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}