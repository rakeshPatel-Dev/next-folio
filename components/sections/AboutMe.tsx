"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  ArrowUpRight, MapPin, Mail,
  Github, Instagram, Linkedin, Facebook,
} from "lucide-react"
import { useToast } from "../zenblocks/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { skills } from "@/data/skills"
import type { Skill } from "@/data/skills"
import { MagneticHover } from "../motion/Reveal"

/* ─── GSAP lazy loader ───────────────────────────────────────────────────── */

async function getGSAP() {
  const { gsap } = await import("gsap")
  const { ScrollTrigger } = await import("gsap/ScrollTrigger")
  const { SplitText } = await import("gsap/SplitText")
  gsap.registerPlugin(ScrollTrigger, SplitText)
  return { gsap, ScrollTrigger, SplitText }
}

/* ─── Animation variants ─────────────────────────────────────────────────── */

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.06, duration: 0.9, ease: "easeOut" },
  }),
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function SectionLabel({ number, title }: { number: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className="mb-10 flex items-center gap-4 overflow-hidden">
      <motion.span
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-[10px] tracking-[0.25em] text-white/20"
      >
        {number}
      </motion.span>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-px w-6 bg-white/15"
      />

      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/35"
      >
        {title}
      </motion.span>
    </div>
  )
}

function SkillPill({ name, Icon, color, index }: Skill & { index: number }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="group relative flex h-13 w-13 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05] cursor-default"
        >
          <Icon
            size={20}
            style={{ color }}
            className="opacity-35 transition-all duration-300 group-hover:opacity-95"
          />
        </motion.div>
      </TooltipTrigger>
      <TooltipContent className="border-white/[0.08] bg-[#111] text-white/60 text-[11px] tracking-wide">
        {name}
      </TooltipContent>
    </Tooltip>
  )
}

/* ─── Expertise card ─────────────────────────────────────────────────────── */

const expertiseItems = [
  {
    title: "Interface Architecture",
    desc: "Component systems, design tokens, and scalable front-end structures built to last.",
  },
  {
    title: "Motion & Interaction",
    desc: "GSAP, Framer Motion, and CSS — animations that feel inevitable, never ornamental.",
  },
  {
    title: "Performance Engineering",
    desc: "Core Web Vitals, bundle analysis, lazy loading and precise rendering strategy.",
  },
  {
    title: "Design Collaboration",
    desc: "Figma-fluent. I close the gap between pixel-perfect specs and production code.",
  },
]

