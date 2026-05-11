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
    <section className="hero-root relative flex min-h-svh w-full max-w-5xl mx-auto flex-col overflow-hidden font-sans">

      {/* ── Grid lines ── */}
      <div className="hero-grid pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      {/* ── Ghost BG lettermark ── */}
      <div
        className="pointer-events-none absolute right-[-0.02em] top-[-0.05em] z-0 select-none text-[clamp(180px,38vw,420px)] font-black leading-none tracking-[-0.05em] text-foreground opacity-[0.03]"
        aria-hidden="true"
      >
        RP
      </div>

      {/* ══════════ NAV ══════════ */}
      <nav
        className="hero-fade relative z-10 flex items-center justify-between border-b border-foreground/10 px-[clamp(20px,5vw,52px)] py-[clamp(20px,4vw,36px)]"
        style={{ animationDelay: "0.05s" }}
      >
        <span className="font-mono text-sm font-normal mt-1 uppercase tracking-[0.18em] text-muted-foreground">
          Rakesh Patel
        </span>

        <Link
          href="/contact"
          prefetch
          className="inline-flex items-center gap-1.5 border border-foreground/20 px-[18px] py-[9px] font-sans text-xs font-medium uppercase tracking-[0.22em] text-foreground/50 transition-colors hover:bg-foreground hover:text-background"
        >
          Get in Touch
          <ArrowUpRight className="h-[10px] w-[10px]" strokeWidth={1.2} />
        </Link>
      </nav>

      {/* ══════════ MAIN ══════════ */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-[clamp(20px,5vw,52px)] pb-[clamp(24px,4vw,48px)] pt-[clamp(32px,6vw,64px)]">
        <div>

          {/* ── Availability label ── */}
          <div
            className="hero-fade mb-[clamp(20px,4vw,36px)] flex items-center gap-3"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="hero-dot h-[6px] w-[6px] shrink-0 rounded-full bg-foreground" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/35">
              Available for work
            </span>
          </div>

          {/* ── Headline ── */}
          <div
            className="hero-rise"
            style={{ animationDelay: "0.25s" }}
          >
            <h1 className="text-[clamp(58px,14vw,130px)] font-black uppercase leading-[0.87] tracking-[-0.035em] text-foreground/90">
              Full<span className="hero-primary">stack</span>
              <br />
              <span className="text-foreground/25">Dev</span>eloper
            </h1>
          </div>

          {/* ── Divider ── */}
          <div
            className="hero-fade my-[clamp(24px,4vw,40px)] h-px bg-foreground/10"
            style={{ animationDelay: "0.5s" }}
          />

          {/* ── Bottom grid: desc + specs ── */}
          <div
            className="hero-rise grid grid-cols-1 gap-7 sm:grid-cols-2 sm:items-end"
            style={{ animationDelay: "0.55s" }}
          >
            {/* Description */}
            <p className="max-w-85 text-[clamp(13px,2.2vw,15px)] font-normal leading-[1.65] text-foreground/50">
              End-to-end solutions that{" "}
              <strong className="font-semibold text-foreground/80">scale and perform</strong>. From database design to
              dynamic interfaces, I craft complete systems that{" "}
              <strong className="font-semibold text-foreground/80">work seamlessly</strong>.
            </p>

            {/* Specs */}
            <ul className="flex flex-col gap-[10px] sm:items-end" aria-label="Specialisms">
              {specs.map(([num, label]) => (
                <li key={num} className="flex items-center gap-[10px]">
                  <span className="font-mono text-xs tracking-[0.1em] text-foreground/30">{num}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/45">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── CTAs ── */}
          <div
            className="hero-rise mt-[clamp(28px,5vw,52px)] flex flex-wrap items-center gap-[clamp(16px,3vw,28px)]"
            style={{ animationDelay: "0.72s" }}
          >
            <Link href="/projects" prefetch>
              <span className="inline-block cursor-pointer bg-foreground px-[clamp(22px,4vw,36px)] rounded-md py-3.5 font-sans text-xs font-bold uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-75">
                View Work
              </span>
            </Link>

            <a
              href="https://rakesh-patel-cv.tiiny.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-xs font-medium bg-muted rounded-md px-[clamp(22px,4vw,36px)] py-3.5 uppercase tracking-[0.22em] text-foreground transition-colors hover:text-foreground/60"
            >
              Resume
              <ArrowUpRight
                className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.1}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════ TICKER ══════════ */}
      <div
        className="hero-fade relative z-10  overflow-hidden border-t border-foreground/10"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      >
        <div className="hero-ticker flex min-w-full w-max py-3 transform-gpu" style={{ willChange: "transform" }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="shrink-0 border-r border-foreground px-8 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ STYLES ══════════ */}
      <style>{`
        /* Grid lines */
        .hero-grid::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px);
          background-size: clamp(60px, 10vw, 100px) clamp(60px, 10vw, 100px);
        }

        /* Outline headline word */
        .hero-outline {
          -webkit-text-stroke: 1.5px hsl(var(--foreground) / 0.85);
          color: transparent;
        }

        /* Pulsing dot */
        .hero-dot {
          animation: heroDotPulse 2.4s ease-in-out 1.2s infinite;
        }
        @keyframes heroDotPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }

        /* Entrance animations */
        .hero-rise {
          opacity: 0;
          transform: translateY(20px);
          animation: heroRise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
        .hero-fade {
          opacity: 0;
          animation: heroFade 0.7s ease-out forwards;
          will-change: opacity;
        }
        @keyframes heroRise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          to { opacity: 1; }
        }

        /* Scrolling ticker */
        .hero-ticker {
          animation: heroTicker 18s linear infinite;
          white-space: nowrap;
        }
        @keyframes heroTicker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}