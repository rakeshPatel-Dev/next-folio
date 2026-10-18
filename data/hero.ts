import { Facebook, Github, Instagram, Linkedin } from "lucide-react"
import { FaNodeJs, FaReact, SiNextdotjs, SiTypescript, SiX } from "@/components/icons"
import { siteConfig } from "@/lib/site-config"

export const heroTech = [
  {
    label: "React",
    Icon: FaReact,
    color: "#087ea4",
    colorDark: "#0b8ec0",
  },
  {
    label: "Next.js",
    Icon: SiNextdotjs,
    color: "#0d1117",
    colorDark: "#2f363d",
  },
  {
    label: "Node.js",
    Icon: FaNodeJs,
    color: "#2f6b2f",
    colorDark: "#3c8c3c",
  },
  {
    label: "TypeScript",
    Icon: SiTypescript,
    color: "#235a97",
    colorDark: "#3178C6",
  },
] as const

export const heroSocial = [
  {
    label: "GitHub",
    href: siteConfig.links.github,
    Icon: Github,
    color: "#0d1117",
    colorDark: "#161b22",
    labelWidthClass: "group-hover/expand:w-10",
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    Icon: Linkedin,
    color: "#004182",
    colorDark: "#00356b",
    labelWidthClass: "group-hover/expand:w-[3.25rem]",
  },
  {
    label: "X",
    href: siteConfig.links.twitter,
    Icon: SiX,
    color: "#000000",
    colorDark: "#ffffff",
    labelWidthClass: "group-hover/expand:w-5",
  },
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    Icon: Instagram,
    color: "#b02a45",
    colorDark: "#8f2137",
    labelWidthClass: "group-hover/expand:w-[3.75rem]",
  },
  {
    label: "Facebook",
    href: siteConfig.links.facebook,
    Icon: Facebook,
    color: "#0f5bb5",
    colorDark: "#0c4a94",
    labelWidthClass: "group-hover/expand:w-[3.75rem]",
  },
] as const

/** App-icon tiles under the hero — the dock swells around the pointer. */
export const techTiles = [
  // Frontend
  { label: "React", Icon: "FaReact" },
  { label: "Next.js", Icon: "SiNextdotjs" },
  { label: "TypeScript", Icon: "SiTypescript" },
  { label: "JavaScript", Icon: "SiJavascript" },
  { label: "Tailwind CSS", Icon: "SiTailwindcss" },
  { label: "Redux Toolkit", Icon: "SiRedux" },

  // Backend
  { label: "Node.js", Icon: "FaNodeJs" },
  { label: "Express.js", Icon: "SiExpress" },
  { label: "MongoDB", Icon: "SiMongodb" },
  { label: "PostgreSQL", Icon: "SiPostgresql" },
  { label: "Supabase", Icon: "SiSupabase" },

  // Tools
  { label: "Figma", Icon: "FaFigma" },
  { label: "Vercel", Icon: "SiVercel" },
  { label: "OpenCode", Icon: "SiOpencode" },
] as const
