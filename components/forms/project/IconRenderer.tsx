"use client"

import React from "react"
import { ICON_PACKS } from "@/lib/all-icons"

type Props = {
  name?: string
  className?: string
}

const PREFIXES = Object.keys(ICON_PACKS).sort(
  (a, b) => b.length - a.length
) as (keyof typeof ICON_PACKS)[]

function isValidIconComponent(
  value: unknown
): value is React.ComponentType<{ className?: string }> {
  return typeof value === "function"
}

export default function IconRenderer({ name, className }: Props) {
  if (!name) return null

  // Lucide (PascalCase, no prefix) — skip "default" (module export)
  if (
    name !== "default" &&
    /^[A-Z][a-zA-Z]+$/.test(name) &&
    name in ICON_PACKS.Lucide
  ) {
    const Icon = ICON_PACKS.Lucide[
      name as keyof typeof ICON_PACKS.Lucide
    ] as React.ComponentType<{ className?: string }> | undefined
    if (Icon && isValidIconComponent(Icon)) {
      return <Icon className={className} />
    }
  }

  // react-icons (prefix based)
  for (const prefix of PREFIXES) {
    if (prefix === "Lucide" || !name.startsWith(prefix)) continue

    const pack = ICON_PACKS[prefix] as Record<string, React.ComponentType<{ className?: string }> | undefined>
    const Icon = pack[name]

    if (Icon && isValidIconComponent(Icon)) {
      return <Icon className={className} />
    }
  }

  return null
}
