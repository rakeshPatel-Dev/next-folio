"use client"
import { useEffect, useState } from "react"
import { PullCord } from "pullcord"
import "pullcord/pullcord.css"
import { useTheme } from "next-themes"

export function PullCordThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const dark = resolvedTheme === "dark"

  return (
    <div style={{ "--pullcord-top": "1rem", "--pullcord-right": "1.25rem", "--pullcord-z": "50" } as React.CSSProperties}>
      <PullCord
        onPull={() => setTheme(dark ? "light" : "dark")}
        pulled={!dark}
        ariaLabel="Toggle theme"
      />
    </div>
  )
}