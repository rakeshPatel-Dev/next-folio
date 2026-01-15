import { AppSidebar } from "@/components/app-siderbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.email !== process.env.ADMIN_EMAILS) {
    redirect("/admin/login")
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50 dark:bg-neutral-900/50">
          <AppSidebar />

          <div className="p-2">
            <SidebarTrigger />
          </div>

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>

          <Toaster position="top-right" />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
