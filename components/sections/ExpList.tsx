"use client"

import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import IconRenderer from "@/components/ui/IconRenderer"
import { ExpandIcon } from "@/components/ui/expand-icon"
import { experiences } from "@/data/experience"
import { cn } from "@/lib/utils";
import { DashedUnderline } from "../ui/dashed-underline";

type Experience = (typeof experiences)[number]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/** Client island: expandable experience cards. */
export function ExpList({ items }: { items: Experience[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="space-y-5 sm:space-y-3">
      {items.map((exp, idx) => {
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
              <button
                type="button"
                className="w-full cursor-pointer text-left group"
                onClick={() => setExpandedId(isExpanded ? null : idx)}
                aria-expanded={isExpanded}
              >
                <div className="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                      <h3 className="font-sans text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        {exp.company}
                      </h3>
                      {exp.isWorking && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] tracking-wider sm:text-[11px]">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Working
                        </span>
                      )}
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: [0.18, 0.89, 0.32, 1.27] }}
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-[background-color,color] duration-300 group-hover:bg-muted/90",
                          isExpanded ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                        )}
                      >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </div>
                    <p className="mt-0.5 font-mono text-xs font-semibold text-muted-foreground sm:text-sm">
                      {exp.role}
                    </p>
                  </div>

                  {/* Mobile: under role, left. Desktop: right column. */}
                  <div className="shrink-0 font-mono text-[11px] text-muted-foreground/80 sm:text-xs md:text-right md:text-sm md:text-muted-foreground">
                    <p className="md:hidden">
                      <span>{exp.period}</span>
                      <span className="mx-1.5 text-muted-foreground/40" aria-hidden>
                        ·
                      </span>
                      <span>{exp.location}</span>
                    </p>
                    <div className="hidden flex-col md:flex">
                      <span>{exp.period}</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mb-4 mt-5 sm:mb-5 sm:mt-8">
                      <DashedUnderline width={800} className="w-full max-w-full text-foreground" />
                      <div className="mt-4 space-y-5 sm:space-y-6">
                        <div>
                          <h4 className="text-sm text-foreground">
                            Technologies & Tools
                          </h4>
                          <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                            {exp.tech.map((t, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03, duration: 0.2 }}
                              >
                                <span
                                  aria-label={t.name}
                                  className="group/expand relative z-0 inline-flex items-center rounded-full p-1 pr-1 text-primary"
                                  style={{
                                    transitionTimingFunction:
                                      "cubic-bezier(0.18, 0.89, 0.32, 1.27)",
                                  }}
                                >
                                  <ExpandIcon
                                    label={t.name}
                                    icon={<IconRenderer name={t.icon} />}
                                    color={t.color}
                                    size={28}
                                    iconSize={15}
                                    labelWidthClass={t.labelWidth}
                                    grouped={false}
                                  />
                                </span>
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2 text-sm text-foreground sm:mb-3">
                            What I&rsquo;ve done
                          </h4>
                          <div className="space-y-1.5 sm:space-y-1">
                            {exp.objectives.map((obj, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                              >
                                <span className="shrink-0 text-muted-foreground">•</span>
                                <span className="min-w-0">{obj}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
