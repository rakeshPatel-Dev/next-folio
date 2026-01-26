import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) ?? []

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase()

      if (!email) return false

      // ✅ Allow only admin emails
      return adminEmails.includes(email)
    },

    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email
        token.isAdmin = adminEmails.includes(user.email.toLowerCase())
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
        ;(session.user as any).isAdmin = token.isAdmin
      }
      return session
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
}
