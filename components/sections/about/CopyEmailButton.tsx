"use client"

import { Mail } from "lucide-react"
import { useToast } from "@/components/zenblocks/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

/** Client island: copy email + toast. */
export function CopyEmailButton({ email }: { email: string }) {
  const { toast } = useToast()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      toast({ variant: "success", title: "Copied", description: "Email copied to clipboard" })
    } catch {
      toast({ variant: "error", title: "Failed", description: "Could not copy" })
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={copyEmail}
          className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-5 py-2.5 font-sans text-sm font-medium cursor-pointer text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.96]"
        >
          <Mail size={14} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span>{email}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="border-border bg-popover text-popover-foreground text-sm tracking-wide">
        Click to copy
      </TooltipContent>
    </Tooltip>
  )
}
