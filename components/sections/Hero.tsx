import { TooltipIcon } from "../ui/tooltip-icon"
import { SocialIcon } from "../ui/social-icon"
import { HelloAnimation } from "../ui/hello-animation"
import { DashedUnderline } from "../ui/dashed-underline"
import { ToolDock, ToolDockTile } from "../ui/tool-dock"
import IconRenderer from "../ui/IconRenderer"
import { NowPlaying } from "../last-fm/now-playing"
import { SectionHeading } from "@/components/sections/section-heading"
import { heroTech, heroSocial, techTiles } from "@/data/hero"
import { getIconColors } from "@/lib/icon-map"
import { Button } from "../ui/button"
import type { CSSProperties } from "react"

/** Brand-filled app-icon tiles for the dock under the hero. */
const dockItems = techTiles.map(({ label, Icon }) => {
  const { color, colorDark, iconColor } = getIconColors(Icon)

  return {
    label,
    icon: (
      <ToolDockTile
        className="tool-tile-brand"
        style={
          {
            "--tile-brand-light": color,
            "--tile-brand-dark": colorDark ?? color,
            "--tile-fg": iconColor ?? "#ffffff",
          } as CSSProperties
        }
      >
        <IconRenderer name={Icon} className="size-[52%]" />
      </ToolDockTile>
    ),
  }
})

export default function HeroData() {
  const resumeLink = process.env.NEXT_PUBLIC_RESUME_LINK

  return (
    <section className="hero-root relative mx-auto flex w-full max-w-app flex-col justify-center overflow-hidden font-sans">
      <div className="flex flex-col items-start pt-15 text-left sm:pt-12 md:pt-[clamp(60px,8vw,100px)]">
        <div className="w-full" style={{ animationDelay: "0.05s" }}>
          <HelloAnimation />
        </div>

        <div className="hero-rise w-full" style={{ animationDelay: "0.15s" }}>
          <h1 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-foreground sm:mt-5 sm:text-3xl sm:leading-[1.2] md:text-4xl lg:text-[2.75rem]">
            I&apos;m Rakesh Patel,
            <span className="inline-block text-xl leading-tight font-normal tracking-tight text-muted-foreground sm:text-2xl sm:leading-[1.2] md:text-3xl lg:text-[1.75rem]">
              a full-stack developer building AI-native products and SaaS systems.
            </span>
          </h1>
          {resumeLink && (
            <Button
              asChild
              variant="outline"
              className="mt-4 inline-block rounded-full border-foreground/20 bg-transparent transition-colors duration-300 hover:border-foreground/40 hover:bg-foreground/5 sm:hidden"
            >
              <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          )}

          <div className="mt-3 space-y-2.5 text-justify text-[clamp(0.95rem,1.6vw,1.25rem)] leading-relaxed tracking-[-0.02em] text-muted-foreground sm:mt-5 sm:space-y-3 sm:leading-[1.6]">
            <p>
              I mess around with{" "}
              {heroTech.map(({ label, Icon, color, colorDark }, i) => (
                <span key={label}>
                  {i > 0 && <span className="text-muted-foreground">, </span>}
                  <TooltipIcon
                    label={label}
                    color={color}
                    colorDark={colorDark}
                    size={28}
                    iconSize={15}
                    icon={<Icon aria-hidden />}
                    className="mx-0.5"
                  />
                </span>
              ))}{" "}
              and whatever else I need to get something working. I like taking an idea and just
              seeing where I can take it.
            </p>

            <p>
              Most of what I learn comes from building random stuff, breaking it, fixing it, and
              doing it again. Sometimes it turns into something useful. Sometimes it doesn&apos;t.
              That&apos;s pretty much how I like to work.
            </p>
          </div>
        </div>

        <div className="hero-rise mt-6 space-y-3" style={{ animationDelay: "0.6s" }}>
          <NowPlaying />
        </div>

        <DashedUnderline
          width={200}
          style={{ animationDelay: "0.35s" }}
          className="hero-rise mt-5 border-foreground"
        />

        <div className="hero-rise mt-8 space-y-3" style={{ animationDelay: "0.5s" }}>
          <SectionHeading>Find me on</SectionHeading>

          <div className="flex flex-wrap items-center gap-2">
            {heroSocial.map(({ label, href, Icon, color, colorDark, labelWidthClass }) => (
              <SocialIcon
                key={label}
                label={label}
                href={href}
                color={color}
                colorDark={colorDark}
                labelWidthClass={labelWidthClass}
                icon={<Icon strokeWidth={1.75} />}
              />
            ))}
          </div>
        </div>
      </div>

      <DashedUnderline
        width={800}
        style={{ animationDelay: "0.35s" }}
        className="hero-rise mt-5 border-primary"
      />

      <div className="hero-fade relative z-10 mt-auto py-4" style={{ animationDelay: "0.9s" }}>
        <h2 className="mb-1 text-center font-sans text-xs tracking-[0.28em] text-muted-foreground uppercase">
          Tech I work with
        </h2>
        <ToolDock items={dockItems} size={56} label="Tech I work with" />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-rise,
          .hero-fade {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
