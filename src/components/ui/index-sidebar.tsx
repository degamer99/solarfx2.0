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

// Menu items.
const sidebarOptions = [
    {
        title: "Home",
        url: "#",
        icon: Home,
      },
      {
        title: "About",
        url: "#",
        icon: Inbox,
      },
      {
        title: "Faq",
        url: "#",
        icon: Calendar,
      },
      {
        title: "Help Center",
        url: "#",
        icon: Search,
      },
      {
        title: "Contact Us",
        url: "#",
        icon: Settings,
      },
]

export function AppSidebar() {
    const [isopen, setIsOpen] = useState(true)
    const [issecondOpen, setIssecondOpen] = useState(true)
    return (
        <Sidebar side="right">
            <SidebarContent>
             <SidebarGroup>
               <SidebarGroupLabel>Application</SidebarGroupLabel>
               <SidebarGroupContent>
                 <SidebarMenu>
                   {sidebarOptions.map((item) => (
                     <SidebarMenuItem key={item.title}>
                       <SidebarMenuButton asChild>
                         <a href={item.url}>
                           <item.icon />
                           <span>{item.title}</span>
                         </a>
                       </SidebarMenuButton>
                     </SidebarMenuItem>
                   ))}
                   <div className="w-full mx-auto flex gap-4"> 
                    <Button size="lg">Sign In</Button>
                   <Button size="lg"> Sign Up</Button>
                   </div>
                 </SidebarMenu>
               </SidebarGroupContent>
             </SidebarGroup>
           </SidebarContent>
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
