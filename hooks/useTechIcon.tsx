import React, { useMemo } from 'react'
import { techStacks } from '@/data/techStacks'
import IconRenderer from '@/components/forms/project/IconRenderer'

type IconInputType = string | any | undefined | null

export function useTechIcon(iconInput: IconInputType) {
  return useMemo(() => {
    if (!iconInput) return () => null

    // 1) If a component was passed directly, return it wrapped
    if (typeof iconInput === 'function') {
      return iconInput
    }

    const name = String(iconInput)

    // 2) try matching against our techStacks `value` or `label` property
    const match = techStacks.find(
      (t: any) => t.value.toLowerCase() === name.toLowerCase() || t.label.toLowerCase() === name.toLowerCase()
    )
    
    const iconName = match ? match.icon : name

    // Return a functional component that uses IconRenderer
    const DynamicIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
      <IconRenderer name={iconName} className={className} style={style} />
    )

    return DynamicIcon
  }, [iconInput])
}

export function GetTechIcon(iconInput: IconInputType) {
  return useTechIcon(iconInput)
}