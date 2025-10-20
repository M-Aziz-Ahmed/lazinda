import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from "@/components/ui/sidebar";
import ConditionalSidebar from '@/components/ConditionalSidebar';
import { AuthProvider } from '@/app/context/AuthContext';


export const metadata = {
  title: 'Fabric Sampling Dashboard',
  description: 'Industrial Fabric Sampling Reports Management System',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SidebarProvider>
            <ConditionalSidebar />
            {children}
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}