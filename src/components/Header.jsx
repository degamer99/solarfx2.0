"use client"
import React from 'react';
import SolarLogo from "../../public/images/solarLogo.png";
import { Button } from "@/components/ui/button";  // Example Shadcn component
import Image from 'next/image';  // for your logo
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { useSidebar } from "@/components/ui/sidebar"

const Header = () => {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  const openSidebar = () => {
    let newOpen = !open
    setOpen(newOpen)
    setOpenMobile(newOpen)
  }
  return (
    <header className="bg-gray-100 flex items-center py-3 ">
      <div className='flex lg:gap-2 lg:justify-normal items-center  justify-between w-full'>
        <AlignJustify onClick={openSidebar} color='black' size="2.5rem" />
        <Link href="/">
              <Image
                style={{ width: "8rem" }}
                // className=" scale-50"
                // style={{ width: "80%" }}
                src={SolarLogo}
                alt="My Image"
                unoptimized
              // width={40}
                // height={50}
              />
            </Link>

      </div>

        {/* Navigation Links */}
        <nav className="lg:flex hidden space-x-8">
          <Link href="/" className="hover:text-yellow-500">Home</Link>
          <Link href="/about" className="hover:text-yellow-500">About</Link>
          <Link href="/faq" className="hover:text-yellow-500">FAQ</Link>
          <Link href="/education" className="hover:text-yellow-500">Education</Link>
        </nav>
     


        {/* Optional Right Section for Sign-in or Buttons */}
        {/* <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </div> */}
    </header>
  );
};

export default Header;
