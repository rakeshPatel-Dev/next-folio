"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-muted-foreground"> Sign in with Google to access admin panel </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 my-4">
          <p className="text-sm text-yellow-800"><strong>Caution:</strong> This is an admin-only area. Unauthorized login attempts are not permitted.</p>
        </div>

        <Button className=" cursor-pointer" onClick={() =>
          signIn("google", {
            callbackUrl: "/admin",
          })
        }> Sign in with Google </Button>
      </div>
    </div>

  )
}
