import { useMemo } from 'react'
import { IconType } from 'react-icons'
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import * as DiIcons from 'react-icons/di'
import * as TbIcons from 'react-icons/tb'
import * as MdIcons from 'react-icons/md'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io5'
import * as HiIcons from 'react-icons/hi2'
import * as BsIcons from 'react-icons/bs'
import * as CgIcons from 'react-icons/cg'
import * as FiIcons from 'react-icons/fi'
import * as GiIcons from 'react-icons/gi'
import * as GoIcons from 'react-icons/go'
import * as GrIcons from 'react-icons/gr'
import * as ImIcons from 'react-icons/im'
import * as WiIcons from 'react-icons/wi'

type IconLibrary = 'si' | 'fa' | 'bi' | 'ai' | 'di' | 'tb' | 'md' | 'ri' | 'io' | 'hi' | 'bs' | 'cg' | 'fi' | 'gi' | 'go' | 'gr' | 'im'  | 'wi' 

const iconLibraries = {
  si: SiIcons,
  fa: FaIcons,
  bi: BiIcons,
  ai: AiIcons,
  di: DiIcons,
  tb: TbIcons,
  md: MdIcons,
  ri: RiIcons,
  io: IoIcons,
  hi: HiIcons,
  bs: BsIcons,
  cg: CgIcons,
  fi: FiIcons,
  gi: GiIcons,
  go: GoIcons,
  gr: GrIcons,
  im: ImIcons,
  wi: WiIcons,
}

export function useTechIcon(iconName?: string): IconType | null {
  return useMemo(() => {
    if (!iconName) return null

    // Try to extract library prefix (e.g., "SiReact" -> "si")
    const prefix = iconName.substring(0, 2).toLowerCase() as IconLibrary
    const library = iconLibraries[prefix]

    if (!library) {
      console.warn(`Icon library "${prefix}" not found for icon "${iconName}"`)
      return null
    }

    const Icon = library[iconName as keyof typeof library] as IconType

    if (!Icon) {
      console.warn(`Icon "${iconName}" not found in library "${prefix}"`)
      return null
    }

    return Icon
  }, [iconName])
}

// Alternative: Load icon directly by name
export function getTechIcon(iconName?: string): IconType | null {
  if (!iconName) return null

  // Extract leading alphabetic prefix (e.g., "SiReact" -> "Si" -> "si")
  const prefixMatch = iconName.match(/^[A-Z][a-z]*/)
  if (!prefixMatch) return null

  const prefix = prefixMatch[0].toLowerCase() as IconLibrary
  const library = iconLibraries[prefix]

  if (!library) {
    console.warn(`Icon library "${prefix}" not found for icon "${iconName}"`)
    return null
  }

  const Icon = (library[iconName as keyof typeof library] as IconType) || null

  if (!Icon) {
    console.warn(`Icon "${iconName}" not found in library "${prefix}"`)
  }

  return Icon
}