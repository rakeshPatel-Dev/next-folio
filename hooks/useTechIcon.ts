import { useMemo } from 'react'
import { IconType } from 'react-icons'
import * as AllSi from 'react-icons/si'
import * as AllFa from 'react-icons/fa'
import * as AllFa6 from 'react-icons/fa6'
import * as AllRi from 'react-icons/ri'
import * as AllIo from 'react-icons/io5'
import * as AllBi from 'react-icons/bi'
import * as AllAi from 'react-icons/ai'
import * as AllTb from 'react-icons/tb'
import * as AllHi2 from 'react-icons/hi2'
import * as AllBs from 'react-icons/bs'
import * as AllCg from 'react-icons/cg'
import * as AllFi from 'react-icons/fi'
import * as AllGi from 'react-icons/gi'
import * as AllGo from 'react-icons/go'
import * as AllGr from 'react-icons/gr'
import * as AllIm from 'react-icons/im'
import * as AllVsc from 'react-icons/vsc'
import * as AllWi from 'react-icons/wi'
import { techStacks } from '@/data/techStacks'

type IconInput = string | IconType | undefined | null

// Build a small static lookup from imported packs (keys are the exported names)
const PACK_LOOKUP: Record<string, Record<string, IconType>> = {
  si: AllSi as any,
  fa: AllFa as any,
  fa6: AllFa6 as any,
  ri: AllRi as any,
  io: AllIo as any,
  bi: AllBi as any,
  ai: AllAi as any,
  tb: AllTb as any,
  hi: AllHi2 as any,
  bs: AllBs as any,
  cg: AllCg as any,
  fi: AllFi as any,
  gi: AllGi as any,
  go: AllGo as any,
  gr: AllGr as any,
  im: AllIm as any,
  vsc: AllVsc as any,
  wi: AllWi as any,
}

function findInPacks(name: string): IconType | null {
  // try exact match across known packs (case-sensitive)
  for (const pack of Object.values(PACK_LOOKUP)) {
    if ((pack as any)[name]) return (pack as any)[name]
  }
  // try case-insensitive match
  const lower = name.toLowerCase()
  for (const pack of Object.values(PACK_LOOKUP)) {
    const foundKey = Object.keys(pack).find((k) => k.toLowerCase() === lower)
    if (foundKey) return (pack as any)[foundKey]
  }
  return null
}

export function useTechIcon(iconInput: IconInput): IconType | null {
  return useMemo(() => {
    if (!iconInput) return null

    // If a component was passed directly, return it
    if (typeof iconInput === 'function') return iconInput as IconType

    const name = String(iconInput)

    // 1) try lookup by exported icon name e.g. 'SiNextdotjs'
    const fromPacks = findInPacks(name)
    if (fromPacks) return fromPacks

    // 2) try matching against our techStacks `value` property (e.g. 'nextjs', 'typescript')
    const match = techStacks.find(
      (t) => t.value.toLowerCase() === name.toLowerCase() || t.label.toLowerCase() === name.toLowerCase()
    )
    if (match && match.icon) return match.icon as IconType

    return null
  }, [iconInput])
}

export function GetTechIcon(iconInput: IconInput): IconType | null {
  return useTechIcon(iconInput)
}