"use client"

import { MapPin, Globe, Facebook, Briefcase } from "lucide-react"
import { experiences } from "@/data/experience"
import { motion } from "framer-motion"
import { Reveal } from "@/components/motion/Reveal"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

const Exp = () => {
  return (
    <section className="mt-12 max-w-4xl mx-auto mb-20">
      {/* Section heading */}
      <Reveal variant="fadeUp">
        <div className="flex items-center gap-3 mb-10">
          <Briefcase className="w-5 h-5 text-muted-foreground" />
          <h1 className="text-2xl font-sans font-semibold tracking-tight">
            Experience
          </h1>
        </div>
      </Reveal>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

        <div className="pl-8 space-y-14">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="relative group"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[2.15rem] top-1.5 flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-border group-hover:bg-foreground/30 transition-colors duration-300" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-foreground transition-colors duration-300" />
              </span>

              {/* Card */}
              <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 sm:p-6 space-y-4
                              hover:border-border hover:bg-card/70 transition-all duration-300">

                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  {/* Company + links */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-sans text-lg font-semibold tracking-tight">
                        {exp.company}
                      </span>

                      {/* Social icons */}
                      <div className="flex items-center gap-1.5">
                        {exp.website && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={exp.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                              >
                                <Globe className="w-3.5 h-3.5" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>Website</TooltipContent>
                          </Tooltip>
                        )}
                        {exp.facebook && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <a
                                href={exp.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                              >
                                <Facebook className="w-3.5 h-3.5" />
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>Facebook</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    {/* Role */}
                    <p className="mt-0.5 text-sm font-mono text-muted-foreground">
                      {exp.role}
                    </p>
                  </div>

                  {/* Location + period */}
                  <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-0.5 shrink-0">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/70">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 + i * 0.04, duration: 0.3, ease: "easeOut" }}
                      whileHover={{ y: -2, scale: 1.04 }}
                      className="flex select-none items-center gap-1.5 rounded-lg border border-dashed border-border
                                 px-2.5 py-1 font-mono text-xs text-muted-foreground
                                 hover:border-border/80 hover:text-foreground hover:bg-muted/40
                                 transition-colors duration-150 cursor-default"
                    >
                      <t.icon style={{ color: t.color }} className="w-3 h-3 shrink-0" />
                      {t.name}
                    </motion.span>
                  ))}
                </div>

                {/* Responsibilities accordion */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="objectives" className="border-0">
                    <AccordionTrigger className="py-2 text-xs font-mono text-muted-foreground hover:text-foreground hover:no-underline">
                      View Responsibilities
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pt-1">
                        {exp.objectives.map((obj, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                            className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                            {obj}
                          </motion.li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Exp