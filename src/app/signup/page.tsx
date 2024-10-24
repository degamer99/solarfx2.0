"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { Lock, Mail, Megaphone, Phone, User } from "lucide-react"


export default function SignUp() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-xl py-10 px-8 flex flex-col gap-10">
                <div className="flex flex-col justify-center items-center">
                    <h2>Create an Account</h2>
                </div>
                <form action="" className="flex flex-col gap-4">
                    <Input type="text" placeholder="Username" icon={<User />} label="Username" required/>
                    <Input type="email" placeholder="Email" icon={<Mail />} label="Email" required/>
                    <Input type="text" placeholder="Enter Phone Number" icon={<Phone />} label="Phone Number" required/>
                    <Input type="password" placeholder="Password" icon={<Lock />} label="Password" required/>
                    <Input type="password" placeholder="Confirm Password" icon={<Lock />} label="Comfirm Password" required/>
                    <Input type="text" placeholder="Referral Code" icon={<Megaphone />} label="Referral code"/>
                        <div className="flex items-center gap-1 my-auto">
                            <input type="checkbox" />
                            <label className="text-xs">
                               I agree to Solarfx Term and Conditions
                            </label>

                        </div>
                    {/* <div className="flex justify-between text-xs ">
                        <Link href="https://example.com/forgot-password" className="">
                            Forgotten Password
                        </Link>

                    </div> */}
                    <Button> Create Account </Button>
                    <p className="text-xs text-center" >
                        Already have an account? <Link href="/signin" className="font-bold" >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );

}
