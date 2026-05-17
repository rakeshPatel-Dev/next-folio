"use client"

import { Input } from "@/components/ui/input"
import IconRenderer from "@/components/forms/project/IconRenderer"

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function IconInput({ value, onChange }: Props) {
  // We removed ALL_ICON_NAMES to drastically reduce bundle size.
  // The user can type the icon name (e.g., SiNextdotjs) and it will be rendered.

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. SiNextdotjs, FaReact..."
        />

        <div className="h-9 w-9 flex items-center justify-center border rounded">
          <IconRenderer name={value} className="h-5 w-5" />
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground">
        Enter the PascalCase name from react-icons (e.g. SiNextdotjs, FaGithub).
      </p>
    </div>
  )
}
