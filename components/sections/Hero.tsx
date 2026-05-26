import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function HeroData() {
  const specs = [
    ["01", "React / Next.js"],
    ["02", "Node.js / Express"],
    ["03", "Database Design"],
    ["04", "Full Stack Architecture"],
  ]

  const tickerItems = [
    "React", "Next.js", "Node.js", "TypeScript",
    "MongoDB", "Firebase", "Express.js", "REST APIs",
  ]

  return (
    <section className="hero-root relative flex min-h-svh max-w-5xl  w-full mx-auto flex-col overflow-hidden font-sans">

      {/* ── Grid lines ── */}
      <div className="hero-grid pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      {/* ── Ghost BG lettermark ── */}
      <div
        className="pointer-events-none absolute right-[-0.02em] top-[-0.05em] z-0 select-none text-[clamp(180px,38vw,420px)] font-black leading-none tracking-[-0.05em] text-muted-foreground opacity-10"
        aria-hidden="true"
      >
        RP
      </div>

      {/* ══════════ NAV ══════════ */}
      <nav
        className="hero-fade relative z-10 flex items-center justify-between border-b border-muted-foreground px-[clamp(20px,5vw,52px)] py-[clamp(20px,4vw,36px)]"
        style={{ animationDelay: "0.05s" }}
      >
        <span className="font-mono text-sm font-normal mt-1 uppercase tracking-[0.18em] text-muted-foreground">
          Rakesh Patel
        </span>

        <Link
          href="/contact"
          prefetch
          className="inline-flex items-center gap-1.5 border border-muted-foreground px-[18px] py-[9px] font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-all hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
        >
          Get in Touch
          <ArrowUpRight className="h-[10px] w-[10px]" strokeWidth={1.2} />
        </Link>
      </nav>

      {/* ══════════ MAIN ══════════ */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-[clamp(20px,5vw,52px)] pb-[clamp(24px,4vw,48px)] pt-[clamp(32px,6vw,64px)]">
        <div>

          {/* ── Availability badge ── */}
          <div
            className="hero-fade mb-[clamp(20px,4vw,36px)] flex items-center gap-3 group"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              {/* Pulsing dot ring - using pulse instead of ping for performance */}
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400/60" />
              {/* Core dot */}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors group-hover:text-foreground">
              Available for work
            </span>
          </div>

          {/* ── Headline ── */}
          <div
            className="hero-rise min-h-[clamp(100px,20vw,180px)]"
            style={{ animationDelay: "0.25s" }}
          >
            <h1 className="text-[clamp(58px,14vw,130px)] font-black uppercase leading-[0.87] tracking-[-0.035em] text-foreground">
              Full<span className="hero-primary">stack</span>
              <br />
              <span className="text-muted-foreground">Dev</span>eloper
            </h1>
          </div>

          {/* ── Divider ── */}
          <div
            className="hero-fade my-[clamp(24px,4vw,40px)] h-px bg-muted-foreground"
            style={{ animationDelay: "0.5s" }}
          />

          {/* ── Bottom grid: desc + specs ── */}
          <div
            className="hero-rise grid grid-cols-1 gap-7 sm:grid-cols-2 sm:items-end"
            style={{ animationDelay: "0.55s" }}
          >
            {/* Description */}
            <p className="max-w-85 text-[clamp(13px,2.2vw,15px)] font-normal leading-[1.65] text-muted-foreground">
              End-to-end solutions that{" "}
              <strong className="font-semibold text-foreground">scale and perform</strong>. From database design to
              dynamic interfaces, I craft complete systems that{" "}
              <strong className="font-semibold text-foreground">work seamlessly</strong>.
            </p>

            {/* Specs - Using dl for better semantics */}
            <dl className="flex flex-col gap-[10px] sm:items-end" aria-label="Specialisms">
              {specs.map(([num, label]) => (
                <div key={num} className="flex items-center gap-[10px]">
                  <dt className="font-mono text-xs tracking-[0.1em] text-muted-foreground">{num}</dt>
                  <dd className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── CTAs ── */}
          <div
            className="hero-rise mt-[clamp(28px,5vw,52px)] flex flex-wrap items-center gap-[clamp(16px,3vw,28px)]"
            style={{ animationDelay: "0.72s" }}
          >
            <Link href="/projects" prefetch>
              <span className="inline-block cursor-pointer bg-foreground px-[clamp(22px,4vw,36px)] rounded-md py-3.5 font-sans text-xs font-bold uppercase tracking-[0.22em] text-background transition-all hover:opacity-75 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2">
                View Work
              </span>
            </Link>

            <a
              href={process.env.NEXT_PUBLIC_RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-xs font-medium bg-muted rounded-md px-[clamp(22px,4vw,36px)] py-3.5 uppercase tracking-[0.22em] text-foreground transition-all hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              Resume
              <ArrowUpRight
                className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:-translate-y-1"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════ TICKER ══════════ */}
      <div
        className="hero-fade relative z-10 overflow-hidden border-t border-muted-foreground bg-background/50 backdrop-blur-[1px]"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      >
        <div className="hero-ticker flex min-w-full w-max py-3.5">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="shrink-0 border-r border-foreground/30 px-8 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap transition-colors hover:text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}