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
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { PaymentInfo } from "@/components/ui/dataTable/columns";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore, storage } from "@/components/firebase";
import Payment from "@/components/payment";


export default function Deposit() {
    const [isDepositOpen, setDepositOpen] = useState(false)
    const isMobile = useIsMobile()
    const [sending, setSending] = useState(false)
    const [copied, setCopied] = useState(false);
    const [file, setFile] = useState<any>()
    const getPaymentData = useUserData(state => state.getPaymentData)
    const paymentData = useUserData(state => state.paymentData)
    const [pagePaymentInfo, setPagePaymentInfo] = useState<PaymentInfo | null>(null); // Allow null initially

    useEffect(() => {
        getPaymentData()
    }, [])
    const router = useRouter()
    const [formData, setFormData] = useState({
        method: "",
        amount: "",
    });

    const handleDepositForm = () => {
        setDepositOpen(true)
    }
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSelectChange = (e: any) => {
        // console.log(e)
        const value = e;
        setFormData({
            ...formData,
            method: value,
        });
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        // Check if a file is selected and it is an image
        if (file && file.type.startsWith('image/')) {
            // Do something with the selected image file
            console.log(file)
            setFile(file)
            // onFileChange(file);
        } else {
            // Handle non-image file selection (you can show an error message or perform other actions)
            console.error('Please select a valid image file.');
            alert('Please select a valid image file.');
        }

    }
    const onSubmit = async (e: any) => {
        e.preventDefault();
        setSending(true)
        onAuthStateChanged(auth, (user) => {
            if (!user) return
            console.log(user.uid);
            const userRef = doc(firestore, "users", user.uid);
            const confirmRef = ref(storage, "confirm/" + user.uid);
            uploadBytes(confirmRef, file).then(async (snapshot) => {
                console.log("snapshot", snapshot);
                let link = await getDownloadURL(confirmRef); ""
                console.log(link);
                await setDoc(userRef, {
                    pendingImage: link,
                    pending: true,
                    pendingType: "Deposit",
                    pendingAmount: formData.amount,
                    pendingAddress: pagePaymentInfo?.paymentAddress,
                }, { merge: true }).then(() => {
                    setSending(false)
                    console.log("File stuff has been done")
                    alert("Payment is currently under Processing")
                }
                );
            })
        })
    }


    const relativePaymentData = (paymentData: PaymentInfo[], method: string | null): PaymentInfo | null => {
        if (!method) return null; // Handle case where method is null
        return paymentData.find((item) => item.paymentName === method) || null;
    };

    const handleCopy = () => {
        if (!pagePaymentInfo) return
        navigator.clipboard.writeText(pagePaymentInfo.paymentAddress)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch(err => console.error('Failed to copy text: ', err));
    };

   

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
                        })}
                        {/* <SelectItem value="usdt">USDT</SelectItem>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bitcoin">Bitcoin</SelectItem> */}
                    </SelectContent>
                </Select>
                <Input name="amount" type="number" placeholder="Amount" icon={<DollarSign />} onChange={handleInputChange} required />
                {/* <Link href="/main/payment"> */}
                <Button size="lg" className="bg-green-500" onClick={handleDepositForm}> Continue </Button>
                {/* </Link> */}
            </div>
            <br />
            <div className="bg-white rounded-md px-4 p">
                <h2 className="text-3xl font-bold py-3">Deposit History</h2>
                <DataTableDemo />
            </div>
            <Payment open={isDepositOpen} set={setDepositOpen} formData={formData} deposit={true} />

            
        </div>
    );
}
