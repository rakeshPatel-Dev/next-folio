"use client"

import { useEffect, useRef } from "react"

async function getGSAP() {
  const { gsap } = await import("gsap")
  const { ScrollTrigger } = await import("gsap/ScrollTrigger")
  const { SplitText } = await import("gsap/SplitText")
  gsap.registerPlugin(ScrollTrigger, SplitText)
  return { gsap, ScrollTrigger, SplitText }
}

/** Client island: attaches GSAP scroll/reveal effects to server-rendered About markup. */
export function AboutMeEffects({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    getGSAP().then(({ gsap, SplitText }) => {
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".stacked-card")

        cards.forEach((card, index) => {
          if (index === cards.length - 1) return

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          })
        })

        const philosophy = sectionRef.current?.querySelector<HTMLElement>(".philosophy-text")
        if (philosophy) {
          const split = new SplitText(philosophy, { type: "words" })
          gsap.fromTo(
            split.words,
            { opacity: 0.08, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.03,
              ease: "power2.out",
              scrollTrigger: {
                trigger: philosophy,
                start: "top 82%",
                end: "bottom 60%",
                scrub: false,
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        gsap.utils.toArray<HTMLElement>(".expertise-row").forEach((row) => {
          gsap.fromTo(
            row,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as unknown as gsap.EaseString,
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          )
        })
      }, sectionRef)
    })

    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative mx-auto w-full py-24 md:py-32">
      {children}
    </section>
  )
}
