import { AppSidebar } from "@/components/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Manage portfolio content, blog posts, and projects",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 👇 Server-side session check
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    // Redirect non-admins to login
    redirect("/admin/login");
  }

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
  );
}
