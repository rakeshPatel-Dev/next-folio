import { PUBLIC_CONTACT_METADATA } from "@/lib/metadata"
import { ContactForm } from "@/components/contact/contact-form"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata = PUBLIC_CONTACT_METADATA;

const page = () => {
  return (
    <main className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_26%)]" />
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="space-y-6">
          <Badge variant="outline" className="w-fit gap-2 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" />
            Contact
          </Badge>
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Start a conversation that lands in the right place.
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg max-w-2xl">
              Use the form below to send a collaboration request, freelance brief, or project inquiry. It&apos;s connected to Formspree, so messages are delivered without a custom server endpoint.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="mailto:devrakesh.tech@gmail.com" className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
              devrakesh.tech@gmail.com
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <ContactForm />
      </div>
    </main>
  )
}

export default page
