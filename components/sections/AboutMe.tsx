"use client"

import { motion } from "framer-motion"

import { ArrowUpRight, MapPin, Mail, Download, Github, Instagram, Linkedin, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

/* ─── Data ──────────────────────────────────────────────────────────── */

import { useToast } from "../zenblocks/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { skills } from "@/data/skills"
import type { Skill } from "@/data/skills"


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
      {children}
    </p>
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
          viewport={{ once: true }}
          variants={fadeUp}
          whileHover={{ y: -3, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="group flex items-center justify-center p-2.5 rounded-xl
                     border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm
                     hover:border-neutral-600 hover:bg-neutral-800/80
                     cursor-default transition-colors duration-200"
        >
          <Icon
            size={20}
            style={{ color }}
            className="opacity-70 group-hover:opacity-100 transition-all duration-200"
          />
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────── */

export function AboutMe() {

  const { toast } = useToast();
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        variant: "success",
        title: "Copied to clipboard",
        description: "Email copied to clipboard",
      });
    } catch {
      toast({
        variant: "error",
        title: "Failed to copy",
        description: "Could not copy to clipboard",
      });
    }
  };
  return (
    <div className="min-h-screen text-neutral-100 font-sans antialiased selection:bg-neutral-800">
      {/* subtle grid texture */}

      <div
        className="pointer-events-none -z-50 fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <main className="relative max-w-3xl mx-auto px-6 py-24 space-y-15">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start flex-col-reverse sm:flex-row justify-between gap-4"
          >
            <div className="flex-1">
              {/* availability badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono text-neutral-500 tracking-wider">
                  Open to opportunities
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="text-4xl font-bold tracking-tight text-foreground mb-1"
              >
                Rakesh Patel
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5 }}
                className="text-muted-foreground text-base mb-4"
              >
                Frontend Developer · UI Architect
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 text-muted-foreground text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} />
                  Tinkune, Kathmandu
                </span>
                <span
                  onClick={() => copyToClipboard("devrakesh.tech@gmail.com")}
                  className="flex items-center cursor-pointer active:scale-98 hover:text-primary transition-all duration-100 select-none gap-1.5">
                  <Mail size={12} />
                  devrakesh.tech@gmail.com
                </span>
              </motion.div>
            </div>

            {/* avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative shrink-0"
            >
              <div className="h-20 w-20 rounded-2xl overflow-hidden border border-neutral-800 ring-1 ring-neutral-700/50">
                <img
                  src="https://api.dicebear.com/8.x/notionists/svg?seed=rakesh&backgroundColor=1a1a1a"
                  alt="Rakesh Patel"
                  className="h-full w-full object-cover"
                />              </div>
            </motion.div>
          </motion.div>

          {/* bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="mt-8 text-muted-foreground text-sm leading-[1.8] border-l-2 border-neutral-800 pl-5"
          >
            I craft precise, performant user interfaces at the intersection of design
            and engineering. With 6+ years of production experience, I care deeply
            about the details — animation curves, layout rhythm, and the kind of
            polish that makes a product feel inevitable. I&apos;ve shipped at scale for
            companies that value craft.
          </motion.p>

          <div className="py-6">
            <SectionLabel>Technologies I work with</SectionLabel>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <SkillPill key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="mt-4 flex flex-wrap gap-3"
          >
            <Button
              size="sm"
              className="bg-neutral-100 text-neutral-950 hover:bg-white rounded-lg text-xs font-semibold tracking-wide gap-1.5 h-9"
            >
              <Download size={13} />
              Resume
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-neutral-800 bg-transparent text-neutral-300 hover:bg-neutral-900 hover:text-white rounded-lg text-xs font-semibold tracking-wide gap-1.5 h-9"
            >
              View Projects
              <ArrowUpRight size={13} />
            </Button>
          </motion.div>
        </section>

        <Separator className="bg-neutral-800/60" />

        {/* ── Focus areas ──────────────────────────────────────── */}
        <section>
          <SectionLabel>What I do best</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Interface Architecture", desc: "Component systems, design tokens, and scalable front-end structures." },
              { title: "Motion & Interaction", desc: "Framer Motion, GSAP, and CSS animations that delight without distracting." },
              { title: "Performance", desc: "Core Web Vitals, bundle analysis, lazy loading, and rendering strategy." },
              { title: "Design Collaboration", desc: "Fluent in Figma. I bridge the gap between pixel-perfect specs and code." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900/80 transition-all duration-200"
              >
                <p className="text-neutral-200 text-sm font-semibold mb-1.5">{item.title}</p>
                <p className="text-neutral-500 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Separator className="bg-neutral-800/60" />

        {/* ── Connect ──────────────────────────────────────────── */}
        <section>
          <SectionLabel>Links</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "GitHub", href: "https://github.com/rakeshpatel-dev", icon: Github },
              { label: "Instagram", href: "https://instagram.com/rikesh_112", icon: Instagram },
              { label: "LinkedIn", href: "https://linkedin.com/in/rakeshpatel-developer", icon: Linkedin },
              { label: "Facebook", href: "https://facebook.com/rakeshthedev", icon: Facebook },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-800 bg-transparent hover:border-neutral-600 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 text-xs font-medium transition-all duration-150"
              >
                <link.icon size={16} className="opacity-70 group-hover:opacity-100 transition-all duration-150" />
                {link.label}
                <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              </motion.a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}