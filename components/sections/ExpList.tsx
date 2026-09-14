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
    <div className="space-y-3">
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
                className="w-full text-left group  cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : idx)}
                aria-expanded={isExpanded}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground">
                        {exp.company}
                      </h3>
                      {exp.isWorking && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full  border-emerald-500/30 bg-emerald-500/20  font-mono text-[11px] tracking-wider">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/60" />
                            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Working
                        </span>
                    )}
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: [0.18, 0.89, 0.32, 1.27] }}
                      className={cn("ml-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-muted/50 text-muted-foreground transition-[background-color,opacity,color] duration-300 group-hover:bg-muted/90", isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100")}
                    >
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                    </div>
                    <p className="font-mono text-sm font-semibold text-muted-foreground">
                      {exp.role}
                    </p>
                  </div>

                  <div className="flex flex-col  text-muted-foreground  justify-center items-end text-sm">
                      <span className="font-mono">{exp.period}</span>
                      <span className="">{exp.location}</span>
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
                    <div className="mt-8 mb-5">
                      <DashedUnderline width={800} className="text-foreground" />
                      <div className="mt-4 space-y-6">
                        <h4 className="text-sm text-foreground">
                          Technologies & Tools
                        </h4>
                        <div className="flex flex-wrap -mt-4 gap-2">
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

                        <div>
                          <h4 className="text-sm text-foreground mb-3">
                            What I&rsquo;ve done
                        </h4>
                          <div className="space-y-1">
                            {exp.objectives.map((obj, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                                className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
                              >
                                <span className="text-muted-foreground">•</span>
                                <span>{obj}</span>
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
