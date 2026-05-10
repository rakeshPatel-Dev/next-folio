"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
   MapPin, Mail,
  Github, Instagram, Linkedin, Facebook,
  FileScan,
} from "lucide-react"
import { useToast } from "../zenblocks/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { skills } from "@/data/skills"
import SectionLabel from "./about/SectionLabel"
import SkillPill from "./about/SkillPill"
import ExpertiseCard from "./about/ExpertiseCard"
import SocialLink from "./about/SocialLink"

/* ─── GSAP lazy loader ───────────────────────────────────────────────────── */

async function getGSAP() {
  const { gsap } = await import("gsap")
  const { ScrollTrigger } = await import("gsap/ScrollTrigger")
  const { SplitText } = await import("gsap/SplitText")
  gsap.registerPlugin(ScrollTrigger, SplitText)
  return { gsap, ScrollTrigger, SplitText }
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



/* ─── Social link ────────────────────────────────────────────────────────── */

const socialLinks = [
  { label: "GitHub", href: "https://github.com/rakeshpatel-dev", Icon: Github, image: "/brands/github.png" },
  { label: "Instagram", href: "https://instagram.com/rikesh_112", Icon: Instagram, image: "/brands/insta.png" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rakeshpatel-developer", Icon: Linkedin, image: "/brands/linkedin.png" },
  { label: "Facebook", href: "https://facebook.com/rakeshthedev", Icon: Facebook, image: "/brands/facebook.png" },
]



/* ─── Main Component ─────────────────────────────────────────────────────── */

export function AboutMe() {
  const { toast } = useToast()
  const sectionRef = useRef<HTMLElement>(null)
  const philosophyRef = useRef<HTMLParagraphElement>(null)

  /* ── GSAP parallax cards & text effects ─────────────────────────── */
  useEffect(() => {
    let ctx: any

    getGSAP().then(({ gsap, SplitText }) => {
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
            { y: 20, opacity: 0 },
            {
              y: 0,
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
    <section ref={sectionRef} className="relative mx-auto w-full  py-24 md:py-32">

      {/* Cards Wrapper ensures we have enough scroll space */}
      <div className="cards-wrapper relative flex flex-col gap-[10vh] pb-[10vh]">

        {/* ── CARD 1: Philosophy ──────────────────────────────────────── */}
        <div className="stacked-card sticky bg-card top-[10vh] transform-gpu origin-top flex flex-col justify-center rounded-[2.5rem]  p-8 sm:p-12 md:p-16 border border-border shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[75vh]">
          {/* Decorative number */}
          <div aria-hidden className="pointer-events-none absolute -right-4 md:-right-2 top-8 select-none font-sans text-[clamp(120px,20vw,240px)] font-extralight leading-none tracking-[-0.04em] text-muted">
            01
          </div>

          <SectionLabel number="01" title="Philosophy" />

          <p ref={philosophyRef} className="relative max-w-4xl font-sans text-[clamp(16px,3vw,32px)] font-extralight leading-[1.35] tracking-[-0.015em] text-foreground mt-8 md:mt-12">
            I craft precise, performant user interfaces at the intersection of
            design and engineering. I care deeply about the details —{" "}
            <span className="text-foreground/95">animation curves, layout rhythm,</span>{" "}
            and the kind of polish that makes a digital product feel inevitable.
          </p>

          <div className="relative mt-auto pt-16 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-sans text-sm font-light text-foreground"
            >
              <MapPin size={13} className="shrink-0" />
              Kathmandu, Nepal
            </motion.div>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={copyEmail}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-5 py-2.5 font-sans text-sm font-medium cursor-pointer text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.96]"
                >
                  <Mail size={14} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span>devrakesh.tech@gmail.com</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent className="border-border bg-popover text-popover-foreground text-sm tracking-wide">
                Click to copy
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.a
                  href="https://rakesh-patel-cv.tiiny.site"
                  target="_blank"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-5 py-2.5 font-sans text-sm font-medium cursor-pointer text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.96]"
                >
                  <FileScan size={14} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span>Resume</span>
                </motion.a>
              </TooltipTrigger>
              <TooltipContent className="border-border bg-popover text-popover-foreground text-xs tracking-wide">
                Click to view
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* ── CARD 2: Expertise ─────────────────────────────────────── */}
        <div className="stacked-card sticky bg-card top-[13vh] transform-gpu origin-top flex flex-col justify-center rounded-[2.5rem]  p-8 sm:p-12 md:p-16 border border-border shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[75vh]">
          {/* Decorative number */}
          <div aria-hidden className="pointer-events-none absolute -right-4 md:-right-6 top-8 select-none font-sans text-[clamp(120px,20vw,240px)] font-extralight leading-none tracking-[-0.04em] text-muted">
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
        <div className="stacked-card sticky bg-card top-[16vh] transform-gpu origin-top flex flex-col justify-center rounded-[2.5rem]  p-8 sm:p-12 md:p-16 border border-border shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[75vh]">
          {/* Decorative number */}
          <div aria-hidden className="pointer-events-none absolute -right-4 md:-right-6 top-8 select-none font-sans text-[clamp(120px,20vw,240px)] font-extralight leading-none tracking-[-0.04em] text-muted">
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
            <div className="min-w-65">
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