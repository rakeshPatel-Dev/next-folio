import { MapPin, Globe, Facebook } from "lucide-react";
import { experiences } from "@/data/experience";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Experience = () => {
  return (
    <section className="mt-12  max-w-4xl mx-auto mb-20">
      <h2 className="text-2xl font-sans font-semibold mb-8 tracking-tight">
        Experience
      </h2>

      <div className="relative border-l border-neutral-300 dark:border-neutral-700 pl-6 space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative">
            {/* Timeline dot */}
            {/* <span className="absolute -left-2.25 top-2 h-4 w-4 rounded-full bg-primary" /> */}

            {/* Card */}
            <div className="space-y-3">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <div className="flex items-center gap-3 text-xl font-semibold">
                  <span className="font-sans">{exp.company}</span>

                  <div className="flex gap-2">
                    {exp.website && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            title="Website link"
                            href={exp.website}>
                            <Globe className="w-4 h-4 opacity-70 hover:opacity-100" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Website</TooltipContent>
                      </Tooltip>
                    )}

                    {exp.facebook && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            title="Facebook link"
                            href={exp.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Facebook className="w-4 h-4 opacity-70 hover:opacity-100" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Facebook</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground text-left sm:text-right">
                  <div className="flex items-center gap-1 justify-start sm:justify-end">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </div>
                  <p>{exp.period}</p>
                </div>
              </div>

              {/* Role */}
              <p className="text-lg font-sans text-muted-foreground font-medium">
                {exp.role}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap font-mono gap-2 pt-1">
                {exp.tech.map((t, i) => (
                  <span
                    key={i}
                    className="flex select-none items-center gap-2 rounded-full border border-dashed px-3 py-1 text-sm transition hover:scale-105 hover:bg-primary/5"
                  >
                    <t.icon style={{ color: t.color }} />
                    {t.name}
                  </span>
                ))}
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value="objectives">
                  <AccordionTrigger>
                    View Responsibilities
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc ml-5 space-y-1 text-muted-foreground">
                      {exp.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
