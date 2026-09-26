import type { SVGProps } from "react"

/** Local icon (from simple-icons/framer) — no pack barrel. */
export function SiFramer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24" fill="currentColor"
      role="img"
      aria-hidden
      {...props}
    >
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  )
}
