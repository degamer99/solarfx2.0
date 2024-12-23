"use client"

import { DataTableDemo } from "@/components/ui/table-for-things"
import Header from "@/components/Header"
import Ticker from "@/components/ui/ticker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserData } from "@/components/store";

export default function Deposit() {
    const getPaymentData = useUserData( state => state.getPaymentData)
    const paymentData = useUserData( state => state.paymentData)
    useEffect(() => {
        getPaymentData()
    }, [])
    const router = useRouter()
    const [formData, setFormData] = useState({
        method: "",
        amount: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSelectChange = (e: any) => {
        // console.log(e)
        const value  = e;
        setFormData({
            ...formData,
            method: value,
        });
    };
    const onSubmit = () => {
        const queryString = new URLSearchParams(formData).toString()
        console.log(formData)
        router.push(`/main/payment?${queryString}`);
    }

    return (
        <div>
            <h2 className="text-5xl font-bold py-6">Deposit</h2>
            <div className="bg-white px-4 py-8 flex flex-col gap-4 rounded-md">
                <h3 className="text-3xl font-bold">Select Payment Method</h3>
                <Select name="method" onValueChange={handleSelectChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Credit Card" disabled>Credit Card</SelectItem>
                    {paymentData.map((value) => {
                         return <SelectItem value={value.paymentName} key={value.paymentName}>{value.paymentName}</SelectItem>
                    }) }
                        {/* <SelectItem value="usdt">USDT</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bitcoin">Bitcoin</SelectItem> */}
                    </SelectContent>
                </Select>
                <Input name="amount" type="number" placeholder="Amount" icon={<DollarSign />} onChange={handleInputChange} required/>
                {/* <Link href="/main/payment"> */}
                    <Button size="lg" className="bg-green-500" onClick={onSubmit}> Continue </Button>
                {/* </Link> */}
            </div>
            <br />
            <div className="bg-white rounded-md px-4 p">
                <h2 className="text-3xl font-bold py-3">Deposit History</h2>
                <DataTableDemo />
            </div>
        </div>
    );
}