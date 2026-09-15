"use client"

import { useState } from "react"
import { Check, Facebook, Linkedin, Link2 } from "lucide-react"
import { SiX } from "@/components/icons"
import { TooltipIcon } from "@/components/ui/tooltip-icon"

interface BlogShareProps {
  title: string
  url: string
}

export function BlogShare({ title, url }: BlogShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: "Share on X",
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#000000",
      colorDark: "#ffffff",
      Icon: SiX,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0a66c2",
      colorDark: "#0a66c2",
      Icon: Linkedin,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877f2",
      colorDark: "#1877f2",
      Icon: Facebook,
    },
  ]

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="ml-auto flex items-center gap-2" aria-label="Share this post">
      {links.map(({ label, href, color, colorDark, Icon }) => (
        <TooltipIcon
          key={label}
          label={label}
          href={href}
          color={color}
          colorDark={colorDark}
          size={28}
          iconSize={15}
          icon={<Icon aria-hidden />}
        />
      ))}
      <TooltipIcon
        label={copied ? "Link copied" : "Copy link"}
        onClick={copyLink}
        color="#64748b"
        colorDark="#94a3b8"
        size={28}
        iconSize={15}
        icon={
          copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden />
          )
        }
      />
    </div>
  )
}