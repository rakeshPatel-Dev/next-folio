import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroData() {
  return (
    <section className="hero-root relative mx-auto flex min-h-[92svh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl px-5 sm:px-10">


      {/* ═══════════════ CENTERED PHOTO ═══════════════ */}
      <div className="hero-photo absolute inset-0 z-[3] flex items-start justify-center">
        <div
          className="relative top-[-10%] h-[110%] w-[70%] sm:w-[55%] md:w-[45%]"
          style={{
            maskImage: "linear-gradient(to bottom, black 30%, transparent 95%), linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%), linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskComposite: "source-in"
          }}
        >
          <Image
            src="/images/realhero.png"
            alt="Rakesh Patel"
            fill
            priority
            sizes="(max-width: 640px) 70vw, (max-width: 768px) 55vw, 45vw"
            className="hero-img object-cover object-top"
          />
        </div>
      </div>

      {/* ═══════════════ CONTENT LAYER ═══════════════ */}
      <div className="relative z-[6] flex flex-1 flex-col justify-between px-2 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">

        {/* ── TOP ROW ── */}
        <div className="flex items-center justify-end">
          {/* <div
            className="hero-fade font-sans text-[11px] font-light uppercase tracking-[0.25em] text-foreground/20"
            style={{ animationDelay: "0s" }}
          >
            RP
          </div> */}

          <div
            className="hero-fade flex items-center"
            style={{ animationDelay: "0.05s" }}
          >
            <Link
              href="/contact"
              prefetch
              className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.05] px-4 py-2 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-foreground/60 backdrop-blur-sm transition-colors hover:bg-foreground/[0.1] sm:px-5 sm:py-2.5"
            >
              Get in Touch
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.2} />
            </Link>
          </div>
        </div>

        {/* ── MIDDLE: Title + Desc ── */}
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">

          {/* Left: Intro + Title */}
          <div className="w-full sm:max-w-[55%]">
            <p
              className="hero-rise mb-2 font-sans text-[12px] font-extralight tracking-[0.1em] text-foreground/25 sm:mb-3 sm:text-[13px]"
              style={{ animationDelay: "0.1s" }}
            >
              Hey, I&apos;m a
            </p>
            <h1
              className="hero-rise font-sans text-[clamp(40px,9vw,68px)] font-black uppercase leading-[0.88] tracking-[-0.02em] text-foreground/90"
              style={{ animationDelay: "0.2s" }}
            >
              Frontend
              <br />
              <span className="text-foreground/10">Developer</span>
            </h1>
          </div>

          {/* Right: Description block */}
          <div
            className="hero-rise w-full max-w-[320px] text-left sm:max-w-[280px] sm:text-right"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="font-sans text-[14px] font-semibold leading-[1.4] tracking-[-0.01em] text-foreground/65 sm:text-[15px]">
              Clean code should feel invisible.
            </p>
            <p className="mt-1.5 font-sans text-[11px] font-extralight leading-[1.7] text-foreground/25 sm:mt-2 sm:text-[12px]">
              From architecture to animation, I build interfaces that connect and perform.
            </p>
          </div>
        </div>

        {/* ── CTAs ── */}
        <div
          className="hero-rise mt-6 flex items-center gap-5 sm:absolute sm:bottom-[120px] sm:right-8 sm:mt-0 md:right-14"
          style={{ animationDelay: "0.55s" }}
        >
          <Link href="/projects" prefetch>
            <span className="inline-block cursor-pointer border border-foreground/15 bg-foreground px-5 py-3 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-85 sm:px-7 sm:py-[13px]">
              View Work
            </span>
          </Link>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-sans text-[10px] font-extralight uppercase tracking-[0.22em] text-foreground/20 transition-colors hover:text-foreground/50"
          >
            Resume
            <ArrowUpRight
              className="h-[11px] w-[11px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1}
            />
          </a>
        </div>

        {/* ── BOTTOM: Specialisms row ── */}
        <div
          className="hero-fade mt-6 grid grid-cols-2 gap-4 sm:mt-0 sm:flex sm:flex-wrap sm:items-end sm:justify-between sm:gap-y-4"
          style={{ animationDelay: "0.85s" }}
        >
          {[
            ["#01", "React / Next.js"],
            ["#02", "Motion Design"],
            ["#03", "UI Engineering"],
            ["#04", "Design Systems"],
          ].map(([num, label]) => (
            <div key={num} className="flex flex-col gap-[3px]">
              <span className="font-mono text-[10px] font-medium tracking-[0.08em] text-foreground/20">
                {num}
              </span>
              <span className="font-sans text-[11px] font-extralight tracking-[0.04em] text-foreground/35">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CSS: theme tokens + animations ── */}
      <style>{`
        /* Theme-adaptive tokens */
        :root {
          --hero-bg: #f0ede8;
        }
        .dark {
          --hero-bg: #0e0e0e;
        }

        /* Photo treatment: light → higher brightness, less contrast crush */
        .hero-img {
          filter: grayscale(1) brightness(0.65) contrast(1.15);
        }
        :root:not(.dark) .hero-img,
        :not(.dark) .hero-img {
          filter: grayscale(1) brightness(0.85) contrast(1.05);
        }

        /* Entrance animations — CSS-only for zero-JS LCP */
        .hero-rise {
          opacity: 0;
          transform: translateY(18px);
          animation: heroRise 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-fade {
          opacity: 0;
          animation: heroFade 0.9s ease-out forwards;
        }
        .hero-photo {
          opacity: 0;
          transform: scale(1.03);
          animation: heroPhoto 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
        @keyframes heroRise {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          to { opacity: 1; }
        }
        @keyframes heroPhoto {
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}