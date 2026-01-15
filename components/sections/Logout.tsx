"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function AdminLogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        signOut({
          callbackUrl: "/admin/login",
        })
      }
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  )
}
