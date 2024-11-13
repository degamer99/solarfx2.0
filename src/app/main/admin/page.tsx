"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import TradingViewWidget from "@/components/TradingVIew";
import Link from "next/link";
import Card from "@/components/ui/card"
import PlaceOrder from "@/components/place-order";
import Referral from "@/components/referral";
import { DataTableDemo } from "@/components/ui/admin-table";
import { useUserData } from "@/components/store";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/components/firebase";
import { DataTable } from "@/components/ui/dataTable/page";
import { Payment, columns } from "@/components/ui/dataTable/columns";


export default function Admin() {
  const [allUserData, setAllUserData] = useState<Payment[]>([]);
  // const [allUserData, setAllUserData] = useState([])
  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const userDataArray: Payment[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();

          // Ensure all required fields are present, or provide default values
          const userData: Payment = {
            id: doc.id,
            email: docData.email || "", // Make sure to handle missing email appropriately
            name: `${docData.firstName} ${docData.lastName}` || "Unknown", // Default value for name
            phoneNumber: docData.phoneNumber,
            accountBalance: docData.accountBalance,
            accountLevel: docData.accountLevel,
            totalProfit: docData.totalProfit,
            totalWithdrawal: docData.totalWithdrawal,
            pendingStatus: docData.pendingStatus,
            pendingType: docData.pendingType,
            pendingAmount: docData.pendingAmount,
            pendingImage: docData.pendingImage,
            receipt: docData.receipt,
            dateRegistered: docData.dateRegistered,
          };
          userDataArray.push(userData);
        });
        setAllUserData(userDataArray);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        console.log(allUserData)

      }
    };
    getAllUserData()
  },[])
  // const data = getData()
  const data: Payment[] = [

    {
      id: "12345",
      email: "olayinkabello962@gmail.com",
      name: "Testing Surname",
      phoneNumber: "0901234567",
      accountBalance: 2000,
      accountLevel: "Begineer",
      totalProfit: 20000,
      totalWithdrawal: 10000,
      pendingStatus: "pending",
      pendingType: "Deposit (Usdt)",
      pendingAmount: 200,
      receipt: "url to reciept",
      dateRegistered: "October irst"
    },

    // ...
  ]
  // const data = {
  //     id: "12345",
  //     amount: 100,
  //     status: "pending",
  //     email: "olayinkabello962@gmail.com",
  // }
  return (
    <div>
      {/* <h2 className="font-bold text-xl mt-2">Hello, User</h2> */}
      <section className="mb-48">
        <h2 className="font-bold text-xl my-4" > Customer Information </h2>
        <DataTable columns={columns} data={allUserData} />
      </section>

    </div>

  );

}
