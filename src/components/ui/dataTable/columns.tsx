"use client"

import CustomDialog from "@/components/ui/customDialog";
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
import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "@/components/firebase"
import Link from "next/link"

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>Edit Profile</p>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

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
    cell: ({ row }) => {
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

      const openEmailDialog = () => setEmailOpen(true);
      const closeEmailDialog = () => setEmailOpen(false);

      const openNotification = () => setNotificationOpen(true);
      const closeNotification = () => setNotificationOpen(false);

      const form: RefObject<HTMLFormElement> = useRef(null);

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
      const handleNotificationMessageChange = (e: any) =>{
        if ( e != null && e.target.value != null){
          setNotificationMessage(e.target.value)
        }
        // console.log("e", e.target.value)
      }
      const sendNotification =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(e != null){
          await updateDoc(userRef, {notificationMessage});
          console.log("Edited data for row:", getEditedData(id));
          alert(`Updated details for ${row.getValue("name")}`)
          // console.log(e, notificationMessage)
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
            <DropdownMenuItem onClick={update}>Publish Changes</DropdownMenuItem>
            <DropdownMenuItem onClick={openEmailDialog}>Send Email</DropdownMenuItem>
            <DropdownMenuItem onClick={openNotification}>Send Notification</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Edit Profile Dialog */}
        <Dialog open={isEmailOpen} onOpenChange={setEmailOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Email to Client</DialogTitle>
            </DialogHeader>
            <div>
              <p>Make changes to your profile here. Click save when you're done.</p>
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
                {/* <label>Name</label>
                <input type="text" name="user_name" /> */}
                {/* <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" /> */}
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

            <Input label="Notification Message" type="text" name="notificationMessage" placeholder="Type your notification ..." onChange={handleNotificationMessageChange}required/>
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
      </>
      );
    },
  },
]
