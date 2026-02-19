"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useSpring, useTransform, useMotionValue, type Variant } from "framer-motion"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */

type RevealVariant =
  | "fadeUp"      // floats up while fading in          → hero text, headings
  | "fadeIn"      // pure opacity                        → images, cards
  | "slideLeft"   // enters from the right               → timeline items
  | "slideRight"  // enters from the left                → alternate timeline
  | "scale"       // scales up from 96%                  → cards, pills
  | "blur"        // blurs in                            → backgrounds, overlays

interface RevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number          // seconds
  duration?: number       // seconds
  className?: string
  once?: boolean          // only animate once (default: true)
  amount?: number         // 0–1, how much must be in view to trigger
}

/* ─────────────────────────────────────────────────────────────────────────────
   VARIANTS
───────────────────────────────────────────────────────────────────────────── */

const variants: Record<RevealVariant, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 32, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  slideRight: {
    hidden: { opacity: 0, x: -32, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
}

const ease = [0.22, 1, 0.36, 1] as const   // custom expo-out — feels premium

/* ─────────────────────────────────────────────────────────────────────────────
   <Reveal /> — scroll-triggered entrance wrapper
   
   Usage:
     <Reveal variant="fadeUp" delay={0.1}>
       <h1>Hello</h1>
     </Reveal>
───────────────────────────────────────────────────────────────────────────── */

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.15,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants[variant]}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   <Stagger /> — wraps children and staggers their entrance
   
   Usage:
     <Stagger staggerDelay={0.08}>
       <div>Item 1</div>
       <div>Item 2</div>
       <div>Item 3</div>
     </Stagger>
───────────────────────────────────────────────────────────────────────────── */

interface StaggerProps {
  children: React.ReactNode
  staggerDelay?: number
  variant?: RevealVariant
  duration?: number
  className?: string
  once?: boolean
}

const staggerContainer = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
})

export function Stagger({
  children,
  staggerDelay = 0.07,
  variant = "fadeUp",
  duration = 0.55,
  className,
  once = true,
}: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={staggerContainer(staggerDelay)}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
          <motion.div
            key={i}
            variants={variants[variant]}
            transition={{ duration, ease }}
          >
            {child}
          </motion.div>
        ))
        : <motion.div variants={variants[variant]} transition={{ duration, ease }}>
          {children}
        </motion.div>
      }
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   <MagneticHover /> — subtle magnetic pull on hover (great for buttons/icons)
   
   Usage:
     <MagneticHover>
       <button>Click me</button>
     </MagneticHover>
───────────────────────────────────────────────────────────────────────────── */

interface MagneticHoverProps {
  children: React.ReactNode
  strength?: number   // 0.2–0.5 feels natural
  className?: string
}

export function MagneticHover({ children, strength = 0.3, className }: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   <Tilt /> — subtle 3-D card tilt on hover
   
   Usage:
     <Tilt>
       <div className="card">...</div>
     </Tilt>
───────────────────────────────────────────────────────────────────────────── */

interface TiltProps {
  children: React.ReactNode
  maxAngle?: number   // degrees, 6–12 is subtle
  className?: string
  glare?: boolean
}

export function Tilt({ children, maxAngle = 8, className, glare = true }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxAngle, -maxAngle]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxAngle, maxAngle]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    x.set(nx)
    y.set(ny)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    glareX.set(50)
    glareY.set(50)
  }

  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.08) 0%, transparent 70%)`
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   useReveal() — hook version for custom elements (not divs)

   Usage:
     const { ref, isVisible } = useReveal()
     <section ref={ref} className={isVisible ? "animate-in" : "opacity-0"}>
───────────────────────────────────────────────────────────────────────────── */

export function useReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}