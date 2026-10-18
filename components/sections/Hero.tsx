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
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.045em] text-foreground sm:mt-5">
            I&apos;m Rakesh Patel,
            <span className="mt-2 block max-w-2xl text-[clamp(1.35rem,3vw,2rem)] leading-[1.2] font-normal tracking-[-0.03em] text-muted-foreground">
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

          <div className="mt-5 max-w-2xl space-y-3 text-base leading-7 tracking-[-0.01em] text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
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
          <SectionHeading className="text-lg sm:text-xl">Find me on</SectionHeading>

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

      <div
        className="hero-fade relative z-10 mt-auto hidden py-4 sm:block"
        style={{ animationDelay: "0.9s" }}
      >
        <SectionHeading className="mb-2 text-lg sm:text-xl">Tech I work with</SectionHeading>
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
