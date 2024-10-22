"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";

export default function Signin() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-xl py-10 px-8 flex flex-col gap-10">
                <div className="flex flex-col justify-center items-center">
                    <h2>Login into your account</h2>
                </div>
                <form action="" className="flex flex-col gap-4">
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <div className="flex justify-between text-xs ">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" />
                            <label>
                                Remember me
                            </label>

                        </div>
                        <Link href="https://example.com/forgot-password" className="">
                            Forgotten Password
                        </Link>

                    </div>
                    <Button> Sign In </Button>
                    <p className="text-xs text-center" >
                        Don't have an account? <Link href="https://example.com/forgot-password" >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );

}
