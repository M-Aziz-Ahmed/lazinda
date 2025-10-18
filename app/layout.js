import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fabric Sampling Dashboard',
  description: 'Industrial Fabric Sampling Reports Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen text-slate-900`}>
        <SidebarProvider>
            <AppSidebar />
                  <SidebarTrigger />
                  {children}
        </SidebarProvider>
      </body>
    </html>
  );
}