"use client"

import { Button } from "./ui/button";
import CopyInput from "./ui/copyinput";
import { Input } from "./ui/input";

export default function Referral () {
    return(
        <div>
            <div className=" rounded bg-white py-3 px-4">
                <h2 className="font-bold text-2xl py-2">Personal Referral Link:</h2>
                <CopyInput defaultValue="https://www.solarfx.netlify.app/user" />
            </div>
            <div className=" rounded bg-white py-4 px-4 my-6 flex flex-col gap-5">
                <h2 className="font-bold text-2xl ">Referrals</h2>
                <p className=" text-sm">Present our project to your friends, family, or any other community and enjoy the financial benefits. You don't even need an active deposit to receive affiliate commission.</p>
                <Button size="lg"> Learn More </Button>
            </div>
        </div>
    );
}