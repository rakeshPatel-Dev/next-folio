import * as FaIcons from "react-icons/fa"
import * as Fa6Icons from "react-icons/fa6"
import * as SiIcons from "react-icons/si"
import * as TbIcons from "react-icons/tb"
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import * as MdIcons from "react-icons/md"
import * as RiIcons from "react-icons/ri"
import * as IoIcons from "react-icons/io5"      // Ionicons 5
import * as HiIcons from "react-icons/hi2"      // Heroicons 2
import * as BsIcons from "react-icons/bs"       // Bootstrap Icons
import * as CgIcons from "react-icons/cg"       // css.gg
import * as FiIcons from "react-icons/fi"       // Feather Icons
import * as GiIcons from "react-icons/gi"       // Game Icons
import * as GoIcons from "react-icons/go"       // Github Octicons
import * as GrIcons from "react-icons/gr"       // Grommet Icons
import * as ImIcons from "react-icons/im"       // IcoMoon Free
import * as VscIcons from "react-icons/vsc"     // VS Code Icons
import * as WiIcons from "react-icons/wi"       // Weather Icons
import * as LucideIcons from "lucide-react"

export const ICON_PACKS = {
  Fa6: Fa6Icons,
  Fa: FaIcons,
  Si: SiIcons,
  Tb: TbIcons,
  Ai: AiIcons,
  Bi: BiIcons,
  Md: MdIcons,
  Ri: RiIcons,
  Io: IoIcons,
  Hi: HiIcons,
  Bs: BsIcons,
  Cg: CgIcons,
  Fi: FiIcons,
  Gi: GiIcons,
  Go: GoIcons,
  Gr: GrIcons,
  Im: ImIcons,
  Vsc: VscIcons,
  Wi: WiIcons,
  Lucide: LucideIcons,
}
export type ICON_TYPES = "fa6" | "fa" | "si" | "tb" | "ai" | "bi" | "md" | "ri" | "io" | "hi" | "bs" | "cg" | "fi" | "gi" | "go" | "gr" | "im" | "vsc" | "wi" | "lucide"

// flat list for search/autocomplete
export const ALL_ICON_NAMES = Array.from(
  new Set(
    Object.values(ICON_PACKS).flatMap((pack) =>
      Object.keys(pack)
    )
  )
).sort()
