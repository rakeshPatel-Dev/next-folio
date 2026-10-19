"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { CURSOR_PET_DEFAULTS, type CursorPetConfig } from "./useCursorPet"
import {
  clamp,
  CURSOR_PET_LIMITS,
  SLEEP_POSITION_LIMITS,
  type NumericSettingKey,
} from "./settings-config"

/** The pet's full config plus a master on/off switch. */
export type CursorPetSettings = CursorPetConfig & { enabled: boolean }

export const DEFAULT_CURSOR_PET_SETTINGS: CursorPetSettings = {
  ...CURSOR_PET_DEFAULTS,
  enabled: true,
}

const STORAGE_KEY = "cursor-pet:settings:v1"

/**
 * Coerce anything (fresh defaults, a partial override, or untrusted JSON from
 * localStorage) into a complete, in-range settings object.
 */
export function sanitizeCursorPetSettings(input: unknown): CursorPetSettings {
  const settings: CursorPetSettings = { ...DEFAULT_CURSOR_PET_SETTINGS }
  if (!input || typeof input !== "object") return settings

  const raw = input as Record<string, unknown>

  for (const key of Object.keys(CURSOR_PET_LIMITS) as NumericSettingKey[]) {
    const value = raw[key]
    if (typeof value === "number" && Number.isFinite(value)) {
      const { min, max } = CURSOR_PET_LIMITS[key]
      settings[key] = clamp(value, min, max)
    }
  }

  for (const key of ["sleepX", "sleepY"] as const) {
    const value = raw[key]
    if (value === null) {
      settings[key] = null
    } else if (typeof value === "number" && Number.isFinite(value)) {
      settings[key] = clamp(value, SLEEP_POSITION_LIMITS.min, SLEEP_POSITION_LIMITS.max)
    }
  }

  if (typeof raw.enabled === "boolean") settings.enabled = raw.enabled

  return settings
}

// ── External store ──────────────────────────────────────────────────────────
// localStorage is an external system, so it is exposed to React through
// useSyncExternalStore rather than mirrored into effect-driven state.

const listeners = new Set<() => void>()
let currentSnapshot: CursorPetSettings | null = null

function readStored(): CursorPetSettings {
  if (typeof window === "undefined") return DEFAULT_CURSOR_PET_SETTINGS
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? sanitizeCursorPetSettings(JSON.parse(stored)) : DEFAULT_CURSOR_PET_SETTINGS
  } catch {
    return DEFAULT_CURSOR_PET_SETTINGS
  }
}

function getSnapshot(): CursorPetSettings {
  if (currentSnapshot === null) currentSnapshot = readStored()
  return currentSnapshot
}

function getServerSnapshot(): CursorPetSettings {
  return DEFAULT_CURSOR_PET_SETTINGS
}

function emit() {
  for (const listener of listeners) listener()
}

function writeSettings(next: CursorPetSettings) {
  currentSnapshot = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage may be full or blocked; the pet still works for this session.
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Keep tabs in sync when another one changes the settings.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    currentSnapshot = readStored()
    emit()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

/** Client-only flag; false on the server and during hydration. */
function subscribeHydration() {
  return () => {}
}

type CursorPetSettingsContextValue = {
  settings: CursorPetSettings
  /** True once the client store is active. */
  hydrated: boolean
  setSetting: <K extends keyof CursorPetSettings>(key: K, value: CursorPetSettings[K]) => void
  reset: () => void
}

const CursorPetSettingsContext = createContext<CursorPetSettingsContextValue | null>(null)

export function CursorPetSettingsProvider({ children }: { children: ReactNode }) {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  )

  const setSetting = useCallback(
    <K extends keyof CursorPetSettings>(key: K, value: CursorPetSettings[K]) => {
      writeSettings({ ...getSnapshot(), [key]: value })
    },
    [],
  )

  const reset = useCallback(() => writeSettings(DEFAULT_CURSOR_PET_SETTINGS), [])

  const value = useMemo(
    () => ({ settings, hydrated, setSetting, reset }),
    [settings, hydrated, setSetting, reset],
  )

  return (
    <CursorPetSettingsContext.Provider value={value}>{children}</CursorPetSettingsContext.Provider>
  )
}

export function useCursorPetSettings() {
  const context = useContext(CursorPetSettingsContext)
  if (!context) {
    throw new Error("useCursorPetSettings must be used within a CursorPetSettingsProvider")
  }
  return context
}
