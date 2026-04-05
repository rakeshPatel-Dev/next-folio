export function GridPattern() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-50 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  )
}
