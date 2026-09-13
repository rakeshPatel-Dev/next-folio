import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { TechIcon } from "../ui/tech-icon"
import { SocialIcon } from "../ui/social-icon"
import { HelloAnimation } from "../ui/hello-animation"
import { DashedUnderline } from "../ui/dashed-underline"
import DirectionTicker from "../ui/direction-ticker"
import { siteConfig } from "@/lib/site-config"
import { NowPlaying } from "../last-fm/now-playing"
import { FaNodeJs, FaReact, SiNextdotjs, SiTypescript } from "@/components/icons"

const heroTech = [
  {
    label: "React",
    Icon: FaReact,
    color: "#087ea4",
    colorDark: "#0b8ec0",
  },
  {
    label: "Next.js",
    Icon: SiNextdotjs,
    color: "#0d1117",
    colorDark: "#2f363d",
  },
  {
    label: "Node.js",
    Icon: FaNodeJs,
    color: "#2f6b2f",
    colorDark: "#3c8c3c",
  },
  {
    label: "TypeScript",
    Icon: SiTypescript,
    color: "#235a97",
    colorDark: "#3178C6",
  },
] as const

const heroSocial = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    Icon: Github,
    color: "#0d1117",
    colorDark: "#161b22",
    labelWidthClass: "group-hover/expand:w-14",
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    Icon: Linkedin,
    color: "#004182",
    colorDark: "#00356b",
    labelWidthClass: "group-hover/expand:w-[4.25rem]",
  },
  {
    label: "Twitter",
    href: siteConfig.links.twitter,
    Icon: Twitter,
    color: "#0c7abf",
    colorDark: "#0a689f",
    labelWidthClass: "group-hover/expand:w-14",
  },
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    Icon: Instagram,
    color: "#b02a45",
    colorDark: "#8f2137",
    labelWidthClass: "group-hover/expand:w-[4.75rem]",
  },
  {
    label: "Facebook",
    href: siteConfig.links.facebook,
    Icon: Facebook,
    color: "#0f5bb5",
    colorDark: "#0c4a94",
    labelWidthClass: "group-hover/expand:w-[4.5rem]",
  },
] as const

export default function HeroData() {
  const tickerItems = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "Firebase",
    "Express.js",
    "REST APIs",
  ]

  return (
    <section className="hero-root relative mx-auto flex w-full max-w-app flex-col justify-center overflow-hidden font-sans">
      <div className="flex flex-col items-start pt-[clamp(60px,8vw,100px)] pb-[clamp(28px,5vw,44px)] text-left">
        <div className="w-full" style={{ animationDelay: "0.05s" }}>
          <HelloAnimation />
          
        </div>

        <div
          className="hero-rise w-full"
          style={{ animationDelay: "0.15s" }}
        >
          <h1 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.2] tracking-tight text-foreground">
            I&apos;m Rakesh Patel, a full-stack developer.
          </h1>

          <div className="mt-5 text-justify space-y-3 text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.6] tracking-[-0.02em] text-muted-foreground">
            <p>
              I mess around with{" "}
              {heroTech.map(({ label, Icon, color, colorDark }, i) => (
                <span key={label}>
                  {i > 0 && <span className="text-muted-foreground">, </span>}
                  <TechIcon
                    label={label}
                    color={color}
                    colorDark={colorDark}
                    size={28}
                    iconSize={15}
                    icon={<Icon aria-hidden />}
                    className="mx-0.5"
                  />
                </span>
              ))}
              {" "}and whatever else I need to get something working. I like taking an
              idea and just seeing where I can take it.
            </p>

            <p>
              Most of what I learn comes from building random stuff, breaking it, fixing it,
              and doing it again. Sometimes it turns into something useful. Sometimes it doesn&apos;t.
              That&apos;s pretty much how I like to work.
            </p>
          </div>
        </div>

        <div
          className="hero-rise mt-6 space-y-3"
          style={{ animationDelay: "0.6s" }}
        >
          <NowPlaying />
        </div>

        <DashedUnderline
          width={200}
          style={{ animationDelay: "0.35s" }}
          className="hero-rise mt-5 border-foreground"
        />

        <div className="hero-rise mt-8 space-y-3" style={{ animationDelay: "0.5s" }}>
          <h2 className="text-2xl font-medium tracking-[0.04em] text-muted-foreground">
            Find me on
          </h2>

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

      <div
        className="hero-fade relative z-10 mt-auto overflow-hidden border-t border-muted-foreground bg-background/50 px-6 backdrop-blur-[1px]"
        style={{ animationDelay: "0.9s" }}
        aria-hidden="true"
      >
        <DirectionTicker items={tickerItems} duration={8} />
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
