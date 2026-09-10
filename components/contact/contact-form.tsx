"use client"

import { useState } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const FIELD_CLASS = cn(
  "h-12 rounded-2xl border border-border/60 bg-background px-4 text-base",
  "shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]",
  "placeholder:text-muted-foreground/60",
  "transition-shadow duration-200 ease-out",
  "focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:border-foreground/20",
  "focus-visible:shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_0_0_4px_rgba(0,0,0,0.03)]"
)

export function ContactForm() {
  const [formState, handleSubmit] = useForm("mykvgajk")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  if (formState.succeeded) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-background px-6 py-10 text-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="size-6 text-emerald-500" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Message sent</p>
          <p className="text-sm text-muted-foreground">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <Input
        id="name"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        required
        maxLength={120}
        className={FIELD_CLASS}
      />

      <div className="space-y-1.5">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          required
          className={FIELD_CLASS}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={formState.errors}
          className="px-1 text-xs text-red-500"
        />
      </div>

      <div className="space-y-1.5">
        <Textarea
          id="message"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          required
          maxLength={5000}
          className={cn(FIELD_CLASS, "h-auto min-h-32 resize-none py-3.5 leading-relaxed")}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={formState.errors}
          className="px-1 text-xs text-red-500"
        />
      </div>

      <Button
        type="submit"
        disabled={formState.submitting}
        className={cn(
          "group relative h-12 w-full gap-2 overflow-hidden rounded-2xl text-sm font-semibold",
          "bg-foreground text-background dark:bg-white dark:text-black",
          "shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "transition-all duration-200 ease-out",
          "hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_20px_-4px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "hover:-translate-y-px",
          "active:translate-y-0 active:shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "disabled:opacity-70 disabled:hover:translate-y-0"
        )}
      >
        <span className="relative z-10 flex items-center gap-2">
          {formState.submitting ? "Sending..." : "Send"}
          <Send className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>

        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/15 to-transparent"
          aria-hidden
        />
      </Button>
    </form>
  )
}