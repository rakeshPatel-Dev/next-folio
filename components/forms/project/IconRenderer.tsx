"use client"

import { ICON_PACKS } from "@/lib/iconregistry"

type Props = {
  name?: string
  className?: string
}

const PREFIXES = Object.keys(ICON_PACKS).sort(
  (a, b) => b.length - a.length
)

export default function IconRenderer({ name, className }: Props) {
  if (!name) return null

  // Lucide (PascalCase, no prefix)
  if (
    /^[A-Z][a-zA-Z]+$/.test(name) &&
    name in ICON_PACKS.Lucide
  ) {
    const Icon = ICON_PACKS.Lucide[
      name as keyof typeof ICON_PACKS.Lucide
    ]
    return <Icon className={className} />
  }

  // react-icons (prefix based)
  for (const prefix of PREFIXES) {
    if (!name.startsWith(prefix)) continue

    const pack = ICON_PACKS[prefix]
    const Icon = pack?.[name]

    if (Icon) return <Icon className={className} />
  }

  return null
}
