"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"
import IconRenderer from "@/components/forms/project/IconRenderer"

type SkillProps = {
  name: string
  Icon: string
  color: string
  index: number
}

export default function SkillPill({ name, Icon, color, index }: SkillProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="skill-pill group relative flex h-13 w-13 items-center justify-center rounded-xl border border-border bg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-muted cursor-default">
          <IconRenderer 
            name={Icon} 
            style={{ color }} 
            className="w-5 h-5 opacity-35 transition-all duration-300 group-hover:opacity-95" 
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className="border-border bg-popover text-popover-foreground text-[11px] tracking-wide">{name}</TooltipContent>
    </Tooltip>
  )
}
