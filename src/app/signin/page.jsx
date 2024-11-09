"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { Lock, Mail } from "lucide-react"
import { useState } from "react";
import { auth, firestore } from "@/components/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function Signin() {
    const router = useRouter()
    const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignIn = async () => {
        try {
            setErrorMessage("Loading ...");

            await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            ).then( async (user) => {
                console.log("User signed in", user, user.user.uid);
                const userRef = doc(firestore, "users", user.user.uid)
                try {
                    await getDoc(userRef)
                    .then((file) => {
                        let disintergrate = { ...file.data() };
                        const {
                          firstName,
                          lastName,
                          email,
                          password,
                          accountBalance,
                          accountLevel,
                  
                        } = disintergrate;
                        console.log("data", file.data())
                        console.log({
                          firstName,
                          lastName,
                          email,
                          password,
                          accountBalance,
                          accountLevel,
                  
                        });
                      })
                } catch (error) {
                    console.error(error)
                }

                // if (user.user.uid == "fbHlaAd9V5SSp6AamRKW5996tOk1") {
                //     router.push("/secret");
                //     // make this site to be editable
                // } else {
                //     router.push("/main/dashboard");
                // }
            })
            .then( () => router.push("/main/dashboard") );
        } catch (error) {
            handleAuthError(error);

            console.error("Error signing in:", error.message);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simplified form validation
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        // Perform login logic (not implemented in this example)
        setError(""); // Clear any previous error
        console.log("Form submitted:", formData);
        // submit data to firebase
        handleSignIn();
    };

    const loginGetData = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const userRef = doc(firestore, "users", user.uid);
              try {
                await getDoc(userRef)
                  .then((file) => {
                    let disintergrate = { ...file.data() };
                    const {
                      firstName,
                      lastName,
                      email,
                      password,
                      accountBalance,
                      accountLevel,
              
                    } = disintergrate;
                    setUserData({
                      firstName,
                      lastName,
                      email,
                      password,
                      accountBalance,
                      accountLevel,
              
                    });
                  })
                  .then(() => openModal());
              } catch (error) {
                console.log(error);
              }
            } else {
              alert("No user logged in");
            }
          })
    }
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-xl py-10 px-8 flex flex-col gap-10">
                <div className="flex flex-col justify-center items-center">
                    <h2>Login into your account</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input name="email" onChange={handleInputChange} type="email" placeholder="Email" icon={<Mail />} label="Email" required />
                    <Input name="password" onChange={handleInputChange} type="password" placeholder="Password" icon={<Lock />} label="Password" required />
                    <div className="flex justify-between text-xs ">
                        <div className="flex items-center gap-1">
                            <input type="checkbox" />
                            <label>
                                Remember me
                            </label>

                        </div>
                        <Link href="https://example.com/forgot-password" className="">
                            Forgotten Password
                        </Link>

                    </div>
          {<div className="text-black font-bold my-2 ">{errorMessage}</div>}

                    <Button> Sign In </Button>
                    <p className="text-xs text-center" >
                        Don&apos;t have an account? <Link href="/signup" className="font-bold" >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </main>
    );

}
