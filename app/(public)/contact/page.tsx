import { PUBLIC_CONTACT_METADATA } from "@/lib/metadata"
import { ContactForm } from "@/components/contact/contact-form"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export const metadata = PUBLIC_CONTACT_METADATA

const Page = () => {
  return (
    <main className="mx-auto  max-w-2xl px-6 py-24 sm:py-32">
      {/* Header */}
      <div className="mb-12 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s work together.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          For collaborations, freelance work, or just to say hello —
          I&apos;ll get back to you within 48 hours.
        </p>
      </div>

      {/* Direct contact */}
      <Link
        href="mailto:devrakesh.tech@gmail.com"
        className="group mb-10 flex items-center justify-between border-y border-border/60 py-4 text-sm transition-colors hover:text-foreground"
      >
        <span className="text-muted-foreground">Direct line</span>
        <span className="flex items-center gap-1.5 font-medium">
          devrakesh.tech@gmail.com
          <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>

      {/* Form */}
      <ContactForm />
    </main>
  )
}

export default Page