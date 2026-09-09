"use client"

import SocialLink from "@/components/sections/about/SocialLink"
import { socialLinks } from "@/data/About"

/** Client island: social links need Lucide icon components (not serializable over RSC). */
export function SocialLinks() {
  return (
    <div className="flex flex-col mt-8 md:mt-12">
      {socialLinks.map((link, i) => (
        <SocialLink key={link.label} {...link} index={i} />
      ))}
    </div>
  )
}
