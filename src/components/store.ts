import { create } from "zustand";
import { firestore } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Withdrawal from "@/app/main/withdrawal/page";

type UserData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword?: string;
    pending?: boolean;
    pendingAddress?: string;
    pendingAmount?: string;
    pendingType?: string;
    pendingImage?: string;
    totalProfit?: string;
    tradingAmount?: string;
    WithdrawalLimit?: string;
    totalWithdrawal?: string;
};
type paymentOptions = {
    address: string;
    url: string
}
type siteData = {
    usdt: paymentOptions
    ethereum: paymentOptions
    bitcoin: paymentOptions
};

type UserDataType = {
    // userData: object;
    userData: UserData;
    siteData: siteData;
    get: (uid: string) => Promise<void>;
    update: (data: UserData) => Promise<void>;
    // update: (data: UserData) => void;
    set: (ref: any, data: UserData) => Promise<void>
};

export const useUserData = create<UserDataType>((set) => ({
    userData: {
        firstName: "User",
        lastName: "Name",
        phoneNumber: "",
        password: "",
        pending: false,
        pendingAddress: "",
        pendingAmount: "",
        pendingType: "",
        pendingImage: "",
        totalProfit: "0",
        tradingAmount: "0",
        WithdrawalLimit: "",
        totalWithdrawal: "0",
    },
    siteData: {
        usdt: {address: "", url: ""},
        ethereum: {address: "", url: ""},
        bitcoin: {address: "", url: ""},
    },
    get: async (uid: string) => {
        // Replace with actual fetch logic if needed
        let fetchedData
        const userRef = doc(firestore, "users", uid)
        try {
            await getDoc(userRef)
                .then((file) => {
                    fetchedData = { ...file.data() };
                    console.log("data", file.data())
                })
        } catch (error) {
            console.error(error)
        }

        // const fetchedData = { first: "user", last: "Name" };
        set({ userData: fetchedData });
    },
    update: async (data) => {
        set({ userData: data });
    },
    set: async (ref, data) => {
        await setDoc(ref, data)
        set({ userData: data });

    },
}));
