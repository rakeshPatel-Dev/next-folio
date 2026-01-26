import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) ?? []

export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  const email = session?.user?.email?.toLowerCase()

  if (!email || !adminEmails.includes(email)) {
    throw new Error("Unauthorized")
  }

  return session
}
