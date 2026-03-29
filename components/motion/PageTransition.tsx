"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link, { type LinkProps } from "next/link"

interface PageTransitionProps {
  children: React.ReactNode
}
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return <>{children}</>

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export function TransitionLink({ children, className, ...props }: TransitionLinkProps) {
  return (
    <Link className={className} prefetch {...props}>
      {children}
    </Link>
  )
}