"use client"

export default function ExpertiseCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <div className="group relative flex flex-col justify-between border-t border-border bg-transparent px-0 py-10 transition-colors duration-500 hover:border-foreground">
      <div className="pointer-events-none absolute inset-0  opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <p className="mb-6 font-mono text-xs tracking-[0.25em] text-muted-foreground">0{index + 1}</p>
      <h3 className="mb-5 font-sans text-base font-light tracking-[-0.01em] text-primary">{title}</h3>
      <p className="font-sans text-sm font-light leading-[1.75] text-muted-foreground transition-colors duration-500 group-hover:text-foreground/45">{desc}</p>
    </div>
  )
}
