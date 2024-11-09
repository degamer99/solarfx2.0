import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import useAuth from "@/components/authChecker"
import Ticker from "@/components/ui/ticker";
import Header from "@/components/Header";
import CopyrightFooter from "@/components/Copyright"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solarfx | Dashboard",
  description: "Welcome to your Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  // const user = useAuth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider> 
        <AppSidebar />
        <main className="min-h-screen bg-gray-100 w-full px-4 py-1 overflow-hidden">
          <Header />
          <Ticker /> 
          {children}  
          <CopyrightFooter />
        </main>
        
        {/* <useAuth /> */}
        {/* <SidebarTrigger /> */}
        
        </SidebarProvider>
        
        </body>
    </html>
  );
}
