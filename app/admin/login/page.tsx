"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-muted-foreground">
          Sign in with Google to access admin panel
        </p>

        <Button onClick={() => signIn("google")}>
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
