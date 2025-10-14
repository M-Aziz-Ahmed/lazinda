import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fabric Sampling Dashboard',
  description: 'Industrial Fabric Sampling Reports Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-red-400`}>
        <NavBar />
        {children}
        </body>
    </html>
  );
}