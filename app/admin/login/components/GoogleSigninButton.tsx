// GoogleSignInButton.tsx
"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/admin" })}>
      Verify Your Email
    </Button>
  )
}
