"use client"

import * as React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────────────────────
   <CursorFill /> — cursor-tracking fill overlay
   
   The overlay starts from the side the pointer enters from, follows the cursor
   vertically (single fixed origin, no mid-hover flip), and closes toward the
   side the pointer leaves toward.
   
   - `wholeFill`: same enter/leave logic, but instead of tracking the cursor the
     overlay fills/begins the WHOLE box on hover and empties on leave.
   
   - Default: solid fill below the content using `currentColor` (theme-aware).
   - `invert`: places the overlay ABOVE the content with `mix-blend-difference`,
     so everything it covers (text, icons, images) appears inverted in both
     themes. Tune the fill color with `overlayClassName`.
   
   Usage:
     <CursorFill wholeFill invert className="flex items-center gap-4 ...">
       <div className="relative z-10">...</div>
     </CursorFill>
───────────────────────────────────────────────────────────────────────────── */

interface CursorFillProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  invert?: boolean
  /** Fill the whole box on hover instead of tracking the cursor. */
  wholeFill?: boolean
  overlayClassName?: string
}

const CursorFill = React.forwardRef<HTMLDivElement, CursorFillProps>(
  ({ children, invert, wholeFill, overlayClassName, className, ...rest }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const baseRef = useRef<HTMLDivElement>(null)
    const originRef = useRef<"top" | "bottom">("top")
    const lastY = useRef(0)

    const setCardRef = (node: HTMLDivElement | null) => {
      cardRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    }

    const setOverlay = (
      origin: "top" | "bottom",
      progress: number,
      animate = false
    ) => {
      overlayRef.current?.style &&
        (overlayRef.current.style.transition = animate
          ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)"
          : "none")
      if (baseRef.current) {
        baseRef.current.style.transition = overlayRef.current
          ? overlayRef.current.style.transition
          : "none"
        baseRef.current.style.transformOrigin = origin
      }
      if (overlayRef.current) {
        overlayRef.current.style.transformOrigin = origin
        overlayRef.current.style.transform = `scaleY(${Math.min(Math.max(progress, 0), 1)})`
      }
      if (baseRef.current) {
        baseRef.current.style.transform = `scaleY(${Math.min(Math.max(progress, 0), 1)})`
      }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      lastY.current = e.clientY
      // Fill starts from the side the pointer entered from and stays fixed all hover.
      const origin: "top" | "bottom" =
        e.clientY <= rect.top + rect.height / 2 ? "top" : "bottom"
      originRef.current = origin
      if (wholeFill) {
        setOverlay(origin, 1, true)
        return
      }
      const progress =
        origin === "top"
          ? (e.clientY - rect.top) / rect.height
          : (rect.bottom - e.clientY) / rect.height
      setOverlay(origin, progress)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (wholeFill) return
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      lastY.current = e.clientY
      // Single fixed origin -> continuous 0..1 scale, no mid-hover flip, no flicker.
      const origin = originRef.current
      const progress =
        origin === "top"
          ? (e.clientY - rect.top) / rect.height
          : (rect.bottom - e.clientY) / rect.height
      setOverlay(origin, progress)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const dy = e.clientY - lastY.current
      // Closing direction follows where the pointer leaves toward.
      const origin: "top" | "bottom" =
        dy < 0 || e.clientY <= rect.top + rect.height / 2 ? "top" : "bottom"
      originRef.current = origin
      setOverlay(origin, 0, true)
    }

    return (
      <div
        ref={setCardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("relative overflow-hidden", className)}
        {...rest}
      >
        {/* Invert backing — paints the page background inside the card so the
            difference blend always has a layer to invert against, regardless of
            ancestor isolation. Only visible while the fill is active. */}
        {invert && (
          <div
            ref={baseRef}
            aria-hidden
            style={{ transform: "scaleY(0)", transformOrigin: "top" }}
            className="pointer-events-none absolute inset-0 z-0 bg-background will-change-transform"
          />
        )}
        {/* Fill overlay */}
        <div
          ref={overlayRef}
          aria-hidden
          style={{ transform: "scaleY(0)", transformOrigin: "top" }}
          className={cn(
            "pointer-events-none absolute inset-0 will-change-transform",
            invert ? "z-20 bg-white mix-blend-difference" : "z-0 bg-current",
            overlayClassName
          )}
        />
        {children}
      </div>
    )
  }
)

CursorFill.displayName = "CursorFill"
export { CursorFill }