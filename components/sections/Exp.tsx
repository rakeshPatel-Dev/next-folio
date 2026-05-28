"use client"

import { MapPin, Briefcase, Calendar, ChevronDown } from "lucide-react"
import { experiences } from "@/data/experience"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "@/components/motion/Reveal"
import { useState } from "react"
import IconRenderer from "@/components/forms/project/IconRenderer"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const Exp = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section className="mt-12 max-w-5xl mx-auto mb-20">
      {/* Section heading */}
      <Reveal variant="fadeUp">
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border/60 bg-muted/30">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-mono text-xs tracking-[0.14em] uppercase text-muted-foreground">
              Experience
            </h2>
            <p className="text-xs text-muted-foreground/50 mt-0.5">Professional journey</p>
          </div>
          <div className="flex-1 h-px bg-border/50" />
        </div>
      </Reveal>

      {/* Cards grid */}
      <div className="space-y-4">
        {experiences.map((exp, idx) => {
          const isExpanded = expandedId === idx

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
                  rounded-2xl border transition-all duration-300
                  ${isExpanded
                    ? "border-border bg-card shadow-sm"
                    : "border-border/40 bg-card/30 hover:border-border/60 hover:bg-card/40"
                  }
                `}
              >
                {/* Header - always visible */}
                <div 
                  className="p-5 sm:p-6 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : idx)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left section */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                        <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground">
                          {exp.company}
                        </h3>
                        {exp.isWorking && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-500 font-mono text-[10px] tracking-wider uppercase">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/60" />
                              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </span>
                            Current
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-sm text-muted-foreground">
                        {exp.role}
                      </p>
                    </div>

                    {/* Right section - meta info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-mono text-xs">{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-border/30">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/50">
                      {isExpanded ? "Show less" : "Show more"}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-t border-border/40"
                    >
                      <div className="p-5 sm:p-6 space-y-6">
                        
                        {/* Tech stack */}
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/50 mb-3">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03, duration: 0.2 }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border/50 bg-muted/20 text-xs text-muted-foreground"
                              >
                                <IconRenderer
                                  name={t.icon}
                                  className="w-3 h-3"
                                  style={{ color: t.color }}
                                />
                                {t.name}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Key responsibilities & achievements */}
                        <div>
                          <h4 className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/50 mb-3">
                            Key Highlights
                          </h4>
                          <div className="space-y-2">
                            {exp.objectives.map((obj, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                                className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                              >
                                <span className="text-muted-foreground/30 mt-0.5">•</span>
                                <span>{obj}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
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