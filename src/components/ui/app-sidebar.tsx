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
  async function logout(e: any) {
    try {


      e.preventDefault();

      await signOut(auth).then(() => router.push("/"));
      // Successful logout, you can redirect or perform other actions

      console.log("User logged out successfully!");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <Sidebar>
      <SidebarMenu className="px-4 py-4 *:py-2">
      <SidebarMenuSub className="*:py-1">
                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <Link href="/main/dashboard"> Dashboard</Link>
                  </SidebarMenuButton>
                 

                </SidebarMenuSubItem>
                {/* <SidebarMenuSubItem /> */}
              </SidebarMenuSub>
        <Collapsible defaultOpen onOpenChange={() => setIsOpen(x => !x)} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild>
                <h3 className="flex justify-between"> Fund
                  <ChevronDown
                    className={`transition-transform duration-300 ease-in-out ${isopen ? '-rotate-90' : 'rotate-0'}`}
                  />
                  {/* { isopen ? <ChevronDown /> : <ChevronRight /> }  */}
                  {/* <ChevronDown  className="-rotate-90 transition-all"/>  */}
                </h3>

              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="*:py-1">
                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <Link href="/main/deposit"> Deposit Funds</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/withdraw"> Withdraw Funds</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/fund-logs"> User Fund Logs</Link>
                  </SidebarMenuButton>

                </SidebarMenuSubItem>
                {/* <SidebarMenuSubItem /> */}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild>
                <h3 className="flex justify-between"> Others
                  <ChevronDown
                    className={`transition-transform duration-300 ease-in-out ${issecondOpen ? '-rotate-90' : 'rotate-0'
                      }`}
                  />
                </h3>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub className="*:py-1">
                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <Link href="/main/copy-expert"> Copy Expert</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/signal"> Purchase Signal</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/loan">Loan</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/view-loans">View Loans</Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/upgrade">Upgrade Account </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/plans">My Plans </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/referral">Referral Program </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/verify">Verify Account </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="/main/profit-history">Profit History </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton>
                    <Link href="" onClick={logout}>Logout</Link>
                  </SidebarMenuButton>


                </SidebarMenuSubItem>
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
