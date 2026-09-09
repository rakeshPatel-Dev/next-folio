"use client"

import React, { useEffect, useState } from "react"
import { getIconPack } from "@/lib/all-icons"
import * as LucideIcons from "lucide-react"

type IconProps = { className?: string; style?: React.CSSProperties }
type IconComponent = React.ComponentType<IconProps>

type Props = {
  name?: string
  className?: string
  style?: React.CSSProperties
}

const LucidePack: Record<string, IconComponent> = LucideIcons as unknown as Record<string, IconComponent>

export default function IconRenderer({ name, className, style }: Props) {
  const [Icon, setIcon] = useState<IconComponent | null>(() => {
    if (!name) return null
    // Resolve Lucide synchronously during first render (bundled, no async needed)
    if (name in LucidePack) return LucidePack[name]
    return null
  })

  useEffect(() => {
    if (!name || name in LucidePack) return // already resolved (or Lucide)

    let cancelled = false
    const resolveIcon = async () => {
      // Find prefix (e.g. "Si" from "SiNextdotjs")
      const prefixMatch = name.match(/^[A-Z][a-z0-9]*/)
      if (!prefixMatch) return

      const prefix = prefixMatch[0]
      const pack = (await getIconPack(prefix)) as Record<string, unknown> | null

      if (!cancelled && pack && typeof pack[name] === "function") {
        setIcon(() => pack[name] as IconComponent)
      }
    }

    resolveIcon()
    return () => {
      cancelled = true
    }
  }, [name])

  if (!Icon) return <div className={className} style={style} /> // Placeholder while loading

  return <Icon className={className} style={style} />
}
