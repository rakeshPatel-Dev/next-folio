import { ArrowUpRight, Briefcase } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MagneticHover } from "../motion/Reveal";


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
      {/* Centered masked portrait (inspiration style) */}

          <div className="hero-glow absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div
              className="hero-glow-core w-[64%] h-[64%] sm:w-[56%] md:w-[46%] rounded-full"
            />
          </div>

      <div className="hero-photo pointer-events-none absolute inset-0 z-10 flex items-start justify-center">
        <div
          className="relative top-[-8%] h-svh w-[90%] sm:top-[-12%] sm:w-[76%] md:top-[-12%] md:w-[64%]"
          style={{
            maskImage: "linear-gradient(to bottom, black 30%, transparent 95%), linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%), linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
            WebkitMaskComposite: "source-in",
          }}
        >
          <Image
            src="https://res.cloudinary.com/dzebbt9j5/image/upload/v1779865854/rakesh_fkagx4.webp"
            alt="Rakesh Patel"
            fill
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 92vw, 780px"
            className="hero-img object-cover object-top"
          />
        </div>
      </div>

      {/* Original visual layers */}
      <div className="hero-grid pointer-events-none absolute inset-0 z-2" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[-0.02em] top-[-0.05em] z-2 select-none text-[clamp(180px,38vw,420px)] font-black leading-none tracking-[-0.05em] text-muted-foreground opacity-10"
        aria-hidden="true"
      >
        RP
      </div>

      <nav
        className="hero-fade relative z-10 flex items-center justify-end  border-muted-foreground px-[clamp(20px,5vw,52px)] py-[clamp(20px,4vw,36px)]"
        style={{ animationDelay: "0.05s" }}
      >
        {/* <span className="font-mono text-sm font-normal mt-1 uppercase tracking-[0.18em] text-muted-foreground">
          Rakesh Patel
        </span> */}

        <Link
          href="/contact"
          prefetch
          className="inline-flex items-center gap-1.5 border border-muted-foreground px-4.5 py-2.25 font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground transition-all hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
        >
          Get in Touch
          <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={1.2} />
        </Link>
      </nav>

        <div
            className="hero-fade mb-[clamp(20px,4vw,36px)] px-[clamp(20px,5vw,52px)] flex items-center gap-3 group"
            style={{ animationDelay: "0.15s" }}
           >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 transition-colors group-hover:text-foreground">
              Available for work
            </span>
          </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between px-[clamp(20px,5vw,52px)] pb-[clamp(18px,3vw,36px)] pt-[150px] sm:pt[180px] md:pt-[160px] lg:pt-[180px] xl:pt-[120px]">
        <div className="pt-10 sm:pt-0">
          

          <div
            className="hero-rise min-h-[clamp(100px,20vw,180px)] relative z-10 "
            style={{ animationDelay: "0.25s" }}
          >
            <h1 className="text-sm uppercase leading-relaxed tracking-[0.03em] text-foreground sm:text-xl sm:leading-20 sm:tracking-[0.035em]">
              Hi, I&apos;m <span className="hero-primary text-lg font-black sm:text-2xl">Rakesh Patel</span>, a
            </h1>
            <h1 className="text-[clamp(2.4rem,13vw,3.5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-foreground sm:text-6xl sm:leading-[0.87] sm:tracking-[-0.035em] md:text-7xl">
              Full<span className="hero-primary">stack</span>
              <br />
              <span className="text-muted-foreground">Dev</span>eloper
            </h1>
          </div>

          {/* <div
            className="hero-fade my-[clamp(24px,4vw,40px)] h-px bg-muted-foreground"
            style={{ animationDelay: "0.5s" }}
          /> */}

          <div
            className="hero-rise grid grid-cols-1 gap-7 py-6 sm:grid-cols-2 sm:items-end"
            style={{ animationDelay: "0.55s" }}
          >
            <p className="max-w-72 text-xs font-normal leading-[1.6] text-muted-foreground sm:max-w-85 sm:text-[clamp(13px,2.2vw,15px)] sm:leading-[1.65]">
              End-to-end solutions that{" "}
              <strong className="font-semibold text-foreground">scale and perform</strong>. From database design to
              dynamic interfaces, I craft complete systems that{" "}
              <strong className="font-semibold text-foreground">work seamlessly</strong>.
            </p>

            <dl className="flex flex-col gap-2.5 sm:items-end" aria-label="Specialisms">
              {specs.map(([num, label]) => (
                <div key={num} className="flex items-center gap-2.5">
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground sm:text-xs">{num}</dt>
                  <dd className="text-[10px] font-medium uppercase tracking-widest text-foreground sm:text-[11px]">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="hero-rise mt-[clamp(28px,5vw,52px)] flex flex-wrap items-center gap-[clamp(16px,3vw,28px)]"
            style={{ animationDelay: "0.72s" }}
          >
            <Link href="/projects" prefetch>
            <MagneticHover strength={0.4}>
              <span className="inline-flex items-center justify-center gap-2 cursor-pointer bg-foreground px-[clamp(20px,3vw,32px)] rounded-md py-3 font-sans text-xs font-bold uppercase tracking-[0.22em] border border-background/10 text-background transition-all hover:opacity-75 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2">
              <Briefcase className="size-4" strokeWidth={2} />
                View Work
              </span>
            </MagneticHover>
            </Link>

            <MagneticHover strength={0.4}
            
            >
            <a
              href={process.env.NEXT_PUBLIC_RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-xs font-medium bg-muted rounded-md border border-foreground/10 px-[clamp(22px,4vw,36px)] py-3 uppercase tracking-[0.22em] text-foreground transition-all hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              Resume
              <ArrowUpRight
                className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-1 group-active:-translate-y-1"
                strokeWidth={2}
              />
            </a>
              </MagneticHover>
          </div>
        </div>
      </div>

      <div
        className="hero-fade relative z-10 overflow-hidden border-t px-6 border-muted-foreground bg-background/50 backdrop-blur-[1px]"
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

      <style>{`
        .hero-root {
          min-height: 92svh;
        }

        .hero-img {
          filter: grayscale(1) brightness(0.65) contrast(1.15);
        }
        :root:not(.dark) .hero-img,
        :not(.dark) .hero-img {
          filter: grayscale(1) brightness(0.85) contrast(1.05);
        }

        .hero-glow-core {
          background: radial-gradient(ellipse at center, rgba(255, 200, 120, 0.22) 0%, rgba(255, 200, 120, 0.08) 55%, transparent 100%);
          filter: blur(48px);
          opacity: 0.85;
          mix-blend-mode: screen;
        }

        :root.dark .hero-glow-core,
        .dark .hero-glow-core {
          background: radial-gradient(ellipse at center, rgba(96, 165, 250, 0.24) 0%, rgba(59, 130, 246, 0.1) 55%, transparent 100%);
          opacity: 0.7;
        }

        .hero-photo {
          opacity: 0;
          transform: scale(1.03);
          animation: heroPhoto 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        @media (max-width: 640px) {
          .hero-root {
            min-height: 90svh;
          }

          .hero-root .hero-fade,
          .hero-root .hero-rise {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .hero-root {
            min-height: 90svh;
          }
        }

        @media (min-width: 1025px) {
          .hero-root {
            min-height: 90svh;
          }
        }

        @keyframes heroPhoto {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}