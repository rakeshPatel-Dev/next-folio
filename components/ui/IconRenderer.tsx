import { getIcon } from "@/lib/icon-map"

type Props = {
  name?: string
  className?: string
  style?: React.CSSProperties
}

/** Renders a known brand/tech icon from the explicit registry (no dynamic pack imports). */
export default function IconRenderer({ name, className, style }: Props) {
  const Icon = getIcon(name)
  if (!Icon) return <span className={className} style={style} aria-hidden />
  return <Icon className={className} style={style} aria-hidden />
}
