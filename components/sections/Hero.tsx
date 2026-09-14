import { TechIcon } from "../ui/tech-icon"
import { SocialIcon } from "../ui/social-icon"
import { HelloAnimation } from "../ui/hello-animation"
import { DashedUnderline } from "../ui/dashed-underline"
import DirectionTicker from "../ui/direction-ticker"
import { NowPlaying } from "../last-fm/now-playing"
import { heroTech, heroSocial, tickerItems } from "@/data/hero"

export default function HeroData() {
  return (
    <section className="hero-root relative mx-auto flex w-full max-w-app flex-col justify-center overflow-hidden font-sans">
      <div className="flex flex-col items-start pt-[clamp(60px,8vw,100px)]  text-left">
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

      <DashedUnderline
        width={800}
        style={{ animationDelay: "0.35s" }}
        className="hero-rise mt-5 border-primary"
      />

      <div
        className="hero-fade relative z-10 mt-auto overflow-hidden  bg-background/50 px-6 backdrop-blur-[1px]"
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
