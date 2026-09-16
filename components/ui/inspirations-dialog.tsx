"use client"

import { useEffect } from "react"
import { ArrowUpRight, Compass, XIcon } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { inspirations } from "@/data/inspirations"

interface InspirationsDialogProps {
  open: boolean
  onClose: () => void
}

export function InspirationsDialog({ open, onClose }: InspirationsDialogProps) {
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  const itemClass = cn(
    "group flex items-center gap-3 transition-[transform, background-color] p-2 duration-200 ease-out",
    "active:bg-foreground/[0.09]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 hover:translate-x-0.5"
  )

  const arrowClass =
    "size-4 shrink-0 text-muted-foreground/60 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 6 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Inspirations"
            className="relative w-full max-w-lg rounded-4xl border bg-background p-5 shadow-xl"
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-foreground/6 p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            >
              <XIcon className="size-4" />
            </button>

            <div className="mb-5 mt-1 flex items-center gap-2 px-1">
              <Compass className="size-4.5 text-muted-foreground" />
              <h2 className="text-xl font-semibold tracking-tight">Inspirations</h2>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {inspirations.map(({ name, domain }) => (
                <a
                  key={domain}
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  aria-label={`${name} — ${domain}`}
                  className={itemClass}
                >
                  <Image
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                    alt=""
                    width={32}
                    height={32}
                    className="size-7 shrink-0 rounded-full border border-foreground/10"
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {domain}
                    </span>
                  </span>
                  <ArrowUpRight className={arrowClass} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}