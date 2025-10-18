"use client"
import * as React from "react"
import { Calendar, Home, Inbox, Search, Settings, ClipboardCheck } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ClipboardCheck,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
 
export function AppSidebar() {
  const isMobile = useIsMobile()

  return (
    <>
      {/* Mobile icon rail: show clickable icons on small screens instead of only a toggle */}
      {isMobile && (
        <nav aria-label="Mobile quick navigation" className="fixed bottom-4 left-2 right-2 md:hidden w-[95%] z-50">
          <div className="flex gap-2 justify-center bg-white/90 p-2 rounded-lg shadow-lg">
            {items.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                aria-label={item.title}
              >
                <item.icon />
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Make the sidebar collapsible into an icon rail on desktop */}
      <Sidebar collapsible={"icon"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      {/* Let the sidebar menu button styling decide when to show labels (it reacts to collapsed state) */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </>
  )
}