"use client"

import emailjs from '@emailjs/browser';
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { useRef, useState, RefObject } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "../input"
import { useUserData } from "@/components/store"
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { firestore, storage } from "@/components/firebase"
import Link from "next/link"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import KycDialog from '../kycDialog';

export type expertData = {
  name: string
  followers: number
  capital: number
  profitPercentage: number
  totalProfit: number
  rating: number
  image: string
}

export const expertColumns: ColumnDef<expertData>[] = [
  {
    accessorKey: "name",
    header: "Expert Name",
  },
  {
    accessorKey: "followers",
    header: "Number of Followers",
  },
  {
    accessorKey: "capital",
    header: "Capital",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("capital"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      const id = row.getValue("id") as string;

      return <p>{formatted}</p>
    }
  },
  {
    accessorKey: "profitPercentage",
    header: "Percentage Profit",
    cell: ({ row }) => {
      const percent = parseFloat(row.getValue("profitPercentage"))
      return <p>{percent}%</p>
    }
  },
  {
    accessorKey: "totalProfit",
    header: "Total Profit",
    cell: ({ row }) => {
      const profit = parseFloat(row.getValue("totalProfit"))
      return <p>{profit}%</p>
    }
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "image",
    header: "Expert Image",
    cell: ({row}) => {
      const imageUrl = row.original.image
      const name = row.original.name

      return <Image 
      src={imageUrl}
      alt={name + "image"}
      width={50}
      height={50}
      />
    }
  },
  {
    id: "actions",
    header: "Edit",
    cell: function Edit({ row }) {
      // const expertInfo = row.original
      const {name,followers, capital, profitPercentage, totalProfit, rating } = row.original
      const [isSending, setIsSending] = useState(false)
      const [isChangesOpen, setChangesOpen] = useState(false)
      const [file, setFile] = useState<any>()
      const [formData, setFormData] = useState({
        name: "john"
      });

      const expertRef = doc(firestore, "expert", formData.name);
      const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (!value) return
        setFormData({
          ...formData,
          [name]: value,
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
      const editChanges = async (e: any) => {
        e.preventDefault()
        setIsSending(true)
      const imageRef = ref(storage, "expert/" + formData.name);
        console.log("hello", formData)
        try {
          uploadBytes(imageRef, file).then(async () => {
           await getDownloadURL(imageRef).then( async (link) => {
             console.log(link)
                // Directly include `link` in the data passed to Firestore
      const updatedData = { ...formData, image: link };
            //  setFormData((prevState) => ({
            //   ...prevState,
            //   paymentQrcode: link, // Replace "newValue" with the actual value you want to set
            // }));
            console.log(updatedData)
            await setDoc(expertRef, updatedData, { merge: true }).then(() => {
              setIsSending(false)
            });

           });
          
          })

        } catch (error) {
          console.error(error)
        }
      }
      const deleteData = async () => {
        try {
          await deleteDoc(expertRef).then(() => alert("Expert has been Deleted"))
        } catch (error) {
          console.error(error)          
        }
      }

      return (<>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => setChangesOpen(true)}>Edit Copy Expert</DropdownMenuItem>
            <DropdownMenuItem onClick={deleteData} className='bg-red-600 text-gray-400 font-bold'>Delete Copy Expert</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isChangesOpen} onOpenChange={setChangesOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Notification to User</DialogTitle>
            </DialogHeader>
            <form onSubmit={editChanges}>
              <Input label='Expert Name' name='name' defaultValue={name} placeholder='John' type="text" onChange={handleInputChange} required />
              
              <Input label='Number of Followers' name='followers' defaultValue={followers}  type="number" onChange={handleInputChange} required />
              
              <Input label='Capital' name='capital' defaultValue={capital} placeholder='' type="text" onChange={handleInputChange} required />
              
              <Input label='Percentage Profit' name='profitPercentage' defaultValue={profitPercentage} type="number" onChange={handleInputChange} required />
              
              <Input label='Total Profit' name='totalProfit' defaultValue={totalProfit} type="text" onChange={handleInputChange} required />
              
              <Input label='Rating (Number of Star)' name='rating' defaultValue={rating} type="text" onChange={handleInputChange} required />
              
              <Input label='Expert Image' name='image'  type="file" onChange={handleImageChange} required />
              
              <div>
                <Button
                  onClick={() => setIsSending(true)}
                >
                  {isSending ? "Uploading" : "Upload Data to Site Database"}
                </Button>
                <Button type='button' onClick={() => setChangesOpen(false)} className="ml-4">
                  Close
                </Button>

              </div>
            </form>

          </DialogContent>
        </Dialog>
      </>
      )
    },
  },
]


export type PaymentInfo = {
  id: string
  paymentName: string
  paymentAddress: string
  paymentQrcode: string | " "
}

export const paymentColumns: ColumnDef<PaymentInfo>[] = [
  {
    accessorKey: "paymentName",
    header: "Payment Name",
  },
  {
    accessorKey: "paymentAddress",
    header: "Payment Address",
  },
  {
    accessorKey: "paymentQrcode",
    header: "Payment Qrcode",
    cell: ({row}) => {
      const qrUrl = row.original.paymentQrcode
      return <Image 
      src={qrUrl}
      alt='Qr Code'
      width={50}
      height={50}
      />
    }
  },
  {
    id: "actions",
    header: "Edit",
    cell: function Edit({ row }) {
      const paymentInfo = row.original
      const [isSending, setIsSending] = useState(false)
      const [isChangesOpen, setChangesOpen] = useState(false)
      const [file, setFile] = useState<any>()
      const [formData, setFormData] = useState({
        paymentName: "btc",
        paymentQrcode: ""
      });
      const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
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
      const editChanges = async (e: any) => {
        e.preventDefault()
        setIsSending(true)
        const paymentRef = doc(firestore, "paymentInfo", formData.paymentName);
      const qrRef = ref(storage, "qr/" + formData.paymentName);
        console.log("hello", formData)
        try {
          uploadBytes(qrRef, file).then(async () => {
           await getDownloadURL(qrRef).then( async (link) => {
             console.log(link)
                // Directly include `link` in the data passed to Firestore
      const updatedData = { ...formData, paymentQrcode: link };
            //  setFormData((prevState) => ({
            //   ...prevState,
            //   paymentQrcode: link, // Replace "newValue" with the actual value you want to set
            // }));
            console.log(updatedData)
            await setDoc(paymentRef, updatedData, { merge: true }).then(() => {
              setIsSending(false)
            });

           });
          
          })

        } catch (error) {
          console.error(error)
        }
      }
      const deleteData = async () => {
        const paymentRef = doc(firestore, "paymentInfo", formData.paymentName);
        try {
          await deleteDoc(paymentRef).then(() => alert("Payment Method has been Deleted"))
        } catch (error) {
          console.error(error)          
        }
      }

      return (<>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(paymentInfo.paymentAddress)}
            >
              Copy payment Address
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => setChangesOpen(true)}>Edit Payment Information</DropdownMenuItem>
            <DropdownMenuItem onClick={deleteData} className='bg-red-600 text-gray-400 font-bold'>Delete payment Method</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isChangesOpen} onOpenChange={setChangesOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Notification to User</DialogTitle>
            </DialogHeader>
            <form onSubmit={editChanges}>
              <Input label='Payment Name' name='paymentName' defaultValue={paymentInfo.paymentName} placeholder='Btc ...' type="text" onChange={handleInputChange} required />
              <br />
              <Input label='Payment Address' name='paymentAddress' defaultValue={paymentInfo.paymentAddress} placeholder='adfkluajijadshkujaf....' type="text" onChange={handleInputChange} required />
              <br />
              <Input label='Payment Qrcode' name='paymentQrcode'  type="file" onChange={handleImageChange} required />
              <br />
              <div>
                <Button
                  onClick={() => setIsSending(true)}
                >
                  {isSending ? "Uploading" : "Upload Data to Site Database"}
                </Button>
                <Button type='button' onClick={() => setChangesOpen(false)} className="ml-4">
                  Close
                </Button>

              </div>
            </form>

          </DialogContent>
        </Dialog>
      </>
      )
    },
  },
]

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
  pendingImage?: string,
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

    }
  },
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

      return (<div className="text-right font-medium min-w-28">
        <Input
          //   defaultValue={row.getValue("accountLevel")}
          defaultValue={formatted}
          onChange={(e) => updateEditedData(id, "totalWithdrawal", e.target.value)}
        />
      </div>)
    }
  },
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

      return (<div className="text-right font-medium min-w-28">
        <Input
          //   defaultValue={row.getValue("accountLevel")}
          defaultValue={formatted}
          onChange={(e) => updateEditedData(id, "pendingAmount", e.target.value)}
        />
      </div>)
    }
  },
  {
    accessorKey: "pendingImage",
    header: () => <div className="text-center font-bold text-lg text-black">Pending Image</div>,
    // header: "Pending Status",
    cell: ({ row }) => {
      const pendingImageUrl = row.getValue("pendingImage") as string;
      return (
        <div className="text-right font-medium min-w-28">
          {pendingImageUrl &&
            <Link href={pendingImageUrl}> <Button className=" font-bold">View Payment Reciept</Button></Link>
          }
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: function Action({ row }) {
      const id = row.getValue("id") as string;
      const name = row.getValue("name") as string;
      const email = row.getValue("email") as string;
      const userRef = doc(firestore, "users", id)
      const update = async () => {
        try {
          await updateDoc(userRef, getEditedData(id)).then(() => {
            console.log("Send Notification");
            alert("Notification sent")
          })

        } catch (error) {
          console.log(error)
        }
      };
      // const [isDialogOpen, setIsDialogOpen] = useState(false);

      // const openDialog = () => setIsDialogOpen(true);
      // const closeDialog = () => setIsDialogOpen(false);
      const [isEmailOpen, setEmailOpen] = useState(false);
      const [isNotificationOpen, setNotificationOpen] = useState(false);
      const [isSending, setIsSending] = useState(false)
      const [notificationMessage, setNotificationMessage] = useState(" ")
      const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)

      const openEmailDialog = () => setEmailOpen(true);
      const closeEmailDialog = () => setEmailOpen(false);

      const openNotification = () => setNotificationOpen(true);
      const closeNotification = () => setNotificationOpen(false);

      const openWithdraw = () => setIsWithdrawOpen(true);
      const closeWithdraw = () => setIsWithdrawOpen(false);

      const form: RefObject<HTMLFormElement> = useRef(null);
      const withdrawForm: RefObject<HTMLFormElement> = useRef(null);

      const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formCurrent = form.current || new HTMLFormElement();

        emailjs.sendForm('service_kxduvqr', 'template_7tcemc5', formCurrent, '9LjA75Y1B0wz5_FUf')
          .then((result) => {
            setIsSending(false)
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
      };
      const handleNotificationMessageChange = (e: any) => {
        if (e != null && e.target.value != null) {
          setNotificationMessage(e.target.value)
        }
        // console.log("e", e.target.value)
      }
      const sendNotification = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (e != null) {
          await updateDoc(userRef, { notificationMessage });
          console.log("Edited data for row:", getEditedData(id));
          alert(`Updated details for ${row.getValue("name")}`)
          // console.log(e, notificationMessage)
        }

      }
      const setWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        // Access form inputs directly using formRef
        const form = withdrawForm.current;
        if (!form) {
          console.log("no form")
          return
        }
        // Create an object from the form data for easy access
        const formData = new FormData(form);
        const formValues: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
          formValues[key] = value;
        });

        console.log('Form Values:', formValues);
        await updateDoc(userRef, formValues).then(() => {
          console.log("updated the withdraw settings");
          alert(`Updated withdraw settings for ${row.getValue("name")}`)
        })

        // Example: Accessing individual input values
        // console.log('Name:', formValues['name']);
        // console.log('Email:', formValues['email']);
      }

      const [isKycOpen, setIsKycOpen] = useState(false);
      const [kycData, setKycData] = useState<any>(null);
      const viewKycInfo = async () => {
    const userRef = doc(firestore, "users", id)
    let fetchedData
    try {
      await getDoc(userRef)
        .then((file) => {
          fetchedData = { ...file.data() };
          if (!fetchedData.kyc) {
            alert("No Kyc Information")
            return
          }
          setKycData(fetchedData.kyc)
          setIsKycOpen(true);
          console.log("data", file.data())
        })
    } catch (error) {
      console.error(error)
    }

      }
      return (<>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu </span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={update}>Publish Changes</DropdownMenuItem>
            <DropdownMenuItem onClick={openEmailDialog}>Send Email</DropdownMenuItem>
            <DropdownMenuItem onClick={openNotification}>Send Notification</DropdownMenuItem>
            <DropdownMenuItem onClick={openWithdraw}>set Withdraw Limit</DropdownMenuItem>
            <DropdownMenuItem onClick={viewKycInfo}>View Client Info</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Edit Profile Dialog */}
        <Dialog open={isEmailOpen} onOpenChange={setEmailOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Email to Client</DialogTitle>
            </DialogHeader>
            <div>
              <p>Make changes to your profile here. Click save when you&apos;re done.</p>
              {/* Add form fields for editing profile */}
              <form ref={form} onSubmit={sendEmail}>
                <Input name="to_name" type="text" value={name} label="To:" required />
                <Input name="to_email" type="email" value={email} label="Email" required />
                <Input name="from_name" type="text" value={"Solarfx"} label="From:" required />
                <Input name="message" type="text" label="Message" className="h-32" required />
                <br />
                <div>
                  <Button type="submit"
                    onClick={() => setIsSending(true)}
                  >
                    {isSending ? "Sending" : "Send"}
                  </Button>
                  <Button onClick={closeEmailDialog} className="ml-4">
                    Close
                  </Button>

                </div>

                <br />

              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Other Dialog */}
        <Dialog open={isNotificationOpen} onOpenChange={setNotificationOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Notification to User</DialogTitle>
            </DialogHeader>
            <form onSubmit={sendNotification}>

              <Input label="Notification Message" type="text" name="notificationMessage" placeholder="Type your notification ..." onChange={handleNotificationMessageChange} required />
              <br />
              <div>
                <Button
                  onClick={() => setIsSending(true)}
                >
                  {isSending ? "Sending Notification" : "Send Notification To Client Dashboard"}
                </Button>
                <Button onClick={closeNotification} className="ml-4">
                  Close
                </Button>

              </div>
            </form>

          </DialogContent>
        </Dialog>

        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Client Withdrawal Limit</DialogTitle>
            </DialogHeader>
            <form ref={withdrawForm} onSubmit={setWithdraw}>

              <Input label="Set Minimum Withdrawal Amount" type="number" name="minimumWithdrawAmount" placeholder="Type your notification ..." required />
              <br />
              <Input label="Minimum Trade for Withdrawall" type="number" name="minimumTrade" placeholder="Type your minimum trade limit ..." required />
              <br />
              <Input label="Set number of Client Trade" type="number" name="numberOfTrade" placeholder="Type the number of trades you client has made ..." required />
              <br />
              <div>
                <Button
                  onClick={() => setIsSending(true)}
                >
                  {isSending ? "Sending Notification" : "Send Notification To Client Dashboard"}
                </Button>
                <Button onClick={closeWithdraw} className="ml-4">
                  Close
                </Button>

              </div>
            </form>

          </DialogContent>
        </Dialog>

        {isKycOpen && ( <KycDialog kyc={kycData} open={isKycOpen} onClose={setIsKycOpen} />)}
      </>
      );
    },
  },
]
