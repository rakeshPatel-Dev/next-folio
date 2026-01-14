import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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
      // ✅ Allow only admin email to sign in
      if (user.email === process.env.ADMIN_EMAIL) {
        return true
      }
      return false
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
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
