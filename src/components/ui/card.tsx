"use client"

import React from "react";
import { DollarSign } from "lucide-react"; // for dollar symbol icon (use lucide or similar icons)
import { cn } from "@/lib/utils"

interface CardProps {
    depositPrice: string | number;
    currency?: string; // to make it flexible for other currencies
    description?: string;
    color?: string // Optional description
    colorCoin?: string // Optional description
    className?: string
}

const Card: React.FC<CardProps> = ({ depositPrice, currency = "$", description, color, colorCoin, className }) => {
    return (
        <div
        className={cn(
                        " flex flex-row justify-between items-center w-full max-w-sm rounded-lg shadow-lg bg-green-400 border border-gray-200 overflow-hidden",
                        className
                      )}
        >
            {/* Title Section */}
            
            <div className="flex flex-col  px-6 py-5 font-boldx">

                <h2 className="text-xl font-semibold text-gray-800 flex flex-row items-center"> <DollarSign size="20" className="text-green-500 " /> {depositPrice}</h2>
                {description && (
                    <p className="mt-2 text-gray-600 font-bold text-lg">{description}</p>
                )}
            </div>

            {/* Price Section */}
            <div className="flex items-center bg-green-600 h-full justify-center px-4 py-2">
                <span className="text-3xl font-bold text-gray-800">{currency}</span>
            </div>

            {/* Optional Description Section */}


            {/* Action Button (Optional) */}
            {/* <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
        Make Deposit
      </button> */}
        </div>
    );
};

export default Card;
