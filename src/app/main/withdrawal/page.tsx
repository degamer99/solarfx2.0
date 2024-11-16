"use client"

import { DataTableDemo } from "@/components/ui/table-for-things"
import Header from "@/components/Header"
import Ticker from "@/components/ui/ticker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserData } from "@/components/store";

export default function Withdraw() {
    const router = useRouter()
    const userData = useUserData((state) => state.userData)
    const [formData, setFormData] = useState({
        method: "",
        amount: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            method: value,
        });
    };

    const onSubmit = () => {
        const queryString = new URLSearchParams(formData).toString();
        console.log(formData);
        router.push(`/main/payment?${queryString}`);
    };
    console.log("numberOfTrade", userData.numberOfTrade )
    console.log("minimumTrade", userData.minimumTrade )

    return (
        <div>
            <h2 className="text-5xl font-bold py-6">Withdraw</h2>
            <div className="bg-white px-4 py-8 flex flex-col gap-4 rounded-md">
                <h3 className="text-3xl font-bold">Select Payment Method</h3>
                <Select name="method" onValueChange={handleSelectChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="usdt">USDT</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bitcoin">Bitcoin</SelectItem>
                    </SelectContent>
                </Select>
                <Input name="amount" type="number" placeholder="Amount" icon={<DollarSign />} onChange={handleInputChange} required />
                
                {/* Safely check if userData values are defined */}
                { (userData.numberOfTrade ?? 0) >= (userData.minimumTrade ?? 2)  ? (
                    <Button size="lg" className="bg-green-500" onClick={onSubmit}>Continue</Button>
                )
                 :
                 (
                    <div className="my-2 flex items-center border border-gray-300 rounded-lg p-4 shadow-lg bg-gray-100 space-x-3">
                        <AlertCircle className="text-red-500 w-5 h-5" />
                        <p className="text-gray-800 font-medium ml-2">
                            You need to perform a minimum of <span className="font-bold text-lg">{(userData.minimumTrade ?? 2)} </span>trade to withdraw
                        </p>
                    </div>
                )}
            </div>
            <br />
            <div className="bg-white rounded-md px-4 p">
                <h2 className="text-3xl font-bold py-3">Withdraw History</h2>
                <DataTableDemo />
            </div>
        </div>
    );
}
