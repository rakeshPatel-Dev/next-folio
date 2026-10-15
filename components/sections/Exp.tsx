import { experiences } from "@/data/experience"
import { Reveal } from "@/components/motion/Reveal"
import { ExpList } from "@/components/sections/ExpList"
import { SectionHeading } from "@/components/sections/section-heading"

/** Server Component — heading is static; ExpList is the interactive island. */
export default function Exp() {
  return (
    <section className="mx-auto mt-10 mb-16 max-w-app sm:mt-12 sm:mb-20">
      <Reveal variant="fadeUp">
        <div className="mb-4 flex items-center gap-3">
          <SectionHeading>Experience</SectionHeading>
        </div>
      </Reveal>

      <ExpList items={experiences} />
    </section>
  )
}
