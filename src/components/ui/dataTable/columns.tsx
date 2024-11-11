"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown  } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "../input"
import { useUserData } from "@/components/store"
import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "@/components/firebase"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id?: string
    email: string
    name: string;
    phoneNumber?: string;
    accountBalance?: number;
    accountLevel?: string;
    totalProfit?: number;
    totalWithdrawal?: number;
    pendingStatus?: "pending" | "processing" | "success" | "failed";
    pendingType?: string;
    pendingAmount?: number;
    receipt?: string;
    dateRegistered?: string;
}

const { editedData, updateEditedData, getEditedData } = useUserData.getState();
export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-right">ID</div>,
    cell: ({ row }) => {
      const userId = row.getValue("id")
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(amount)
 
      return <p>...</p>
    
  }},
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-center font-bold text-lg text-black"
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "name",
        header: () => <div className="text-center font-bold text-lg text-black">Name</div>,
        // header: "Name",
    },
    {
        accessorKey: "phoneNumber",
        header: () => <div className="text-center font-bold text-lg text-black">Phone Number</div>,
        // header: "Phone Number",
    },
    {
        accessorKey: "accountBalance",
        header: () => <div className="text-center font-bold text-lg text-black">Account Balance</div>,
        cell: ({ row }) => {
          const id = row.getValue("id") as string;
          return (
            <div className="text-right font-medium min-w-28">
              <Input
                defaultValue={row.getValue("accountBalance")}
                onChange={(e) =>
                  updateEditedData(id, "accountBalance", parseFloat(e.target.value))
                }
              />
            </div>
          );
        },
      },
      {
        accessorKey: "accountLevel",
        header: () => <div className="text-center font-bold text-lg text-black">Account Level</div>,
        // header: "Account Level",
        cell: ({ row }) => {
          const id = row.getValue("id") as string;
          return (
            <div className="text-right font-medium min-w-28">
            <Input
              defaultValue={row.getValue("accountLevel")}
              onChange={(e) => updateEditedData(id, "accountLevel", e.target.value)}
            />
            </div>
          );
        },
      },
    {
        accessorKey: "totalProfit",
        header: () => <div className="text-center font-bold text-lg text-black">Total Profit</div>,
        cell: ({ row }) => {
          const id = row.getValue("id") as string;
          return (
            <div className="text-right font-medium min-w-28">
            <Input
              defaultValue={row.getValue("totalProfit")}
              onChange={(e) => updateEditedData(id, "totalProfit", e.target.value)}
            />
            </div>
          );
        },
      },
    {
        accessorKey: "totalWithdrawal",
        header: () => <div className="text-center font-bold text-lg text-black">Total WIthdrawal</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("totalWithdrawal"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
          const id = row.getValue("id") as string;
     
          return (   <div className="text-right font-medium min-w-28">
            <Input
            //   defaultValue={row.getValue("accountLevel")}
              defaultValue={formatted}
              onChange={(e) => updateEditedData(id, "totalWithdrawal", e.target.value)}
            />
            </div>)
    }},
    {
        accessorKey: "pendingStatus",
        header: () => <div className="text-center font-bold text-lg text-black">Pending Status</div>,
        // header: "Pending Status",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            return (
              <div className="text-right font-medium min-w-28">
              <Input
                defaultValue={row.getValue("pendingStatus")}
                onChange={(e) => updateEditedData(id, "pendingStatus", e.target.value)}
              />
              </div>
            );
          },
    },
    {
        accessorKey: "pendingType",
        header: () => <div className="text-center font-bold text-lg text-black">Pending Type</div>,
        // header: "Pending Type",
    },
    {
        accessorKey: "pendingAmount",
        header: () => <div className="text-center font-bold text-lg text-black">Pending Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("pendingAmount"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
     
          const id = row.getValue("id") as string;
     
          return (   <div className="text-right font-medium min-w-28">
            <Input
            //   defaultValue={row.getValue("accountLevel")}
              defaultValue={formatted}
              onChange={(e) => updateEditedData(id, "pendingAmount", e.target.value)}
            />
            </div>)
    }},
    {
        id: "actions",
        cell: ({ row }) => {
          const id = row.getValue("id") as string;
          const update = async () => {
            const userRef = doc(firestore, "users", id)
            await updateDoc(userRef, getEditedData(id) );
            console.log("Edited data for row:", getEditedData(id));
            alert(`Updated details for ${row.getValue("name")}`)
          };
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={update}>Publish Changes</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
]
