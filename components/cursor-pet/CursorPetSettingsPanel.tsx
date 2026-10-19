"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Cat, RotateCcw, Settings, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useCursorPetSettings } from "./CursorPetSettingsContext"
import { CURSOR_PET_LIMITS } from "./settings-config"

/** Format milliseconds as a compact number of seconds. */
function seconds(ms: number) {
  return `${(ms / 1_000).toFixed(1).replace(/\.0$/, "")}s`
}

type SliderRowProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (value: number) => void
}

function SliderRow({ label, value, min, max, step, display, onChange }: SliderRowProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="font-mono text-[11px] text-foreground/80 tabular-nums">{display}</span>
      </div>
      <Slider
        aria-label={label}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([next]) => {
          if (typeof next === "number") onChange(next)
        }}
      />
    </div>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>
}

/**
 * Right-center settings panel for the cursor pet.
 *
 * Opens on hover of the toggle button and stays open while the pointer is
 * over either the button or the panel. A short close delay bridges the gap
 * between the two so it doesn't flicker during the transition.
 *
 * Rendered only on hover-capable, fine-pointer viewports at least 768px wide,
 * so phones and touch tablets never see it.
 */
export function CursorPetSettingsPanel() {
  const { settings, setSetting, reset } = useCursorPetSettings()
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)")
    const sync = () => setIsDesktop(query.matches)

    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  // Clear any pending close timer on unmount.
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  // Never render on the server or on small/touch devices.
  if (!isDesktop) return null

  return (
    <div className="fixed top-1/2 right-3 z-70 flex -translate-y-1/2 items-center">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className={cn(
              "mr-2 w-72 rounded-4xl p-5",
              "border border-foreground/10 bg-background/85 backdrop-blur-xl",
              "shadow-[0_8px_20px_-8px_rgba(0,0,0,0.2),0_2px_6px_-2px_rgba(0,0,0,0.1)]",
            )}
            role="dialog"
            aria-label="Cursor pet settings"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cat className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold tracking-tight">Cursor Pet</h2>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label="Reset cursor pet settings"
                title="Reset to defaults"
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:outline-none"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-full border border-foreground/10 bg-foreground/3 px-4 py-2">
                <Label htmlFor="cursor-pet-enabled" className="text-xs font-medium">
                  Enabled
                </Label>
                <Switch
                  id="cursor-pet-enabled"
                  checked={settings.enabled}
                  onCheckedChange={(checked) => setSetting("enabled", checked)}
                />
              </div>

              <Row>
                <SliderRow
                  label="Sleep after idle"
                  value={settings.autoSleepAfter}
                  {...CURSOR_PET_LIMITS.autoSleepAfter}
                  display={seconds(settings.autoSleepAfter)}
                  onChange={(value) => setSetting("autoSleepAfter", value)}
                />
                <SliderRow
                  label="Nap duration"
                  value={settings.sleepDuration}
                  {...CURSOR_PET_LIMITS.sleepDuration}
                  display={seconds(settings.sleepDuration)}
                  onChange={(value) => setSetting("sleepDuration", value)}
                />
                <SliderRow
                  label="Speed"
                  value={settings.speed}
                  {...CURSOR_PET_LIMITS.speed}
                  display={`${settings.speed.toFixed(2)}×`}
                  onChange={(value) => setSetting("speed", value)}
                />
                <SliderRow
                  label="Size"
                  value={settings.scale}
                  {...CURSOR_PET_LIMITS.scale}
                  display={`${settings.scale.toFixed(2)}×`}
                  onChange={(value) => setSetting("scale", value)}
                />
              </Row>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onMouseEnter={() => {
          cancelClose()
          setOpen(true)
        }}
        onMouseLeave={scheduleClose}
        onFocus={() => {
          cancelClose()
          setOpen(true)
        }}
        onBlur={scheduleClose}
        aria-label={open ? "Close cursor pet settings" : "Open cursor pet settings"}
        aria-expanded={open}
        className={cn(
          "group relative flex size-12 items-center justify-center rounded-full",
          "bg-linear-to-b from-background/90 to-background/60 backdrop-blur-xl",
          "shadow-[0_2px_6px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.4)]",
          "transition-all duration-200 ease-out",
          "hover:-translate-y-0.5 hover:shadow-[0_4px_10px_-4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]",
          "active:translate-y-0 active:shadow-[0_1px_3px_-1px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(0,0,0,0.1)]",
          "focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:outline-none",
          open && "ring-2 ring-foreground/15",
        )}
      >
        {/* 3D cat face */}
        <Image
          src="/cat-icon.png"
          alt=""
          width={56}
          height={56}
          className="size-7 object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
          draggable={false}
        />

        {/* Gear / X badge — top right */}
        <span
          className={cn(
            "absolute top-0 right-0 flex size-4 items-center justify-center rounded-full",
            "bg-linear-to-b from-white to-zinc-200 text-zinc-600 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-400",
            "shadow-[0_1px_2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.9)]",
            "transition-transform duration-300",
            !open && "group-hover:rotate-90",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <X className="size-3" strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="gear"
                initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                <Settings className="size-3" strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </div>
  )
}
