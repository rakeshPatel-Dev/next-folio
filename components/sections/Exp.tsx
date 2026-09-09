import { Briefcase } from "lucide-react"
import { experiences } from "@/data/experience"
import { Reveal } from "@/components/motion/Reveal"
import { ExpList } from "@/components/sections/ExpList"

/** Server Component — heading is static; ExpList is the interactive island. */
export default function Exp() {
  return (
    <section className="mt-12 max-w-5xl mx-auto mb-20">
      <Reveal variant="fadeUp">
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-border/60 bg-muted/30">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-mono text-xs tracking-[0.14em] uppercase text-muted-foreground">
              Experience
            </h2>
            <p className="text-xs text-muted-foreground/50 mt-0.5">Professional journey</p>
          </div>
          <div className="flex-1 h-px bg-border/50" />
        </div>
      </Reveal>

      <ExpList items={experiences} />
    </section>
  )
}
