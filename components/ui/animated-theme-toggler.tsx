"use client"
import { forwardRef, useCallback, useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = forwardRef<HTMLButtonElement, AnimatedThemeTogglerProps>(function AnimatedThemeToggler(
  {
    className,
    duration = 400,
    ...props
  },
  forwardedRef
) {
  const { resolvedTheme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isDark = resolvedTheme === "dark"

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node

      if (typeof forwardedRef === "function") {
        forwardedRef(node)
        return
      }

      if (forwardedRef) {
        forwardedRef.current = node
      }
    },
    [forwardedRef]
  )

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const nextTheme = isDark ? "light" : "dark"
    if (typeof document.startViewTransition !== "function") {
      setTheme(nextTheme)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme)
      })
    })

    await transition.ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [duration, isDark, setTheme])

  return (
    <button
      ref={setButtonRef}
      {...props}
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className={cn(className)}
    >
      {resolvedTheme ? (isDark ? <Sun /> : <Moon />) : <Moon />}
    </button>
  )
})