function ExpertiseCard({
  title,
  desc,
  index,
}: {
  title: string
  desc: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between border-t border-white/[0.06] bg-transparent px-0 py-10 transition-colors duration-500 hover:border-white/[0.14]"
    >
      {/* Hover fill */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white/[0.015]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />

      <p className="mb-6 font-mono text-[9px] tracking-[0.25em] text-white/18">
        0{index + 1}
      </p>
      <h3 className="mb-5 font-sans text-base font-light tracking-[-0.01em] text-white/85">
        {title}
      </h3>
      <p className="font-sans text-[13px] font-light leading-[1.75] text-white/30 transition-colors duration-500 group-hover:text-white/45">
        {desc}
      </p>
    </motion.div>
  )
}

/* ─── Social link ────────────────────────────────────────────────────────── */

const socialLinks = [
  { label: "GitHub", href: "https://github.com/rakeshpatel-dev", Icon: Github },
  { label: "Instagram", href: "https://instagram.com/rikesh_112", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/in/rakeshpatel-developer", Icon: Linkedin },
  { label: "Facebook", href: "https://facebook.com/rakeshthedev", Icon: Facebook },
]

function SocialLink({
  label,
  href,
  Icon,
  index,
}: {
  label: string
  href: string
  Icon: React.ElementType
  index: number
}) {
  return (
    <MagneticHover strength={0.15}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        className="group flex w-full items-center justify-between border-b border-white/[0.06] py-4 transition-colors duration-300 hover:border-white/[0.14]"
      >
        <div className="flex items-center gap-4">
          <Icon
            size={14}
            className="text-white/20 transition-colors duration-300 group-hover:text-white/65"
          />
          <span className="font-sans text-sm font-light tracking-[0.04em] text-white/40 transition-colors duration-300 group-hover:text-white/80">
            {label}
          </span>
        </div>
        <ArrowUpRight
          size={13}
          className="text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/50"
        />
      </motion.a>
    </MagneticHover>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export function AboutMe() {
  const { toast } = useToast()
  const sectionRef = useRef<HTMLElement>(null)
  const philosophyRef = useRef<HTMLParagraphElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)

  /* ── GSAP parallax cards & text effects ─────────────────────────── */
  useEffect(() => {
    let ctx: any

    getGSAP().then(({ gsap, ScrollTrigger, SplitText }) => {
      ctx = gsap.context(() => {
        
        /* 1. Stacked Cards Parallax */
        const cards = gsap.utils.toArray<HTMLElement>(".stacked-card")
        
        cards.forEach((card, index) => {
          // The last card doesn't need to scale down since nothing covers it
          if (index === cards.length - 1) return 

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          })
        })

        /* 2. Philosophy paragraph — word-by-word reveal via SplitText */
        if (philosophyRef.current) {
          const split = new SplitText(philosophyRef.current, { type: "words" })
          gsap.fromTo(
            split.words,
            { opacity: 0.08, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.03,
              ease: "power2.out",
              scrollTrigger: {
                trigger: philosophyRef.current,
                start: "top 82%",
                end: "bottom 60%",
                scrub: false,
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        /* 3. Expertise grid rows — subtle horizontal slide in */
        gsap.utils.toArray<HTMLElement>(".expertise-row").forEach((row, i) => {
          gsap.fromTo(
            row,
            { x: i % 2 === 0 ? -16 : 16, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as any,
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          )
        })

      }, sectionRef)
    })

    return () => ctx?.revert()
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("devrakesh.tech@gmail.com")
      toast({ variant: "success", title: "Copied", description: "Email copied to clipboard" })
    } catch {
      toast({ variant: "error", title: "Failed", description: "Could not copy" })
    }
  }

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 py-24 md:py-36">
      
      {/* Cards Wrapper ensures we have enough scroll space */}
      <div className="cards-wrapper relative flex flex-col gap-[10vh] pb-[10vh]">

        {/* ── CARD 1: Philosophy ──────────────────────────────────────── */}
        <div className="stacked-card sticky top-[10vh] transform-gpu origin-top flex flex-col justify-center rounded-[2.5rem] bg-[#050505] p-8 sm:p-12 md:p-16 border border-white/[0.08] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[75vh]">
          {/* Decorative number */}
          <div aria-hidden className="pointer-events-none absolute -right-4 md:-right-6 top-8 select-none font-sans text-[clamp(120px,20vw,240px)] font-extralight leading-none tracking-[-0.04em] text-white/[0.015]">
            01
          </div>

          <SectionLabel number="01" title="Philosophy" />

          <p ref={philosophyRef} className="relative max-w-4xl font-sans text-[clamp(22px,3.6vw,40px)] font-extralight leading-[1.35] tracking-[-0.015em] text-white/75 mt-8 md:mt-12">
            I craft precise, performant user interfaces at the intersection of
            design and engineering. I care deeply about the details —{" "}
            <span className="text-white/95">animation curves, layout rhythm,</span>{" "}
            and the kind of polish that makes a digital product feel inevitable.
          </p>

          <div className="relative mt-auto pt-16 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-sans text-[13px] font-light text-white/30"
            >
              <MapPin size={13} className="shrink-0 opacity-60" />
              Kathmandu, Nepal
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={copyEmail}
              className="group flex items-center gap-3 font-sans text-[13px] font-light text-white/30 transition-colors duration-300 hover:text-white/70"
            >
              <Mail size={13} className="shrink-0 opacity-60 transition-transform duration-300 group-hover:scale-110" />
              devrakesh.tech@gmail.com
            </motion.button>
          </div>
        </div>

        {/* ── CARD 2: Expertise ─────────────────────────────────────── */}
        <div className="stacked-card sticky top-[13vh] transform-gpu origin-top flex flex-col justify-center rounded-[2.5rem] bg-[#050505] p-8 sm:p-12 md:p-16 border border-white/[0.08] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[75vh]">
          {/* Decorative number */}
          <div aria-hidden className="pointer-events-none absolute -right-4 md:-right-6 top-8 select-none font-sans text-[clamp(120px,20vw,240px)] font-extralight leading-none tracking-[-0.04em] text-white/[0.015]">
            02
          </div>

          <SectionLabel number="02" title="Expertise" />

          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4 mt-8 md:mt-12">
            {expertiseItems.map((item, i) => (
              <div key={item.title} className="expertise-row px-0 sm:px-4 first:pl-0 last:pr-0">
                <ExpertiseCard {...item} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CARD 3: Stack + Connect ──────────────────────────────────── */}
        <div className="stacked-card sticky top-[16vh] transform-gpu origin-top flex flex-col justify-center rounded-[2.5rem] bg-[#050505] p-8 sm:p-12 md:p-16 border border-white/[0.08] shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[75vh]">
          {/* Decorative number */}
          <div aria-hidden className="pointer-events-none absolute -right-4 md:-right-6 top-8 select-none font-sans text-[clamp(120px,20vw,240px)] font-extralight leading-none tracking-[-0.04em] text-white/[0.015]">
            03
          </div>

          <div className="relative grid grid-cols-1 gap-20 lg:grid-cols-[1fr_auto] lg:gap-32 w-full mt-8 md:mt-12">
            {/* Tech Stack */}
            <div>
              <SectionLabel number="03" title="Tech Stack" />
              <div className="skills-wrap flex flex-wrap gap-2.5 mt-8 md:mt-12">
                {skills.map((skill, i) => (
                  <SkillPill key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </div>

            {/* Connect */}
            <div className="min-w-[260px]">
              <SectionLabel number="04" title="Connect" />
              <div className="flex flex-col mt-8 md:mt-12">
                {socialLinks.map((link, i) => (
                  <SocialLink key={link.label} {...link} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}