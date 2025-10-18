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
          <div className="min-h-screen md:flex">
            {/* Sidebar (desktop) */}
            <AppSidebar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
              {/* Topbar: show trigger and branding. Trigger visible on mobile and desktop (md+) */}
              <header className="px-4 py-2">
                <div className="items-center gap-2">
                  {/* SidebarTrigger works for both mobile (sheet) and desktop (toggle) */}
                  <SidebarTrigger />
                </div>
              </header>

              <main className="flex-1 p-6 md:p-8 lg:p-10">
                <div className="mx-auto max-w-7xl">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}