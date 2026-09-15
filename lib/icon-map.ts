import type { SVGProps } from "react"
import type { ComponentType } from "react"
import {
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  SiExpress,
  SiFirebase,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiOpenai,
  SiPnpm,
  SiReactrouter,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  BiImage,
  BiLogoJavascript,
  BiLogoMongodb,
  BiLogoTailwindCss,
  BiLogoTypescript,
  AiFillGithub,
  AiOutlineYoutube,
  RiReactjsFill,
  RiTailwindCssFill,
  IoLogoJavascript,
  TbBrandNextjs,
} from "@/components/icons"

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Explicit registry of tech icons used in content/data.
 * Local SVGs only — never import react-icons packs (si alone is ~5MB).
 */
export const ICON_MAP = {
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  SiExpress,
  SiFirebase,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiOpenai,
  SiPnpm,
  SiReactrouter,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  BiImage,
  BiLogoJavascript,
  BiLogoMongodb,
  BiLogoTailwindCss,
  BiLogoTypescript,
  AiFillGithub,
  AiOutlineYoutube,
  RiReactjsFill,
  RiTailwindCssFill,
  IoLogoJavascript,
  TbBrandNextjs,
} as const satisfies Record<string, IconComponent>

export type IconName = keyof typeof ICON_MAP

export function getIcon(name?: string): IconComponent | null {
  if (!name) return null
  return (ICON_MAP as Record<string, IconComponent>)[name] ?? null
}

/** Brand color + glyph color per icon, matching the hero tech icons. */
const ICON_COLORS: Record<
  string,
  { color: string; colorDark?: string; iconColor?: string; labelWidth?: string }
> = {
  FaCss3: { color: "#1572b6", colorDark: "#1b7fd8", labelWidth: "group-hover/expand:w-[5ch]" },
  FaHtml5: { color: "#d84924", colorDark: "#e34c26", labelWidth: "group-hover/expand:w-[6ch]" },
  FaJs: { color: "#c9a200", colorDark: "#f7df1e", iconColor: "#1f2937", labelWidth: "group-hover/expand:w-[10ch]" },
  FaNodeJs: { color: "#2f6b2f", colorDark: "#3c8c3c", labelWidth: "group-hover/expand:w-[8ch]" },
  FaReact: { color: "#087ea4", colorDark: "#0b8ec0", labelWidth: "group-hover/expand:w-[7ch]" },
  SiExpress: { color: "#1a1a1a", colorDark: "#424242", labelWidth: "group-hover/expand:w-[7ch]" },
  SiFirebase: { color: "#e07b00", colorDark: "#ff9d2e", labelWidth: "group-hover/expand:w-[8ch]" },
  SiGit: { color: "#e04c2f", colorDark: "#f1502f", labelWidth: "group-hover/expand:w-[3ch]" },
  SiJavascript: { color: "#c9a200", colorDark: "#f7df1e", iconColor: "#1f2937", labelWidth: "group-hover/expand:w-[10ch]" },
  SiMongodb: { color: "#3f9142", colorDark: "#47a248", labelWidth: "group-hover/expand:w-[8ch]" },
  SiMongoose: { color: "#8f1239", colorDark: "#a0123e", labelWidth: "group-hover/expand:w-[8ch]" },
  SiNextdotjs: { color: "#0d1117", colorDark: "#2f363d", labelWidth: "group-hover/expand:w-[7ch]" },
  SiOpenai: { color: "#0f0f0f", colorDark: "#3a3a3a", labelWidth: "group-hover/expand:w-[11ch]" },
  SiPnpm: { color: "#e08b1c", colorDark: "#f69220", iconColor: "#1f2937", labelWidth: "group-hover/expand:w-[5ch]" },
  SiReactrouter: { color: "#b8004d", colorDark: "#d81b60", labelWidth: "group-hover/expand:w-[12ch]" },
  SiRedux: { color: "#5e3a9c", colorDark: "#764abc", labelWidth: "group-hover/expand:w-[5ch]" },
  SiShadcnui: { color: "#0d1117", colorDark: "#3f3f46", labelWidth: "group-hover/expand:w-[8ch]" },
  SiTailwindcss: { color: "#0284c7", colorDark: "#0ea5e9", labelWidth: "group-hover/expand:w-[11ch]" },
  SiTypescript: { color: "#235a97", colorDark: "#3178c6", labelWidth: "group-hover/expand:w-[10ch]" },
  BiImage: { color: "#4b5563", colorDark: "#6b7280", labelWidth: "group-hover/expand:w-[12ch]" },
  BiLogoJavascript: { color: "#c9a200", colorDark: "#f7df1e", iconColor: "#1f2937", labelWidth: "group-hover/expand:w-[10ch]" },
  BiLogoMongodb: { color: "#3f9142", colorDark: "#47a248", labelWidth: "group-hover/expand:w-[8ch]" },
  BiLogoTailwindCss: { color: "#0284c7", colorDark: "#0ea5e9", labelWidth: "group-hover/expand:w-[11ch]" },
  BiLogoTypescript: { color: "#235a97", colorDark: "#3178c6", labelWidth: "group-hover/expand:w-[10ch]" },
  AiFillGithub: { color: "#0d1117", colorDark: "#161b22", labelWidth: "group-hover/expand:w-[10ch]" },
  AiOutlineYoutube: { color: "#c7071a", colorDark: "#ff0000", labelWidth: "group-hover/expand:w-[11ch]" },
  RiReactjsFill: { color: "#087ea4", colorDark: "#0b8ec0", labelWidth: "group-hover/expand:w-[7ch]" },
  RiTailwindCssFill: { color: "#0284c7", colorDark: "#0ea5e9", labelWidth: "group-hover/expand:w-[11ch]" },
  IoLogoJavascript: { color: "#c9a200", colorDark: "#f7df1e", iconColor: "#1f2937", labelWidth: "group-hover/expand:w-[10ch]" },
  TbBrandNextjs: { color: "#0d1117", colorDark: "#2f363d", labelWidth: "group-hover/expand:w-[7ch]" },
}

export function getIconColors(name?: string): {
  color: string
  colorDark?: string
  iconColor?: string
  labelWidth?: string
} {
  if (name && ICON_COLORS[name]) return ICON_COLORS[name]
  return { color: "var(--foreground)", colorDark: "var(--foreground)", iconColor: "var(--background)" }
}
