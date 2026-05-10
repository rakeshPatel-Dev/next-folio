"use client"

import { MapPin, Briefcase } from "lucide-react"
import { experiences } from "@/data/experience"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "@/components/motion/Reveal"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const Exp = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="mt-12 max-w-4xl mx-auto mb-20">

      {/* Section heading */}
      <Reveal variant="fadeUp">
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border/60 bg-muted/30">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="font-mono text-xs tracking-[0.14em] uppercase text-muted-foreground">
            Experience
          </span>
          <div className="flex-1 h-px bg-border/50" />
        </div>
      </Reveal>

      {/* Cards */}
      <div className="space-y-3">
        {experiences.map((exp, idx) => {
          const isOpen = openIdx === idx

          return (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
            >
              <div
                className={`
                  rounded-2xl border bg-card/40 backdrop-blur-sm
                  transition-all duration-300
                  ${isOpen
                    ? "border-border/80 bg-card/70"
                    : "border-border/40 hover:border-border/70 hover:bg-card/60"
                  }
                `}
              >
                {/* Card top */}
                <div className="p-6 sm:p-7">

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">

                    {/* Left: company + role */}
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-sans text-lg font-bold tracking-tight text-foreground">
                          {exp.company}
                        </span>

                        {exp.isWorking && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-500 font-mono text-[10px] tracking-widest uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/50" />
                              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            Working
                          </span>
                        )}
                      </div>

                      <p className="font-mono text-sm text-muted-foreground tracking-wide">
                        {exp.role}
                      </p>
                    </div>

                    {/* Right: location + period */}
                    <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1 shrink-0">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {exp.location}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tracking-wide">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Accordion trigger */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex items-center gap-3 w-full group cursor-pointer"
                  >
                    <span className="flex-1 h-px bg-linear-to-r from-border/80 to-transparent group-hover:bg-border transition-colors duration-200" />
                    <span className="font-mono text-xs tracking-[0.12em] uppercase text-muted-foreground group-hover:text-muted-foreground transition-colors duration-200">
                      {isOpen ? "Close" : "Details"}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-muted-foreground transition-colors duration-200" />
                    </motion.div>
                  </button>
                </div>

                {/* Accordion body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 space-y-5 border-t border-border/40">

                        {/* Tech chips */}
                        <div className="flex flex-wrap gap-2 pt-5">
                          {exp.tech.map((t, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-dashed border-border/60 font-mono text-xs text-muted-foreground cursor-default select-none hover:border-border hover:text-foreground hover:bg-muted/30 transition-all duration-150"
                            >
                              <t.icon className="w-3 h-3 shrink-0" style={{ color: t.color }} />
                              {t.name}
                            </motion.span>
                          ))}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-border/30" />

                        {/* Objectives */}
                        <ul className="space-y-0 divide-y divide-border/30">
                          {exp.objectives.map((obj, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                              className="flex gap-3 py-3 text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="font-mono text-xs text-muted-foreground pt-0.5 shrink-0 w-5">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {obj}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Stats row — optional, remove if not in your data */}
                        {/* {exp.stats && (
                          <div className="flex items-center gap-6 pt-1">
                            {exp.stats.map((s: { val: string; label: string }, i: number) => (
                              <div key={i} className="flex flex-col gap-0.5">
                                <span className="text-xl font-bold tracking-tight text-foreground leading-none">
                                  {s.val}
                                </span>
                                <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                                  {s.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )} */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default Exp