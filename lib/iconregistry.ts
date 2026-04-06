// this file is now just for types
import { IconType } from "react-icons"

export type ICON_TYPES = "fa6" | "fa" | "si" | "tb" | "ai" | "bi" | "md" | "ri" | "io" | "hi" | "bs" | "cg" | "fi" | "gi" | "go" | "gr" | "im" | "vsc" | "wi" | "lucide"

// we define global ICON_PACKS as empty here to avoid bundling
// components that need the full registry will import from @/lib/all-icons dynamically
export const ICON_PACKS: any = {
  Lucide: {},
}

export const ALL_ICON_NAMES: string[] = []
