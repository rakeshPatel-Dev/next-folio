"use client"

import { useState } from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { MagneticHover } from "../../motion/Reveal"

export default function SocialLink({ label, href, Icon, index, image }: { label: string; href: string; Icon: any; index: number; image: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const rotateSpring = useTransform(mouseXSpring, () => {
    const velocity = x.getVelocity()
    return velocity * 0.004
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block overflow-hidden rounded-2xl h-[220px] w-[300px] shadow-2xl border border-border"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          rotate: rotateSpring,
          translateX: "-150%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{
          opacity: { duration: 0.2, ease: "easeOut" },
          scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
        }}
      >
        <Image src={image} fill alt={label} className="object-cover" />
      </motion.div>

      <MagneticHover strength={0.15}>
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="group flex w-full items-center justify-between border-b border-border py-4 transition-colors duration-300 hover:border-foreground/14"
        >
          <div className="flex items-center gap-4">
            <Icon size={14} className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/65" />
            <span className="font-sans text-sm font-light tracking-[0.04em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{label}</span>
          </div>
          <ArrowUpRight size={13} className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/50" />
        </motion.a>
      </MagneticHover>
    </>
  )
}
