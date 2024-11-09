"use client"

import { DataTableDemo } from "@/components/ui/table-for-things"
import Header from "@/components/Header"
import Ticker from "@/components/ui/ticker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { useState } from "react";

export default function viewLoan() {

    return (
        <div>
            <div className="bg-white rounded-md px-4 p">
                <h2 className="text-3xl font-bold py-3">Loan History</h2>
                <DataTableDemo />
            </div>
        </div>
    );
}