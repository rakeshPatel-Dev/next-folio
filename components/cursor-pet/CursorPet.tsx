"use client"

import { useCursorPet, SHEET, type CursorPetConfig } from "./useCursorPet"
import { useCursorPetSettings } from "./CursorPetSettingsContext"

export function CursorPet(props: Partial<CursorPetConfig> = {}) {
  const { settings } = useCursorPetSettings()
  const { enabled, ...settingsConfig } = settings
  // Hooks must run unconditionally, so resolve config before the early return.
  const { outerRef, spriteRef, config } = useCursorPet({ ...settingsConfig, ...props }, enabled)

  if (!enabled) return null

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: config.hitSize,
        height: config.hitSize,
        zIndex: 60,
        touchAction: "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        transformOrigin: "center center",
      }}
    >
      <div
        ref={spriteRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transformOrigin: "center center",
          imageRendering: "pixelated",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${SHEET.width}px ${SHEET.height}px`,
        }}
      />
    </div>
  )
}
