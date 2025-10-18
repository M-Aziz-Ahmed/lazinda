"use client";

import { usePathname } from 'next/navigation';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ConditionalSidebar() {
  const pathname = usePathname();
  const showSidebar = pathname !== '/login';

  if (!showSidebar) {
    return null;
  }

  return (
    <>
      <AppSidebar />
      <SidebarTrigger className={''}/>
    </>
  );
}
