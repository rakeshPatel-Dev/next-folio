import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectDB } from "@/lib/mongoose"
import User from "@/models/userModel"

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) ?? []

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

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
      if (!email || !adminEmails.includes(email)) return false

      await connectDB()

      const existingUser = await User.findOne({ email })
      if (!existingUser) {
        await User.create({
          name: user.name,
          email,
          image: user.image,
          role: "admin",
        })
      }

      return true
    },

    async jwt({ token }) {
      // ❗ DO NOT connect DB on every request
      return token
    },

    async session({ session }) {
      return session
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
}
