import { useMemo } from 'react'
import { IconType } from 'react-icons'
import {
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs, 
  SiGithub, 
  SiOpenai,
  SiExpress, 
  SiJavascript, 
  SiTypescript, 
  SiShadcnui, 
  SiFirebase, 
  SiVite, 
  SiMongodb, 
  SiFramer
} from 'react-icons/si'
import { FaReact, FaNodeJs, FaYoutube, FaUnsplash, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { RiReactjsFill, RiTailwindCssFill, RiJavascriptFill } from 'react-icons/ri'
import { IoImage, IoSearch } from 'react-icons/io5'

const staticIcons: Record<string, IconType> = {
  // si
  SiNextdotjs, SiTailwindcss, SiNodedotjs, SiGithub, SiOpenai, 
  SiExpress, SiJavascript, SiTypescript, SiShadcnui, SiFirebase, 
  SiVite, SiMongodb, SiFramer,
  // fa
  FaReact, FaNodeJs, FaYoutube, FaUnsplash, FaHtml5, FaCss3Alt,
  // ri
  RiReactjsFill, RiTailwindCssFill, RiJavascriptFill,
  // io
  IoImage, IoSearch
}


export function useTechIcon(iconName?: string): IconType | null {
  return useMemo(() => {
    if (!iconName) return null
    return staticIcons[iconName] || null
  }, [iconName])
}

// Alternative: Load icon directly by name
export function getTechIcon(iconName?: string): IconType | null {
  if (!iconName) return null
  return staticIcons[iconName] || null
}