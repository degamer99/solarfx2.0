"use client"

import { Calendar, ChevronRight, Files, Home, Inbox, Search, Settings, Signal } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/multisidebar"
import { CollapsibleContent, Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"
import Link from 'next/link'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/components/firebase"
// import SolarLogo from "../public/images/solarLogo.png";
import SolarLogo from "../../../public/images/solarLogo.png";
import { Button } from "@/components/ui/button";  // Example Shadcn component
import Image from 'next/image';  // for your log
import { useUserData } from "../store"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { useMultiSidebar } from "@/components/ui/multisidebar"


export function AppSidebar() {
  const [isopen, setIsOpen] = useState(true)
  const [issecondOpen, setIssecondOpen] = useState(true)
  const [isConnectWalletOpen,setConnectWalletOpen] = useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()
  const { leftSidebar } = useMultiSidebar();
  const { toggleSidebar: toggleLeft } = leftSidebar;
  const { rightSidebar } = useMultiSidebar();
  const { toggleSidebar: toggleRight } = rightSidebar;

  const handleRight = () => {
    console.log("handling right")
    toggleRight()
  }

  const handleLeft = () => {
    console.log("handling left")
    toggleLeft()
  }

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
  useEffect(() => {
    if (!router) return;
    onAuthStateChanged(auth, async (user) => {
      // setUser(user);
      console.log(user?.uid, "this is console.log for user")
      if (!user) {
        router.push('/'); // Redirect to index page if not logged in
      } else if (user && user.uid == "fbHlaAd9V5SSp6AamRKW5996tOk1") {
        router.push("/main/admin"); //Redirect to admin page if you are the admin
      } else {
        console.log("a user")
        const get = useUserData.getState().get
        await get(user.uid)
      }


    });
    console.log("use effect summoned by router")
  }, [router])

  const handleOpenSettings = () => {
    console.log("i am consoling handle Open Settings")
  }

  const handleConnectWallet = () => {
    console.log("i am consoling handle connect wallet")
    handleLeft()
    handleRight()
  }
  
  return (<>
    <Sidebar side="left">
      <SidebarHeader className="px-4 pt-4">
        <Link href="/">

          <Image
            style={{ width: "6rem" }}
            // className=" scale-50"
            // style={{ width: "80%" }}
            src={SolarLogo}
            alt="My Image"
            unoptimized
          // width={40}
          // height={50}
          />
        </Link>

      </SidebarHeader>
      <SidebarContent className="*:ml-4 my-6 overflow-clip">
        <SidebarMenuButton>
          <Link href="/main/dashboard"> Dashboard</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/deposit"> Deposit Funds</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/withdrawal"> Withdraw Funds</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/user-funds"> User Fund Logs</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/copy-expert"> Copy Expert</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/purchase-signal"> Purchase Signal</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/loan">Loan</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/view-loans">View Loans</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/upgrade-account">Upgrade Account </Link>
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
        {/* <SidebarMenuButton onClick={handleConnectWallet}>
          <p>Connect Wallet</p>
        </SidebarMenuButton> */}
        <SidebarMenuButton onClick={handleConnectWallet}>
          <p>Connect Wallet</p>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="/main/support">Support</Link>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <Link href="" onClick={logout}>Logout</Link>
        </SidebarMenuButton>
        {/* <SidebarMenuButton onClick={handleOpenSettings}>
          <p>Settings</p>
        </SidebarMenuButton> */}
      </SidebarContent>
    </Sidebar>
    {
      !isMobile? 
      (<Dialog open={isConnectWalletOpen} onOpenChange={setConnectWalletOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          {/* <ProfileForm /> */}
        </DialogContent>
      </Dialog>)
      : 
      (       <Drawer open={isConnectWalletOpen} onOpenChange={setConnectWalletOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
      )
    }
    
    </>



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
