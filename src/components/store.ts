import { create } from "zustand";
import { firestore } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import Withdrawal from "@/app/main/withdrawal/page";
import { expertData, Payment, PaymentInfo, preusersData } from "./ui/dataTable/columns";


type UserData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deposit: string;
  accountBalance: number;
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

type UserDataType = {
  // userData: object;
  userData: UserData;
  // siteData: siteData;
  paymentData: PaymentInfo[]
  expertData: expertData[]
  preusersData: preusersData[]
  get: (uid: string) => Promise<void>;
  getPaymentData: () => Promise<void>;
  getExpertData: () => Promise<void>;
  update: (data: UserData) => Promise<void>;
  getPreusersData: () => Promise<void>
  set: (ref: any, data: UserData) => Promise<void>
  editedData: Record<string, Partial<Payment>>;
  updateEditedData: (id: string, key: keyof Payment, value: string | number) => void;
  getEditedData: (id: string) => Partial<Payment> | object;
};

export const useUserData = create<UserDataType>((set, get) => ({
  userData: {
    firstName: "User",
    lastName: "Name",
    phoneNumber: "",
    deposit: "",
    accountBalance: 0,
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
  paymentData: [
    {
      id: "usdt",
      paymentName: "Usdt (BEP20)",
      paymentAddress: "0x52758f99ba0c608d93a4b0c95952c6034b7aa63c",
      paymentQrcode: "",
    },
    {
      id: "ethereum",
      paymentName: "Ethereum (ERC20)",
      paymentAddress: "0x52758f99ba0c608d93a4b0c95952c6034b7aa63c",
      paymentQrcode: "",
    },
    {
      id: "bitcoin",
      paymentName: "Bitcoin",
      paymentAddress: "1GUbDxT8uLSzj5TopnpvVpGqutfBgg1zRf",
      paymentQrcode: "",
    }
  ],
  preusersData: [{
    id: " ",
    name: " ",
    email: " ",
    password: " ",
    method: " ",
    imageUrl: " ",
    plan: " ",
    amount: " ",
  }],
  getPreusersData: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'preusers'));
      const preusersArray: preusersData[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        // Ensure all required fields are present, or provide default values
        const paymentData: preusersData = {
          id: doc.id,
          name: docData.name,
          email: docData.email,
          password: docData.password,
          method: docData.method,
          imageUrl: docData.imageUrl,
          plan: docData.plan,
          amount: docData.amount,
        };
        preusersArray.push(paymentData);
      });
      console.log("preusersArray", preusersArray)
      set({ preusersData: preusersArray })
      //   setPaymentData(paymentDataArray);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  getPaymentData: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'paymentInfo'));
      const paymentDataArray: PaymentInfo[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        // Ensure all required fields are present, or provide default values
        const paymentData: PaymentInfo = {
          id: doc.id,
          paymentName: docData.paymentName,
          paymentAddress: docData.paymentAddress,
          paymentQrcode: docData.paymentQrcode,
        };
        paymentDataArray.push(paymentData);
      });
      console.log("paymentDataArray", paymentDataArray)
      set({ paymentData: paymentDataArray })
      //   setPaymentData(paymentDataArray);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  expertData: [
    {
      name: "Stacy R. Hall",
      followers: 30000,
      capital: 6500,
      profitPercentage: 70,
      totalProfit: 450000,
      rating: 3,
      image: "https://firebasestorage.googleapis.com/v0/b/quantumx-8dfd8.appspot.com/o/expert%2FJarvis%20B.%20Buckley?alt=media&token=3916b680-3661-4450-9a88-65b651912244"
    },

  ],
  getExpertData: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'expert'));
      const expertDataArray: expertData[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        // Ensure all required fields are present, or provide default values
        const expertData: expertData = {
          name: docData.name,
          followers: docData.followers,
          capital: docData.capital,
          profitPercentage: docData.profitPercentage,
          totalProfit: docData.totalProfit,
          rating: docData.rating,
          image: docData.image,
        };
        expertDataArray.push(expertData);
      });
      set({ expertData: expertDataArray })
      //   setPaymentData(paymentDataArray);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
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

    set({
      editedData: {
        ...prevData,
        [id]: {
          ...prevData[id],
          [key]: value,
        },
      }
    })
  },
  getEditedData: (id) => get().editedData[id],

}));
