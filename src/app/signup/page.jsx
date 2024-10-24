"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { Lock, Mail, Megaphone, Phone, User } from "lucide-react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/components/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";



export default function SignUp() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState(
        {
            username: "", email: "", phone: "",
            password: "", confirm: "", referral: ""
        }
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simplified form validation
        if (!form.email || !form.password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        // Perform login logic (not implemented in this example)
        setErrorMessage(""); // Clear any previous error
        console.log("Form submitted:", form);
        // submit data to firebase
        handleSignUp(form);

    };

    const handleSignUp = async (data) => {
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
          await setDoc(userRef, data).then(() => router.push("/main/dashboard"));
    
          console.log("User signed up:", user);
        } catch (error) {
          handleAuthError(error);
          console.error("Error signing up:", error.message);
        }
      };
    
      const handleAuthError = (error) => {
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
    

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-xl py-10 px-8 flex flex-col gap-10">
                <div className="flex flex-col justify-center items-center">
                    <h2>Create an Account</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input onChange={handleInputChange} name="username" type="text" placeholder="Username" icon={<User />} label="Username" required />
                    <Input onChange={handleInputChange} name="email" type="email" placeholder="Email" icon={<Mail />} label="Email" required />
                    <Input onChange={handleInputChange} name="phone" type="text" placeholder="Enter Phone Number" icon={<Phone />} label="Phone Number" required />
                    <Input onChange={handleInputChange} name="password" type="password" placeholder="Password" icon={<Lock />} label="Password" required />
                    <Input onChange={handleInputChange} name="confirm" type="password" placeholder="Confirm Password" icon={<Lock />} label="Comfirm Password" required />
                    <Input onChange={handleInputChange} name="referral" type="text" placeholder="Referral Code" icon={<Megaphone />} label="Referral code" />
                    <div className="flex items-center gap-1 my-auto">
                        <input type="checkbox" />
                        <label className="text-xs">
                            I agree to Solarfx Term and Conditions
                        </label>

                    </div>
                    {<div className="text-black font-bold my-2 ">{errorMessage}</div>}

                    <Button> Create Account </Button>
                    <p className="text-xs text-center" >
                        Already have an account? <Link href="/signin" className="font-bold" >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );

}
