"use client"

import { DataTableDemo } from "@/components/ui/table-for-things"
import Header from "@/components/Header"
import Ticker from "@/components/ui/ticker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { useState } from "react";

export default function Withdrawal() {
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
        console.log(formData)
    }

    return (
        <div className="min-h-screen bg-gray-100 w-full px-4 overflow-hidden">
            <Header />
            <Ticker />
            <h2 className="text-5xl font-bold py-6">Withdraw</h2>
            <div className="bg-white px-4 py-8 flex flex-col gap-4 rounded-md">
                <h3 className="text-3xl font-bold">Select Payment Method</h3>
                <Select name="method" onValueChange={handleSelectChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="Ethereum">Ethereum</SelectItem>
                        <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                    </SelectContent>
                </Select>
                <Input name="amount" type="number" placeholder="Amount" icon={<DollarSign />} onChange={handleInputChange} required/>
                <Button size="lg" className="bg-green-500" onClick={onSubmit}> Continue </Button>
            </div>
            <br />
            <div className="bg-white rounded-md px-4 p">
                <h2 className="text-3xl font-bold py-3">Withdraw History</h2>
                <DataTableDemo />
            </div>
        </div>
    );
}