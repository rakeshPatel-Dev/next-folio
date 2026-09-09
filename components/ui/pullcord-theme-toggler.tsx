"use client"
import { useState } from "react"
import { PullCord } from "pullcord"
import "pullcord/pullcord.css"
import { useTheme } from "next-themes"
import UpArrow from "../icons/up-arrow";
import {X} from "lucide-react"
import { useIsMounted } from "@/hooks/useIsMounted"

export function PullCordThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()
  const [closeHint, setCloseHint] = useState(false)

  if (!mounted) return null

  const dark = resolvedTheme === "dark"

  return (
    <div
      style={{ "--pullcord-top": "0", "--pullcord-right": "10rem", "--pullcord-z": "9999" } as React.CSSProperties}>
      <PullCord
        onPull={() => setTheme(dark ? "light" : "dark")}
        pulled={!dark}
        className="hidden md:block"
        ariaLabel="Toggle theme"
        config={{
          gravity: 1250,   // hang tension / fall speed
          damping: 0.94,   // the snap: higher = snappier retract
          iterations: 100,  // rope stiffness
          stretchMax: 100,  // pull travel past rest
        }}
      />

     { !closeHint &&
      <span className="fixed top-50 right-50 hidden md:flex z-50 group font-mono italic text-muted-foreground/80">
          <X
          onClick={() => setCloseHint(true)}
           className="bg-card border group-hover:opacity-100 opacity-0  rounded-full p-1 size-5"
           />
       <p className="select-none flex flex-row items-center">
         Pull the
        <br/>
         Cord!
        <UpArrow className = "size-15 -ml-4 -mt-4"/>
         </p>
        
      </span>}


    </div>
  )
}