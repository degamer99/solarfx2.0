import React from 'react';
import SolarLogo from "../../public/images/solarLogo.png";
import { Button } from "@/components/ui/button";  // Example Shadcn component
import Image from 'next/image';  // for your logo
import Link from 'next/link';
import { AlignJustify } from 'lucide-react';
import { useSidebar } from "@/components/ui/sidebar"

const Header = () => {

  return (
    <header className="bg-gray-100 flex items-center justify-between py-3 px-4 sticky top-0">
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


        {/* Navigation Links */}
        <nav className="lg:flex hidden space-x-8">
          <Link href="/" className="hover:text-green-700">Home</Link>
          <Link href="/" className="hover:text-green-700">About</Link>
          <Link href="/" className="hover:text-green-700">FAQ</Link>
          <Link href="/" className="hover:text-green-700">Education</Link>
        </nav>
     


        {/* Optional Right Section for Sign-in or Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="default" className='bg-green-700'>Sign Up</Button>
          </Link>
        </div>

    </header>
  );
};

export default Header;
