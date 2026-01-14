import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectDB } from "@/lib/mongoose"
import User from "@/models/userModel"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: string
  }
}

const handler = NextAuth({
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
      await connectDB()

      const existingUser = await User.findOne({ email: user.email })

      // 🔥 Only allow specific admin emails
      const allowedAdmins = process.env.ADMIN_EMAILS?.split(",") || []

      if (!allowedAdmins.includes(user.email!)) {
        return false
      }

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "admin",
        })
      }

      return true
    },

    async jwt({ token }) {
      await connectDB()
      const dbUser = await User.findOne({ email: token.email })

      if (dbUser) {
        token.role = dbUser.role
        token.id = dbUser._id
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
