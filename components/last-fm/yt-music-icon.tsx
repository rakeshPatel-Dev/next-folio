import type { SVGProps } from "react"

/** YouTube Music glyph — fill/stroke via currentColor for BrandIcon. */
export function YouTubeMusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="11" />
      <circle cx="12" cy="12" r="7" />
      <polygon fill="currentColor" stroke="none" points="10 7.5 16.5 12 10 16.5" />
    </svg>
  )
}