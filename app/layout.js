import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from "@/components/ui/sidebar";
import ConditionalSidebar from '@/components/ConditionalSidebar';
import { SessionProvider } from 'next-auth/react';
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata = {
  title: 'Fabric Sampling Dashboard',
  description: 'Industrial Fabric Sampling Reports Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <SidebarProvider>
            <ConditionalSidebar />
            {children}
          </SidebarProvider>
        </SessionProviderWrapper>  
      </body>
    </html>
  );
}