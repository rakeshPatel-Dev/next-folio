"use client"

import { useEffect } from "react"
import { ArrowUpRight, CalendarClock, MessageSquare, XIcon } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface LetsTalkDialogProps {
  open: boolean
  onClose: () => void
}

export function LetsTalkDialog({ open, onClose }: LetsTalkDialogProps) {
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

  const calLink = process.env.NEXT_PUBLIC_CAL_LINK

  const optionClass = cn(
    "group flex items-center gap-3.5 rounded-full bg-foreground/[0.04] p-3.5",
    "border border-border",
    "transition-colors duration-150 ease-out",
    "hover:bg-foreground/[0.07] active:bg-foreground/[0.09]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
  )

  const iconWrapClass =
    "flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06]"

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
            aria-label="Let's Talk"
            className="relative w-full max-w-sm rounded-4xl border bg-background p-5 shadow-xl"
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-foreground/6 p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            >
              <XIcon className="size-4" />
            </button>

            <div className="mb-5 mt-1 px-1">
              <h2 className="text-xl font-semibold tracking-tight">
                Let&apos;s Talk
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                How would you like to connect?
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/contact" onClick={onClose} className={optionClass}>
                <span className={iconWrapClass}>
                  <MessageSquare className="size-4.5 text-foreground" />
                </span>
                <span className="flex-1 text-sm font-medium">
                  Message via Contact Form
                </span>
                <ArrowUpRight className={arrowClass} strokeWidth={2.5} />
              </Link>

              {calLink && (
                <a
                  href={calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className={optionClass}
                >
                  <span className={iconWrapClass}>
                    <CalendarClock className="size-4.5 text-foreground" />
                  </span>
                  <span className="flex-1 text-sm font-medium">
                    Call on Cal.com
                  </span>
                  <ArrowUpRight className={arrowClass} strokeWidth={2.5} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}