import { AppSidebar } from "@/components/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import "../globals.css"
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Manage portfolio content, blog posts, and projects",
}


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-50 dark:bg-neutral-900/50">

              <AppSidebar />

              {/* Trigger outside sidebar */}
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
      </body>
    </html>
  )
}

