import { create } from "zustand";

type UserData = {
    first: string;
    last: string;
};

type UserDataType = {
    userData: UserData;
    get: () => Promise<void>;
    update: (data: UserData) => void;
};

export const useUserData = create<UserDataType>((set) => ({
    userData: { first: "User", last: "Name" },
    get: async () => {
        // Replace with actual fetch logic if needed
        const fetchedData = { first: "user", last: "Name" }; 
        set({ userData: fetchedData });
    },
    update: (data: UserData) => {
        set({ userData: data });
    },
}));
