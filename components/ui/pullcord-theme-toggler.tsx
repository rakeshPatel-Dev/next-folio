"use client"
import { useState } from "react"
import { PullCord } from "pullcord"
import "pullcord/pullcord.css"
import { useTheme } from "next-themes"
import UpArrow from "../icons/up-arrow"
import { X } from "lucide-react"
import { useIsMounted } from "@/hooks/useIsMounted"

export function PullCordThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()
  const [closeHint, setCloseHint] = useState(false)

  if (!mounted) return null

  const dark = resolvedTheme === "dark"

  return (
    <div
      style={
        {
          "--pullcord-top": "0",
          "--pullcord-right": "10rem",
          "--pullcord-z": "9999",
        } as React.CSSProperties
      }
    >
      <PullCord
        onPull={() => setTheme(dark ? "light" : "dark")}
        pulled={!dark}
        className="hidden md:block"
        ariaLabel="Toggle theme"
        config={{
          gravity: 1250, // hang tension / fall speed
          damping: 0.94, // the snap: higher = snappier retract
          iterations: 100, // rope stiffness
          stretchMax: 100, // pull travel past rest
        }}
      />

      {!closeHint && (
        <span className="group fixed top-50 right-50 z-50 hidden font-mono text-muted-foreground/80 italic md:flex">
          <X
            onClick={() => setCloseHint(true)}
            className="size-5 rounded-full border bg-card p-1 opacity-0 group-hover:opacity-100"
          />
          <p className="flex flex-row items-center select-none">
            Pull the
            <br />
            Cord!
            <UpArrow className="-mt-4 -ml-4 size-15" />
          </p>
        </span>
      )}
    </div>
  )
}
