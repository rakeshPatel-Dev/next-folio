import { MapPin, FileScan } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { skills } from "@/data/skills"
import SectionLabel from "./about/SectionLabel"
import SkillPill from "./about/SkillPill"
import ExpertiseCard from "./about/ExpertiseCard"
import { SocialLinks } from "./about/SocialLinks"
import { expertiseItems } from "@/data/About"
import { AboutMeEffects } from "./about/AboutMeEffects"
import { CopyEmailButton } from "./about/CopyEmailButton"
import { siteConfig } from "@/lib/site-config"

/** Server Component — GSAP + copy-email are client islands. */
export function AboutMe() {
  const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK

  return (
    <AboutMeEffects>
      <div className="cards-wrapper relative flex flex-col gap-[10vh] pb-[10vh]">
        {/* ── CARD 1: Philosophy ──────────────────────────────────────── */}
        <div className="stacked-card sticky top-[10vh] flex min-h-[75vh] origin-top transform-gpu flex-col justify-center overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] sm:p-12 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute top-8 -right-4 font-sans text-[clamp(120px,20vw,240px)] leading-none font-extralight tracking-[-0.04em] text-muted select-none md:-right-2"
          >
            01
          </div>

          <SectionLabel number="01" title="Philosophy" />

          <p className="philosophy-text relative mt-8 max-w-4xl font-sans text-[clamp(16px,3vw,32px)] leading-[1.35] font-extralight tracking-[-0.015em] text-foreground md:mt-12">
            I craft precise, performant user interfaces at the intersection of design and
            engineering. I care deeply about the details —{" "}
            <span className="text-foreground/95">animation curves, layout rhythm,</span> and the
            kind of polish that makes a digital product feel inevitable.
          </p>

          <div className="relative mt-auto flex flex-col gap-5 pt-16 sm:flex-row sm:items-center sm:gap-12">
            <div className="flex items-center gap-3 font-sans text-sm font-light text-foreground">
              <MapPin size={13} className="shrink-0" />
              Kathmandu, Nepal
            </div>

            <CopyEmailButton email={siteConfig.author.email} />

            {resumeLink && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-foreground px-5 py-2.5 font-sans text-sm font-medium text-background transition-all duration-300 hover:scale-[1.02] active:scale-[0.96]"
                  >
                    <FileScan
                      size={14}
                      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span>Resume</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="border-border bg-popover text-xs tracking-wide text-popover-foreground">
                  Click to view
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* ── CARD 2: Expertise ─────────────────────────────────────── */}
        <div className="stacked-card sticky top-[13vh] flex min-h-[75vh] origin-top transform-gpu flex-col justify-center overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] sm:p-12 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute top-8 -right-4 font-sans text-[clamp(120px,20vw,240px)] leading-none font-extralight tracking-[-0.04em] text-muted select-none md:-right-6"
          >
            02
          </div>

          <SectionLabel number="02" title="Expertise" />

          <div className="relative mt-8 grid grid-cols-1 gap-0 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
            {expertiseItems.map((item, i) => (
              <div key={item.title} className="expertise-row px-0 first:pl-0 last:pr-0 sm:px-4">
                <ExpertiseCard {...item} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CARD 3: Stack + Connect ──────────────────────────────────── */}
        <div className="stacked-card sticky top-[16vh] flex min-h-[75vh] origin-top transform-gpu flex-col justify-center overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] sm:p-12 md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute top-8 -right-4 font-sans text-[clamp(120px,20vw,240px)] leading-none font-extralight tracking-[-0.04em] text-muted select-none md:-right-6"
          >
            03
          </div>

          <div className="relative mt-8 grid w-full grid-cols-1 gap-20 md:mt-12 lg:grid-cols-[1fr_auto] lg:gap-32">
            <div>
              <SectionLabel number="03" title="Tech Stack" />
              <div className="skills-wrap mt-8 flex flex-wrap gap-2.5 md:mt-12">
                {skills.map((skill, i) => (
                  <SkillPill key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </div>

            <div className="min-w-65">
              <SectionLabel number="04" title="Connect" />
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </AboutMeEffects>
  )
}
