import { useIsMobile } from "@/hooks/use-mobile";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserData } from "./store";
import { Button } from "./ui/button";
import { PaymentInfo } from "./ui/dataTable/columns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { auth, firestore, storage } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer";


interface PaymentProps {
    open: boolean;
    set: (isOpen: boolean) => void;
    formData: formData
    deposit: boolean
  }
  
  interface formData {
    method: string;
    amount: string;
  }

  const Payment = ({ open, set, formData, deposit }: PaymentProps) => {
    const isMobile = useIsMobile()
    const [sending, setSending] = useState(false)
    const [copied, setCopied] = useState(false);
    const [file, setFile] = useState<any>()
    const getPaymentData = useUserData(state => state.getPaymentData)
    const paymentData = useUserData(state => state.paymentData)
    const [pagePaymentInfo, setPagePaymentInfo] = useState<PaymentInfo | null>(null); // Allow null initially
    const [isSaveOpen, setSaveOpen] = useState(false);

    useEffect(() => {
        getPaymentData()
    }, [])
    // const [formData, setFormData] = useState({
    //     method: "",
    //     amount: "",
    // });

    const handleDepositForm = () => {
        set(true)
    }
    // const handleInputChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };
    // const handleSelectChange = (e: any) => {
    //     // console.log(e)
    //     const value = e;
    //     setFormData({
    //         ...formData,
    //         method: value,
    //     });
    // };

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
                    pendingAmount: formData.amount,
                    pendingAddress: pagePaymentInfo?.paymentAddress,
                }, { merge: true }).then(() => {
                    setSending(false)
                    console.log("File stuff has been done")
    setSaveOpen(true)

                    // alert("Payment is currently under Processing")
                }
                );
            })
        })
    }


    const relativePaymentData = (paymentData: PaymentInfo[], method: string | null): PaymentInfo | null => {
        if (!method) return null; // Handle case where method is null
        return paymentData.find((item) => item.paymentName === method) || null;
    };



    const DepositForm = () => {
        const data = relativePaymentData(paymentData, formData.method)
        setPagePaymentInfo(data);

        return (
            <div className="">
                <div className="flex flex-col md:flex-row items-center mb-4">
                    <div className="w-32 h-32 mb-4 md:mb-0 md:mr-4 bg-gray-200 rounded-md flex items-center justify-center">
                        {/* Placeholder for the QR code */}
                        {pagePaymentInfo && (
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

                    <div className="flex-1 flex-col md:flex-row">
                        <Input type="text"
                            readOnly
                            value={pagePaymentInfo?.paymentAddress}
                        />
                        <Button onClick={handleCopy} className="my-2 w-full">
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold">Upload Proof of Payment: </label>
                    <input type="file" onChange={handleImageChange} className="block w-full border border-gray-300 rounded-md p-1.5" />
                </div>
                {
                    !deposit && (
                        <Input  label={`Enter your ${pagePaymentInfo?.paymentName} wallet`} type="text" placeholder={`Enter your ${pagePaymentInfo?.paymentName} wallet ...`} />
                    )
                }
                <Button variant="default" className="w-full mt-2" onClick={onSubmit}>
                    {sending ? "Loading ..." : "Deposit"}
                </Button>
                <Dialog open={isSaveOpen} onOpenChange={setSaveOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notification </DialogTitle>
            </DialogHeader>
           <p> Payment is currently under Processing</p>
          </DialogContent>
        </Dialog>
            </div>
        )
    }
    return(
        <div>
            {
                !isMobile ?
                    (<Dialog open={open} onOpenChange={set}>
                        <DialogContent className="sm:max-w-[425px] min-w-[50vw]">
                            <DialogHeader>
                                <DialogTitle>
                                {
                                        deposit ? 
                                        "Deposit"
                                        :
                                        "Withdraw"
                                    }
                                     </DialogTitle>
                                <DialogDescription>
                                Make Payment of ${ formData.amount} to the address below and click SEND PROOF OF PAYMENT.
                                    { !deposit && " There is a compulsory 15% network fee for all withdrawal " }
                                </DialogDescription>
                            </DialogHeader>
                            <DepositForm />
                        </DialogContent>
                    </Dialog>)
                    :
                    (<Drawer open={open} onOpenChange={set}>
                        <DrawerContent>
                            <DrawerHeader className="text-left">
                                <DrawerTitle> {
                                        deposit ? 
                                        "Deposit"
                                        :
                                        "Withdraw"
                                    }</DrawerTitle>
                                <DrawerDescription>
                                    To make a deposit, choose your preferred method, enter an amount and upload a corresponding payment proof.
                                    { !deposit && "There is a compulsory 15% network fee for all withdrawal " }
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="py-2 px-4">
                                <DepositForm />
                            </div>
                            <DrawerFooter className="pt-2">
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    )
            }

        </div>
    )
}

export default Payment;