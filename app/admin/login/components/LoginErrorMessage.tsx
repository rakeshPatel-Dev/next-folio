"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ShieldAlert } from "lucide-react"

const errorMessages: Record<string, string> = {
  AccessDenied: "Login denied. You're not an authorized admin.",
  LockedOut: "Too many failed login attempts. Access is blocked for 24 hours.",
}

export function LoginErrorMessage() {
  const searchParams = useSearchParams()
  const error = useMemo(() => searchParams?.get("error") ?? undefined, [searchParams])
  const errorMessage = error ? errorMessages[error] ?? "Unable to sign in. Please try again." : null

  if (!errorMessage) return null

  return (
    <div className="bg-red-50 border flex items-center justify-center border-red-200 rounded-md p-3 text-left">
      <ShieldAlert className=" text-red-800 mr-2" />
      <p className="text-sm text-red-800 text-center font-medium">{errorMessage}</p>
    </div>
  )
}
