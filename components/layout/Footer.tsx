"use client"

import { useState } from "react"
import { Compass } from "lucide-react"
import { InspirationsDialog } from "@/components/ui/inspirations-dialog"

function FooterCopy() {
  return (
    <p className="font-sans text-sm text-muted-foreground text-center pt-4">
      &copy; {new Date().getFullYear()} Rakesh Patel · Built with Next.js & Tailwind
    </p>
  )
}

const machineLink =
  "rounded transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"

const Footer = () => {
  const [showInspirations, setShowInspirations] = useState(false)

  return (
    <footer className="w-full mt-10 max-w-app px-app mb-20 mx-auto py-8 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center gap-1">
      <FooterCopy />
      <button
        type="button"
        onClick={() => setShowInspirations(true)}
        className="group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 active:bg-foreground/5"
      >
        <Compass className="size-3.5 transition-transform duration-200 ease-out group-hover:rotate-45" />
        Inspirations
      </button>
      <nav
        aria-label="Machine-readable site files"
        className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"
      >
        <a href="/sitemap.xml" className={machineLink}>
          sitemap.xml
        </a>
        <span aria-hidden="true">&middot;</span>
        <a href="/llms.txt" className={machineLink}>
          llms.txt
        </a>
      </nav>
      <InspirationsDialog
        open={showInspirations}
        onClose={() => setShowInspirations(false)}
      />
    </footer>
  )
}

export default Footer