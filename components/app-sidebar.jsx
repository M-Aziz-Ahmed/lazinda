"use client"
import * as React from "react"
import { Calendar, Home, Inbox, Search, Settings, ClipboardList, User } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
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
    icon: ClipboardList,
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
  }
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
            <a
                href={'/settings'}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                aria-label={'Settings'}
              >
                <Settings />
              </a>
            <a
                href={'/profile'}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                aria-label={'profile'}
              >
                <User />
              </a>
          </div>
        </nav>
      )}

      {/* Make the sidebar collapsible into an icon rail on desktop */}
      <Sidebar collapsible={"icon"} variant="floating">
      <SidebarHeader>
        <div className="flex justify-end">
           <SidebarTrigger />
        </div>
       
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>
            <div className="flex justify-between w-full items-center">
              <div className="">Navigation Links</div>
              <SidebarTrigger />
            </div>
          </SidebarGroupLabel> */}
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
      <SidebarFooter>
        <SidebarGroupContent>
            <SidebarMenu>
              
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/profile" className="flex items-center">
                      <User className="bg-slate-100" />
                      <span className="border-l-2 border-slate-300 px-3 text-gray-600">Aziz Ahmed</span>

                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild>
                    <a href={`/settings`}>
                      <Settings />
                      {/* Let the sidebar menu button styling decide when to show labels (it reacts to collapsed state) */}
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              
            </SidebarMenu>
          </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
    </>
  )
}