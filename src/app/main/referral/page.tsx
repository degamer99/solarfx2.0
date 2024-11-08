"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Ticker from "@/components/ui/ticker";
import TradingViewWidget from "@/components/TradingVIew";
import Link from "next/link";
import Header from "@/components/Header"
import Card from "@/components/ui/card"
import PlaceOrder from "@/components/place-order";
import Referral from "@/components/referral";
import { DataTableDemo } from "@/components/ui/table-for-things";

export default function ReferralPage () {
    return (
        <>
            <main className="min-h-screen bg-gray-100 w-full px-4 overflow-hidden">
                <Header />
                <Ticker />
                <h2 className="font-bold text-xl mt-2">Hello, User</h2>
           
                <section>
                    <Referral />

                </section>
                <DataTableDemo />

            </main>
        </>
    );

}
