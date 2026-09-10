import { experiences } from "@/data/experience"
import { Reveal } from "@/components/motion/Reveal"
import { ExpList } from "@/components/sections/ExpList"

/** Server Component — heading is static; ExpList is the interactive island. */
export default function Exp() {
  return (
    <section className="mt-12 max-w-5xl mx-auto mb-20">
      <Reveal variant="fadeUp">
        <div className="flex items-center gap-3 mb-6">
            <h2 className=" text-2xl font-sans text-primary font-semibold tracking-tight">
              Experience
            </h2>
        </div>
      </Reveal>

      <ExpList items={experiences} />
    </section>
  )
}
