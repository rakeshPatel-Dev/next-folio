import GoogleProvider from "next-auth/providers/google"
import { connectDB } from "@/lib/mongoose"
import User from "@/models/userModel"

const adminEmails =
  process.env.ADMIN_EMAILS?.split(",").map(e => e.trim().toLowerCase()) ?? []

// Use type assertion for next-auth options (package types can conflict with our Session augmentation)
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async signIn({ user }: { user: { email?: string | null; name?: string | null; image?: string | null } }) {
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

    async jwt({ token }: { token: { email?: string | null; id?: string; role?: string } }) {
      if (!token.email) return token

      await connectDB()

      const dbUser = await User.findOne({ email: token.email })

      if (dbUser) {
        token.id = dbUser._id.toString()
        token.role = dbUser.role
      }

      return token
    },

    async session({ session, token }: { session: { user: { id?: string; role?: string } }; token: { id?: string; role?: string } }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }

      return session
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
}
