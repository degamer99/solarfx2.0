"use client"

import { Calendar, ChevronRight, Files, Home, Inbox, Search, Settings, Signal } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { CollapsibleContent, Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"
import Link from 'next/link'
import { useState } from "react"
import { Button } from "./button"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/components/Firebase"

// Menu items.
const sidebarOptions = [
  {
    title: "Home",
  },
  {
    title: "Inbox",
  },
  {
    title: "Calendar",
  },
  {
    title: "Search",
  },
  {
    title: "Settings",
  },
]

export function AppSidebar() {
  const [isopen, setIsOpen] = useState(true)
  const [issecondOpen, setIssecondOpen] = useState(true)
  const router = useRouter()
  async function logout (e) {
    try {
      e.preventDefault();
      await signOut(auth).then(() => router.push("/"));
      // Successful logout, you can redirect or perform other actions

      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <Sidebar>
      <SidebarMenu className="px-4 py-4 *:py-2">
        <SidebarMenuSub>
          <h3>Dashboard</h3>
        </SidebarMenuSub>
        <Collapsible defaultOpen onOpenChange={() => setIsOpen(x => !x)} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <h3 className="flex justify-between"> Fund
                <ChevronDown
                  className={`transition-transform duration-300 ease-in-out ${isopen ? '-rotate-90' : 'rotate-0'}`}
                />
                {/* { isopen ? <ChevronDown /> : <ChevronRight /> }  */}
                {/* <ChevronDown  className="-rotate-90 transition-all"/>  */}
              </h3>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="*:py-1">
                <Link href="/deposit"> Deposit Funds</Link>
                <Link href="/withdraw"> Withdraw Funds</Link>
                <Link href="/fund-logs"> User Fund Logs</Link>
                {/* <SidebarMenuSubItem /> */}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        <Collapsible defaultOpen onOpenChange={() => setIssecondOpen(x => !x)} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <h3 className="flex justify-between"> Others
                <ChevronDown
                  className={`transition-transform duration-300 ease-in-out ${issecondOpen ? '-rotate-90' : 'rotate-0'
                    }`}
                />
              </h3>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="*:py-1 *:flex *:gap-2 *:items-center">
                <p>
                  Copy Expert</p>
                <Link href="/signal"> Purchase Signal</Link>
                <Link href="/loan">Loan</Link>

                <Link href="/view-loans">View Loans</Link>
                <Link href="/upgrade">Upgrade Account </Link>
                <Link href="/plans">My Plans </Link>
                <Link href="/referral">Referral Program </Link>
                <Link href="/verify">Verify Account </Link>
                <Link href="/profit-history">Profit History </Link>
                <Link href="" onClick={logout}>Logout</Link>
                {/* <SidebarMenuSubItem /> */}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </Sidebar>

    //   <Sidebar>
    //   <SidebarContent>
    //     <SidebarGroup>
    //       <SidebarGroupLabel>Application</SidebarGroupLabel>
    //       <SidebarGroupContent>
    //         <SidebarMenu>
    //           {items.map((item) => (
    //             <SidebarMenuItem key={item.title}>
    //               <SidebarMenuButton asChild>
    //                 <a href={item.url}>
    //                   <item.icon />
    //                   <span>{item.title}</span>
    //                 </a>
    //               </SidebarMenuButton>
    //             </SidebarMenuItem>
    //           ))}
    //         </SidebarMenu>
    //       </SidebarGroupContent>
    //     </SidebarGroup>
    //   </SidebarContent>
    // </Sidebar>
  )
}
