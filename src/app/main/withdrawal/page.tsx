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
import Payment from "@/components/payment";

export default function Withdraw() {
    const [isWithdrawOpen, setWithdrawOpen] = useState(false)
    const getPaymentData = useUserData( state => state.getPaymentData)
    const paymentData = useUserData( state => state.paymentData)
    const router = useRouter()
    const userData = useUserData((state) => state.userData)
    const [formData, setFormData] = useState({
        method: "",
        amount: "",
    });
    
    useEffect(() => {
        getPaymentData()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name == "method") {
        setFormData({
            ...formData,
            [name]: value,
        });
        } else {
            const newNumber = +value * 0.15;
             setFormData({
            ...formData,
            [name]: newNumber,
        });
        }
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

    const handleWithdrawForm = () => {
        console.log("doing")
        setWithdrawOpen(true)

    }

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
                    <SelectItem value="Credit Card" disabled>Credit Card</SelectItem>
                    {paymentData.map((value) => {
                         return <SelectItem key={value.paymentName} value={value.paymentName}>{value.paymentName}</SelectItem>
                    }) }
                    </SelectContent>
                </Select>
                <Input name="amount" type="number" placeholder="Amount" icon={<DollarSign />} onChange={handleInputChange} required />
                
                {/* Safely check if userData values are defined */}
                { (userData.numberOfTrade ?? 0) >= (userData.minimumTrade ?? 2)  ? (
                    <Button size="lg" className="bg-green-500" onClick={handleWithdrawForm}>Continue</Button>
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
            <Payment open={isWithdrawOpen} set={setWithdrawOpen} formData={formData} deposit={false} /> 
        </div>
    );
}
