import { getServerSession } from "next-auth/next"
import type { Session } from "next-auth"
import { authOptions } from "@/lib/auth-options"

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) ?? []

export async function getSession(): Promise<Session | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (await getServerSession(authOptions as any)) as Session | null
}

export async function requireAdmin(): Promise<Session> {
  const session = await getSession()

  const email = session?.user?.email?.toLowerCase()

  if (!session || !email || !adminEmails.includes(email)) {
    throw new Error("Unauthorized")
  }

  return session
}
