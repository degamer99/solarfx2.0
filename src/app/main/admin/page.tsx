"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import TradingViewWidget from "@/components/TradingVIew";
import Link from "next/link";
import Card from "@/components/ui/card"
import PlaceOrder from "@/components/place-order";
import Referral from "@/components/referral";
import { DataTableDemo } from "@/components/ui/table-for-things";
import { useUserData } from "@/components/store";

export default function Admin() {
    const allUserData = useUserData( state => state.allUserData)
    const getAllUserData = useUserData( state => state.getAllUserData)
    getAllUserData()
    return (
        <div>
            <h2 className="font-bold text-xl mt-2">Hello, User</h2>
            <section>
                {allUserData.toString()}
                {/* <Referral /> */}
            </section>
            <DataTableDemo />
        </div>

    );

}
