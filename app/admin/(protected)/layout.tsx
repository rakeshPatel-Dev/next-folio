import { AppSidebar } from "@/components/app-siderbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { ADMIN_TITLE, APP_NAME } from "@/lib/constants";
import { ToastProvider } from "@/components/zenblocks/toast"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: {
    default: ADMIN_TITLE,
    template: ` %s | ${ADMIN_TITLE} | ${APP_NAME}`,
  },
  description: "Admin panel to manage portfolio content",
};



export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];

  if (!session || !adminEmails.includes(session.user?.email ?? "")) {
    redirect("/admin/login");
  }


  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-neutral-900/50">
        <AppSidebar />

        <div className="p-2">
          <SidebarTrigger />
        </div>
        <ToastProvider>
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </ToastProvider>

      </div>
      <Toaster position="top-right" duration={5000} closeButton className="" />
    </SidebarProvider>
  )
}
