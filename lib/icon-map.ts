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
