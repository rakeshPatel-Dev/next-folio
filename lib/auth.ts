import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized")
  }

  return session
}
