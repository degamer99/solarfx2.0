"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { Lock, Mail, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"


export default function PlaceOrder({ }) {

    const leverageOptions = [
        { value: "10", label: "1:10" },
        { value: "20", label: "1:20" },
        { value: "30", label: "1:30" },
        { value: "40", label: "1:40" },
        { value: "50", label: "1:50" },
        { value: "60", label: "1:60" },
        { value: "70", label: "1:70" },
        { value: "80", label: "1:80" },
        { value: "90", label: "1:90" },
        { value: "100", label: "1:100" },
    ];

    const expirationOptions = [
        { value: "1 Minutes", label: "1 Minute" },
        { value: "5 Minutes", label: "5 Minutes" },
        { value: "15 Minutes", label: "15 Minutes" },
        { value: "30 Minutes", label: "30 Minutes" },
        { value: "60 Minutes", label: "1 Hour" },
        { value: "4 Hours", label: "4 Hours" },
        { value: "1 Days", label: "1 Day" },
        { value: "2 Days", label: "2 Days" },
        { value: "7 Days", label: "7 Days" },
    ];

    const currencyOptions = [
        {
            label: "Currency",
            options: [
                { value: "EURUSD", label: "EURUSD" },
                { value: "EURJPY", label: "EURJPY" },
                { value: "USDJPY", label: "USDJPY" },
                { value: "USDCAD", label: "USDCAD" },
                { value: "AUDUSD", label: "AUDUSD" },
                { value: "AUDJPY", label: "AUDJPY" },
                { value: "NZDUSD", label: "NZDUSD" },
                { value: "GBPUSD", label: "GBPUSD" },
                { value: "GBPJPY", label: "GBPJPY" },
                { value: "USDCHF", label: "USDCHF" },
            ],
        },
        {
            label: "Crypto-Currency",
            options: [
                { value: "BTCUSD", label: "BTCUSD" },
                { value: "ETHUSD", label: "ETHUSD" },
                { value: "BCHUSD", label: "BCHUSD" },
                { value: "XRPUSD", label: "XRPUSD" },
                { value: "LTCUSD", label: "LTCUSD" },
                { value: "ETHBTC", label: "ETHBTC" },
            ],
        },
        {
            label: "Stocks",
            options: [
                { value: "CITI", label: "CITI" },
                { value: "SNAP", label: "SNAP" },
                { value: "EA", label: "EA" },
                { value: "MSFT", label: "MSFT" },
                { value: "CSCO", label: "CSCO" },
                { value: "GOOG", label: "GOOG" },
                { value: "FB", label: "FB" },
                { value: "SBUX", label: "SBUX" },
                { value: "INTC", label: "INTC" },
            ],
        },
        {
            label: "Indices",
            options: [
                { value: "SPX500USD", label: "SPX500USD" },
                { value: "MXX", label: "MXX" },
                { value: "XAX", label: "XAX" },
                { value: "INDEX:STI", label: "INDEX:STI" },
            ],
        },
        {
            label: "Commodities",
            options: [
                { value: "GOLD", label: "GOLD" },
                { value: "RB1!", label: "RB1!" },
                { value: "USOIL", label: "USOIL" },
                { value: "SILVER", label: "SILVER" },
            ],
        },
    ];

    return (
        <main>
            <div className="bg-white rounded-xl py-10 px-8 flex flex-col gap-5">
                <h2 className="self-start text-xl font-bold m">Assets</h2>
                <form action="" className="flex flex-col gap-4">
                    <div className="form-group flex flex-col gap-3 w-full" >
                    <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Asset" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencyOptions.map((group) => (
                                    <SelectGroup key={group.label}>
                                        <SelectLabel>{group.label}</SelectLabel>
                                        {group.options.map((item) => (
                                            <SelectItem key={item.value} value={item.value} className="pl-2">
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input name="Amount" type="number" placeholder="0" icon={<DollarSign />} />
                        <Select name="Leverage">
                            <SelectTrigger>
                                <SelectValue placeholder="Leverage" />
                            </SelectTrigger>
                            <SelectContent>
                                {leverageOptions.map((option, index) => (
                                    <SelectItem key={index} value={option.value} >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select name="Expiation">
                            <SelectTrigger>
                                <SelectValue placeholder="Expiation" />
                            </SelectTrigger>
                            <SelectContent>
                                {expirationOptions.map((option, index) => (
                                    <SelectItem key={index} value={option.value} >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                       
                    </div>
                    <div className="flex flex-row justify-between">
                        <Button size={"lg"} className="bg-green-700"> BUY </Button>
                        <Button size={"lg"} className="bg-red-700"> SELL</Button>
                    </div>

                </form>
            </div>
        </main>
    );

}

