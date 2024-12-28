// components/Payment.tsx
"use client";

import { auth, firestore, storage } from '@/components/firebase';
import { useUserData } from '@/components/store';
import { Button } from '@/components/ui/button';
import CopyInput from '@/components/ui/copyinput';
import { PaymentInfo } from '@/components/ui/dataTable/columns';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';

const Payment = () => {
  const [pagePaymentInfo, setPagePaymentInfo] = useState<PaymentInfo | null>(null); // Allow null initially
  const searchParams = useSearchParams();
  const paymentData = useUserData(state => state.paymentData);
  const amount = searchParams.get("amount");
  const method = searchParams.get("method");
  // const { usdt, ethereum, bitcoin } = siteData;
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<any>()
  const [sending, setSending] = useState(false)
  const [withdrawAddress, setWithdrawAddress] = useState("")

  const getPaymentData = (paymentData: PaymentInfo[], method: string | null): PaymentInfo | null => {
    if (!method) return null; // Handle case where method is null
    return paymentData.find((item) => item.paymentName === method) || null;
  };
  useEffect(() => {
    const relevantPaymentInfo = getPaymentData(paymentData, method);
    setPagePaymentInfo(relevantPaymentInfo);
  }, [paymentData, method]);

  const handleCopy = () => {
    if (!pagePaymentInfo) return
    navigator.clipboard.writeText(pagePaymentInfo.paymentAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err));
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
          pendingAmount: amount,
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

  // // Update the state when `method` changes
  // useEffect(() => {

  //   switch (method) {
  //     case "usdt":
  //       setPagePaymentInfo(usdt);
  //       break;
  //     case "ethereum":
  //       setPagePaymentInfo(ethereum);
  //       break;
  //     case "bitcoin":
  //       setPagePaymentInfo(bitcoin);
  //       break;
  //     default:
  //       setPagePaymentInfo({ name: "null", address: "null" });
  //       break;
  //   }
  // }, [method, usdt, ethereum, bitcoin]); // Dependencies include `method` and site data

  // console.log(amount, siteData);

  return (
    <div className="p-6 bg-gray-100">
      <div className="text-xl font-bold mb-4">Add Fund {pagePaymentInfo?.paymentName}</div>
      <form onSubmit={onSubmit}>
        <div className="p-4 bg-white border border-gray-300 rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
              <span className="text-xl">$</span>
            </div>
            <p className="ml-4">
              Make Payment of ${amount} <span className="font-semibold"></span> to the address below and click  <strong> SEND PROOF OF DEPOSIT</strong> 
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="w-24 h-24 mb-4 md:mb-0 md:mr-4 bg-gray-200 rounded-md flex items-center justify-center">
              {/* Placeholder for the QR code */}
              { pagePaymentInfo && (
                <Image
                  src={pagePaymentInfo?.paymentQrcode}
                  alt='Qr Code'
                  width={80}
                  height={80}
                  className='w-full h-full'
                />

              )}
              {/* <img src="/path/to/qr-code.png" alt="QR Code" className="h-full w-full object-contain" /> */}
            </div>

            <div className="flex-1">
              <input
                type="text"
                readOnly
                value={pagePaymentInfo?.paymentAddress}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none mb-2"
              />
              <Button onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          
            <div className="mb-4">
            <label className="block mb-2 text-gray-600">Upload Proof of Deposit: </label>
            <input type="file" onChange={handleImageChange} className="block w-full border border-gray-300 rounded-md p-1.5" />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Your {pagePaymentInfo?.paymentName} Address </label>
            <input type="text" value={withdrawAddress} onChange={ (e) => setWithdrawAddress(e.target.value)} className="block w-full border border-gray-300 rounded-md p-1.5" />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700">
            {sending ? "Sending" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Payment />
    </Suspense>
  );
}

