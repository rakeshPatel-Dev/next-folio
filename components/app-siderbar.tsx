"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { adminNav } from "@/config/adminNav"
import { headerData } from "@/config/headerData"
import { Home, Settings, LogOut, ShieldUser, User } from "lucide-react"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"

export function AppSidebar() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname?.startsWith(href) ?? false
  const { state } = useSidebar()


  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex items-center gap-2 px-3 py-4">
        <ShieldUser className="h-6 w-6 shrink-0" />
        {state === "expanded" && (
          <span className="font-semibold text-sm truncate">
            Portfolio Admin Panel
          </span>
        )}
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        {/* ADMIN */}
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map(item => (
                item.href ? (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={isActive(item.href)}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : null
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* WEBSITE */}
        <SidebarGroup>
          <SidebarGroupLabel>Website</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              {/* Manual HOME */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* From headerData */}
              {headerData.map(item => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* PROFILE + SETTINGS */}
      <SidebarFooter>
        <SidebarSeparator />

        {/* PROFILE */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/profile">
                <User />
                {state === "expanded" && (
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm font-medium truncate">
                      Admin
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator />

        {/* SETTINGS */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="top">
            <DropdownMenuItem asChild>
              <div className="flex items-center gap-2">
                <AnimatedThemeToggler />
                <span>Theme</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                signOut({
                  callbackUrl: "/admin/login",
                })
              }
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
