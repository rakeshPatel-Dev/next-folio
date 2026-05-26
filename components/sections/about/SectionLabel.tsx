export default function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-label mb-10 flex items-center gap-4 overflow-hidden">
      <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground">{number}</span>
      <div className="h-px w-6" />
      <h2 className="font-sans text-xs uppercase tracking-[0.28em] text-muted-foreground">{title}</h2>
    </div>
  )
}
