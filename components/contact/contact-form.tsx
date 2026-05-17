"use client"

import { useState } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Sparkles, Send, Clock3, ShieldCheck } from "lucide-react"

export function ContactForm() {
  const [formState, handleSubmit] = useForm("mykvgajk")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <Card className="overflow-hidden border-foreground/10 bg-linear-to-br from-background via-background to-foreground/5 shadow-xl">
          <CardHeader className="space-y-4">
            <Badge variant="outline" className="w-fit gap-2 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              Contact channel
            </Badge>
            <div className="space-y-3">
              <CardTitle className="text-3xl sm:text-4xl tracking-tight">
                Let&apos;s build something precise.
              </CardTitle>
              <CardDescription className="max-w-xl text-base leading-7">
                Send a project idea, a freelance brief, or a quick question. This form is wired directly to Formspree, so submissions go straight to the configured inbox without custom backend plumbing.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
              <Mail className="h-5 w-5 text-foreground/80" />
              <p className="mt-3 text-sm font-medium">Email</p>
              <a href="mailto:devrakesh.tech@gmail.com" className="mt-1 block break-all text-sm text-muted-foreground hover:text-foreground transition-colors">
                devrakesh.tech@gmail.com
              </a>
            </div>
            <div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
              <MapPin className="h-5 w-5 text-foreground/80" />
              <p className="mt-3 text-sm font-medium">Response style</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Clear scope, quick acknowledgement, and a direct follow-up path.
              </p>
            </div>
            <div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
              <Clock3 className="h-5 w-5 text-foreground/80" />
              <p className="mt-3 text-sm font-medium">Typical reply</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Usually within 1-2 business days.
              </p>
            </div>
            <div className="rounded-2xl border bg-background/70 p-4 backdrop-blur">
              <ShieldCheck className="h-5 w-5 text-foreground/80" />
              <p className="mt-3 text-sm font-medium">Delivery</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Formspree handles submission delivery and basic form protection.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-foreground/10 shadow-xl shadow-foreground/5">
        <CardHeader>
          <CardTitle>Send a message</CardTitle>
          <CardDescription>
            Keep it short or include as much context as you need.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formState.succeeded ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="text-lg font-semibold">Thanks for reaching out.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Your message has been sent successfully. I&apos;ll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
                maxLength={120}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
              <ValidationError prefix="Email" field="email" errors={formState.errors} />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about the project, timeline, or question..."
                className="min-h-44 resize-none"
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
                maxLength={5000}
              />
              <ValidationError prefix="Message" field="message" errors={formState.errors} />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={formState.submitting}
            >
              {formState.submitting ? "Sending..." : "Send inquiry"}
              <Send className="h-4 w-4" />
            </Button>
          </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}