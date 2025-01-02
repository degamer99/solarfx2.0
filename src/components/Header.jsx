"use client"
import React, { useEffect } from 'react';
import SolarLogo from "../../public/images/solarLogo.png";
import { Button } from "@/components/ui/button";  // Example Shadcn component
import Image from 'next/image';  // for your logo
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { useMultiSidebar } from "@/components/ui/multisidebar"

const Header = () => {
  const { leftSidebar } = useMultiSidebar();
  const { toggleSidebar: toggleLeft } = leftSidebar;
  const { rightSidebar } = useMultiSidebar();
  const { toggleSidebar: toggleRight } = rightSidebar;
  // const {
  //   toggleSidebar,
  // } = useSidebar()

  // const openSidebar = () => {
  //   console.log("openSidebar")
  //   toggleSidebar();
  // }

  const handleLeft = () => {
    console.log("handling left")
    toggleLeft()
  }

  const handleRight = () => {
    console.log("handling right")
    toggleRight()
  }
  return (
    <header className="bg-gray-100 flex items-center py-3 ">
      <div className='flex lg:gap-2 lg:justify-normal items-center  justify-between w-full'>
        <AlignJustify className='lg:hidden' onClick={handleLeft} color='black' size="2.5rem" />
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
