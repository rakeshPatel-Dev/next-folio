"use client"

import { useMemo } from "react"
import { Input } from "@/components/ui/input"
import IconRenderer from "@/components/forms/project/IconRenderer"
import { ALL_ICON_NAMES } from "@/lib/iconregistry"

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function IconInput({ value, onChange }: Props) {
  const matches = useMemo(() => {
    if (!value) return []
    return ALL_ICON_NAMES
      .filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8)
  }, [value])

  const isValid = value && ALL_ICON_NAMES.includes(value)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="FaReact, SiNextdotjs, Cpu..."
        />

        <div className="h-9 w-9 flex items-center justify-center border rounded">
          <IconRenderer name={value} className="h-5 w-5" />
        </div>
      </div>

      {value && !isValid && (
        <p className="text-xs text-destructive">
          Icon not found
        </p>
      )}

      {matches.length > 0 && (
        <div className="border rounded p-2 grid grid-cols-4 gap-2 max-h-40 overflow-auto">
          {matches.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className="flex items-center gap-2 text-xs hover:bg-muted p-1 rounded"
            >
              <IconRenderer name={name} className="h-4 w-4" />
              <span className="truncate">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
