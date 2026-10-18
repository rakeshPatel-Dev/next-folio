import type { SVGProps } from "react"

/** Local icon (from simple-icons/opencode) — no pack barrel. */
export function SiOpencode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24" fill="currentColor"
      role="img"
      aria-hidden
      {...props}
    >
      <path d="M22 24H2V0h20zM17 4.8H7v14.4h10z" />
    </svg>
  )
}
