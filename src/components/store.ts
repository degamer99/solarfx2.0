import { create } from "zustand";
import { firestore } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import Withdrawal from "@/app/main/withdrawal/page";
import { Payment } from "./ui/dataTable/columns";


type UserData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    deposit: string
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
    notificationMessage?: string
    minimumWithdrawAmount?: number
    minimumTrade?: number
    numberOfTrade?: number
};
type paymentOptions = {
    address: string;
    name: string
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
    editedData: Record<string, Partial<Payment>>;
  updateEditedData: (id: string, key: keyof Payment, value: string | number) => void;
  getEditedData: (id: string) => Partial<Payment> | object ;
};

export const useUserData = create<UserDataType>((set, get) => ({
    userData: {
        firstName: "User",
        lastName: "Name",
        phoneNumber: "",
        deposit: "",
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
        usdt: { name: "Usdt (BEP20)", address: "0x52758f99ba0c608d93a4b0c95952c6034b7aa63c" },
        ethereum: { name: "Ethereum (ERC20)", address: "0x52758f99ba0c608d93a4b0c95952c6034b7aa63c" },
        bitcoin: { name: "Bitcoin ", address: "1GUbDxT8uLSzj5TopnpvVpGqutfBgg1zRf" },
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
    editedData: {},
  updateEditedData: (id, key, value) => {
   const prevData = get().editedData

   set({ editedData : {
    ...prevData,
    [id]: {
        ...prevData[id],
        [key]: value,
      },}})
  },
  getEditedData: (id) => get().editedData[id],

}));
