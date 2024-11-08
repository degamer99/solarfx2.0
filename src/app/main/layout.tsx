import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import useAuth from "@/components/authChecker"
import Ticker from "@/components/ui/ticker";


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
        
        {/* <useAuth /> */}
        {/* <SidebarTrigger /> */}
        {children}
        
        </SidebarProvider>
        
        </body>
    </html>
  );
}
