"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookCopy, BookOpen, Clock, Home, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/icons"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/prayer-times", label: "Prayer Times", icon: Clock },
  { href: "/quran", label: "Quran", icon: BookOpen },
  { href: "/hadith", label: "Hadith", icon: BookCopy },
  { href: "/insights", label: "AI Insights", icon: Sparkles },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <Button variant="ghost" className="h-10 w-full justify-start px-2 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center">
            <Logo className="size-6 text-primary" />
            <span className="ml-2 text-lg font-semibold group-data-[collapsible=icon]:hidden">
                Nejat Digital
            </span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  asChild
                >
                  <>
                    <item.icon />
                    <span>{item.label}</span>
                  </>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <div className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Nejat Digital
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
