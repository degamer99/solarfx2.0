"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { CheckCircle, CircleCheck, Lock, Mail, Megaphone, Phone, User, X } from "lucide-react"
import { createRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore, storage } from "@/components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import Image from "next/image";
import SolarLogo from "../../../public/images/solarLogo.png"
import { useUserData } from "@/components/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@/components/zodBase'; // Import the schema from above
import { z } from "zod"
import { PaymentInfo } from "@/components/ui/dataTable/columns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { send } from "@emailjs/browser";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function SignUp() {
  // TypeScript type inferred from Zod schema
  type FormData = z.infer<typeof schema>;
  const getPaymentData = useUserData(state => state.getPaymentData)
  const paymentData = useUserData(state => state.paymentData)
  useEffect(() => {
    getPaymentData()
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data, plan);
    setSending(true)
    const id = Math.random().toString()
    const userRef = doc(firestore, "preusers", id);
    const confirmRef = ref(storage, "confirm/" + id);
    uploadBytes(confirmRef, data.file[0]).then(async (snapshot) => {
      console.log("snapshot", snapshot);
      let link = await getDownloadURL(confirmRef); ""
      console.log(link);
      await setDoc(userRef, {
        name: data.name,
        email: data.email,
        password: data.password,
        method: data.method,
        imageUrl: link,
      }, { merge: true }).then(() => {
        setSending(false)
        console.log("File stuff has been done")
        setDialogOpen(true)
      }
      );


    })
  };

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<any>()

  const [form, setForm] = useState(
    {
      firstName: "", lastName: "", email: "", phoneNumber: "",
      password: "", confirmPassword: "", referral: ""
    }
  )

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

  //   const handleSubmit = (e) => {
  //       e.preventDefault();

  //       // Simplified form validation
  //       if (!form.email || !form.password) {
  //           setErrorMessage("Please fill in all fields.");
  //           return;
  //       }

  //       // Perform login logic (not implemented in this example)
  //       setErrorMessage(""); // Clear any previous error
  //       console.log("Form submitted:", form);
  //       // submit data to firebase
  //       handleSignUp(form);

  //   };



  const handleSignUp = async (data: any) => {
    try {
      setErrorMessage("Loading ...");
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Send email verification
      //   sendEmailVerification(user);

      // Store extra data in Firestore
      const userRef = doc(firestore, "users", user.uid);
      const set = useUserData.getState().set;
      await set(userRef, data)
        .then(() => router.push("/main/dashboard"));

      console.log("User signed up:", user);
    } catch (error: any) {
      handleAuthError(error);
      if (!error && !error.message) return
      console.error("Error signing up:", error?.message);
    }
  };

  const handleAuthError = (error: any) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setErrorMessage(
          "Email is already in use. Please choose another email."
        );
        break;
      case "auth/invalid-email":
        setErrorMessage("Invalid email address.");
        break;
      case "auth/weak-password":
        setErrorMessage(
          "Password is too weak. Please choose a stronger password."
        );
        break;
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        setErrorMessage("Invalid email or password.");
        break;
      default:
        setErrorMessage(
          "An error occurred during authentication. Please try again later."
        );
        break;
    }
  };

  const plansArray = [
    {
      price: "$149.99",
      title: "Cadet",
      description: "A first step towards breaking free",
      features: [
        "Access to all TRW Campuses",
        "Daily live broadcasts",
        "Daily course updates",
      ],
    },
    {
      price: "$449.99",
      title: "Lieutenant",
      description: "For advanced learners",
      features: [
        "Access to exclusive content",
        "Weekly private coaching",
        "Priority support",
      ],
    },
    {
      price: "$999.99",
      title: "Commander",
      description: "Unlock full potential",
      features: [
        "One-on-one mentorship",
        "Lifetime access to materials",
        "Custom learning plan",
      ],
    },
  ];

  const [plan, setPlan] = useState<any>({ title: "", amount: "" });
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [pagePaymentInfo, setPagePaymentInfo] = useState<PaymentInfo | null>(null); // Allow null initially
  const [openPayment, setOpenpayment] = useState(false)
  const [open, setOpen] = useState({ payment: false, select: false })
  const [sending, setSending] = useState(false)
  let newPlan: string

  return (
    <main className="flex flex-col items-center justify-center min-h-screen  bg-gray-100">
      <div className=" py-10 px-8 my-5 flex flex-col gap-1 max-w-[90vw]">
        <div className="flex flex-col justify-center items-center">
          <Image
            style={{ width: "8rem" }}
            // className=" scale-50"
            // style={{ width: "80%" }}
            src={SolarLogo}
            alt="My Image"
            unoptimized
          // width={40}
          // height={50}
          />
          <h2>Create an Account</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
          <Input {...register("name")} type="text" placeholder="Name" label="Name" error={errors.name} required />
          <Input  {...register("email")} type="text" placeholder="Email" icon={<Mail />} label="Email" error={errors.email} required />
          <Input  {...register("password")} type="password" placeholder="Password" icon={<Lock />} label="Password" error={errors.password} required />
          <div className="flex gap-2 font-bold">
            <CircleCheck />
            <span> SELECT PLAN</span>
          </div>
          {plansArray.map(({ price, title, description, features }) => {
            const onClick = (e: any) => {
              setPlan({ title, amount: price })
              setOpen({ ...open, select: true })
              newPlan = title
              console.log(plan)
              console.log("This is the new plan", newPlan)
            }
            return (<button type="button" key={Math.random()} onClick={onClick} >
              <div
                className="p-6 bg-gray-900  border-2 hover:border hover:border-yellow-500 peer-checked:border-yellow-500 rounded-lg text-white hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >

                {/* Price Section */}
                <div className="text-xl font-bold">{price}</div>
                <div className="text-sm text-gray-400">/ monthly</div>

                {/* Title Section */}
                <div className="mt-2 text-2xl font-semibold">{title}</div>

                {/* Description */}
                <div className="mt-2 text-sm text-gray-400">{description}</div>

                {/* Features */}
                <ul className="mt-4 space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-yellow-500">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Arrow Icon */}
                <div className="mt-4 flex justify-end">
                  <span className="text-yellow-500 text-lg">➔</span>
                </div>
              </div>

            </button>
            )
          })}
          {errors.plan?.message}
          {errors.email?.message}
          {errors.method?.message}
          {open.select && (<select
            id="method"
            {...register("method")} // Register with React Hook Form
            defaultValue="" // Set default value to an empty string
            className="border rounded p-2"
            {...register("method")} required 
            // onChange={ (e) => console.log(e.target.value)}
            onChange={(e) => {
              setOpenpayment(true)
              console.log(e)
              const selectingValue = paymentData.find((item) => item.paymentName === e.target.value) || null
              console.log(selectingValue, "selectiong value")
              setPagePaymentInfo(selectingValue);
            }}
          >
            <option value="" disabled>
              Select a category
            </option>
            {paymentData.map((value) => {
              return <option value={value.paymentName} key={value.paymentName}>{value.paymentName}</option>
            })}

          </select>
          )
          }
   
          {errors.method && <p className="text-red-500">{errors.method.message}</p>}
          {openPayment && (
            <div className="p-4 bg-gray-200">
              <div className="flex items-center mb-4">
                {/* <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
                    <span className="text-xl">$</span>
                  </div> */}
                <p className="ml-4">
                  Make Payment of {plan.amount} <span className="font-semibold"></span> to the address below and click  <strong> SEND PROOF OF DEPOSIT</strong>
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center mb-4">
                <div className="w-24 h-24 mb-4 md:mb-0 md:mr-4 bg-gray-200 rounded-md flex items-center justify-center">
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

                <div className="flex-1">
                  <input
                    type="text"
                    readOnly
                    value={pagePaymentInfo?.paymentAddress}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none mb-2"
                  />
                  {/* <Button onClick={handleCopy}>
                      {copied ? 'Copied!' : 'Copy'}
                    </Button> */}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-600">Upload Proof of Deposit:</label>
                <input type="file" {...register("file")} onChange={handleImageChange} className="block w-full border border-gray-300 rounded-md p-1.5" />
          {errors.file && <p className="text-red-500">{errors.file.message}</p>}
              </div>

              {/* <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700">
                  {sending ? "Sending" : "Send"}
                </button> */}
            </div>
          )

          }

          <div className="flex items-center gap-1 my-auto">
            <input type="checkbox" />
            <label className="text-xs">
              I agree to Solarfx Term and Conditions
            </label>

          </div>
          {errorMessage && <div className="text-black font-bold my-2 place-self-start">{errorMessage}</div>}
          <Button type="submit"> {sending ? "Creating Account ..." : "Create Account"}</Button>
          <p className="text-xs text-center" >
            Already have an account? <Link href="/signin" className="font-bold" >
              Sign In
            </Link>
          </p>
        </form>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notification </DialogTitle>
            </DialogHeader>
           <p> Your account is processing. We will send you an email when the processing is complete</p>
          </DialogContent>
        </Dialog>
    </main>
  );

}
