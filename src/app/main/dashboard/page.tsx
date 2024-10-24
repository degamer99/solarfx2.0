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

export default function Dashboard () {
    return (
        <>
            <main className="min-h-screen bg-gray-100 w-full px-4 overflow-hidden">
                <Header />
                <Ticker />
                <h2 className="font-bold text-xl mt-2">Hello, User</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 py-4">
                    {/* <!-- First row with 3 cards --> */}
                    <div className="col-span-1">
                        {/* <!-- Card for Deposits --> */}
                        <div className="bg-blue-300 p-4 rounded shadow">
                            <h3 className="text-lg font-bold">Deposits</h3>
                            <p>$0.00</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        {/* <!-- Card for Profit --> */}
                        <div className="bg-green-300 p-4 rounded shadow">
                            <h3 className="text-lg font-bold">Profit</h3>
                            <p>$0.00</p>
                        </div>
                    </div>
                    <div className="col-span-1">
                        {/* <!-- Card for Withdrawals --> */}
                        <div className="bg-red-300 p-4 rounded shadow">
                            <h3 className="text-lg font-bold">Total Withdrawal</h3>
                            <p>$0.00</p>
                        </div>
                    </div>

                    {/* <!-- Second row with Chart and Assets panel --> */}
                    <div className="lg:col-span-2 col-span-1">
                        {/* <!-- Chart Component --> */}
                            <TradingViewWidget />
                       
                    </div>
                    <div className="col-span-1 items-start justify-items-start">
                        {/* <!-- Assets Panel --> */}
                            <PlaceOrder />
                        {/* <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold">Assets</h3>
                            <!-- Insert asset details here -->

                        </div> */}
                    </div>
                </div>

                {/* <div className="grid grid-cols-3 grid-rows-2 grid-areas gap-4">
                    <Card className="1st" depositPrice={1000} description="Deposit" currency="€" />
                    <Card className="2nd" depositPrice={1000} description="Total Withdrawal" currency="€" />
                    <Card className="3rd" depositPrice={500} description="Profit" />
                </div> */}
                <section>
                    <Referral />
                </section>
            </main>
        </>
    );

}
