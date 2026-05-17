"use client"

import React, { useEffect, useState } from "react"
import { getIconPack } from "@/lib/all-icons"
import * as LucideIcons from "lucide-react"

type Props = {
  name?: string
  className?: string
  style?: React.CSSProperties
}

export default function IconRenderer({ name, className, style }: Props) {
  const [Icon, setIcon] = useState<React.ComponentType<{ className?: string, style?: React.CSSProperties }> | null>(null)

  useEffect(() => {
    if (!name) return

    // 1. Check Lucide (always bundled or optimized by lucide-react)
    if (name in LucideIcons) {
      setIcon(() => LucideIcons[name as keyof typeof LucideIcons] as any)
      return
    }

    // 2. Check react-icons packs based on prefix
    const resolveIcon = async () => {
      // Find prefix (e.g. "Si" from "SiNextdotjs")
      const prefixMatch = name.match(/^[A-Z][a-z0-9]*/)
      if (!prefixMatch) return

      const prefix = prefixMatch[0]
      const pack = await getIconPack(prefix)
      
      if (pack && (pack as any)[name]) {
        setIcon(() => (pack as any)[name])
      }
    }

    resolveIcon()
  }, [name])

  if (!Icon) return <div className={className} style={style} /> // Placeholder while loading

  return <Icon className={className} style={style} />
}
