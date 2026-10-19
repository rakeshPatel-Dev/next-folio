/**
 * Shared bounds for every tunable cursor-pet setting.
 *
 * Used by both the settings provider (to sanitise values restored from
 * localStorage) and the settings panel (to render sliders), so the two can
 * never drift apart.
 */
export const CURSOR_PET_LIMITS = {
  scale: { min: 0.5, max: 3, step: 0.05 },
  speed: { min: 0.25, max: 5, step: 0.05 },
  reachThreshold: { min: 1, max: 40, step: 1 },
  deadZone: { min: 0, max: 300, step: 5 },
  frameRate: { min: 1, max: 24, step: 1 },
  idleStillMs: { min: 0, max: 10_000, step: 100 },
  idleTransitionMs: { min: 0, max: 2_000, step: 50 },
  idleLoopIntervalMs: { min: 0, max: 2_000, step: 50 },
  autoSleepAfter: { min: 1_000, max: 120_000, step: 500 },
  sleepDuration: { min: 1_000, max: 120_000, step: 500 },
  sleepOpacity: { min: 0.1, max: 1, step: 0.05 },
  sleepScale: { min: 0.5, max: 2, step: 0.05 },
  hitSize: { min: 40, max: 200, step: 2 },
} as const

export type NumericSettingKey = keyof typeof CURSOR_PET_LIMITS

/** Bounds for the manual sleep-spot coordinates (px from the viewport edges). */
export const SLEEP_POSITION_LIMITS = { min: 0, max: 4_000, step: 10 } as const

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
