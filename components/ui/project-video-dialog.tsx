"use client"

import { useEffect, useState } from "react"
import { Play, XIcon } from "lucide-react"
import { motion } from "motion/react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import Image from "next/image"

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out"

interface ProjectVideoProps {
  animationStyle?: AnimationStyle
  videoSrc: string
  thumbnailSrc: string
  thumbnailAlt?: string
  className?: string
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
}

export function ProjectVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: ProjectVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const selectedAnimation = animationVariants[animationStyle]

  useEffect(() => {
    if (!isVideoOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isVideoOpen])

  const dialog = isVideoOpen ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
          setIsVideoOpen(false)
        }
      }}
      onClick={() => setIsVideoOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/75 p-3 backdrop-blur-xl sm:p-4 md:p-6"
      style={{ zIndex: 1000 }}
    >
      <motion.div
        {...selectedAnimation}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl"
      >
        <motion.button
          type="button"
          aria-label="Close video"
          onClick={() => setIsVideoOpen(false)}
          className="absolute -top-12 right-0 z-10 rounded-full bg-neutral-900/80 p-2 text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-top-14"
        >
          <XIcon className="size-5" />
        </motion.button>

        <div className="relative isolate aspect-video w-full overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl">
          <iframe
            src={videoSrc}
            title="Project Video player"
            className="size-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </motion.div>
    </motion.div>
  ) : null

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Play video"
        className="group relative cursor-pointer border-0 bg-transparent p-0"
        onClick={() => setIsVideoOpen(true)}
      >
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          width={1920}
          height={1080}
          className="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
          <div className="bg-primary/10 flex size-28 items-center justify-center rounded-full backdrop-blur-md">
            <div
              className={`from-primary/30 to-primary relative flex size-20 scale-100 items-center justify-center rounded-full bg-linear-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]`}
            >
              <Play
                className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </button>
      {isVideoOpen && createPortal(dialog, document.body)}
    </div>
  )
}
