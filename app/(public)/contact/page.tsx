import { PUBLIC_CONTACT_METADATA } from "@/lib/metadata"
import { ContactForm } from "@/components/contact/contact-form"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = PUBLIC_CONTACT_METADATA;

const page = () => {
  return (
    <main className="min-h-screen">
      <div className=" px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <div className="mb-16 space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Contact
          </p>
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            Let&apos;s work together.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            For collaborations, freelance work, or just to say hello — 
            I&apos;ll get back to you within 48 hours.
          </p>
        </div>

        {/* Direct contact */}
        <div className="mb-12 border-t border-b border-border/50 py-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Direct line</span>
            <Link 
              href="mailto:devrakesh.tech@gmail.com" 
              className="group flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/70"
            >
              devrakesh.tech@gmail.com
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </main>
  )
}

export default page