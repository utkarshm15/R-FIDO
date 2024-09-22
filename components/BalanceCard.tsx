"use client"
import { Dispatch, SetStateAction } from "react";

export function BalanceCard({balance,setState}:{balance:Number,setState:Dispatch<SetStateAction<boolean>>}){
    return <div className="flex justify-center mt-10 ">
     <div className="flex flex-col gap-6 text-2xl  text-center h-64 w-2/3 p-10 bg-transparent z-10 rounded font-semibold">
    <div className="border rounded px-8 py-4 flex flex-col gap-2 text-white ">
        <div>Your Balance</div>
        <div>₹ {balance.toString()} </div>
    </div>
    <div className="bg-rose-500 rounded-lg px-2 py-1 text-white shadow hover:bg-rose-600 cursor-pointer" onClick={()=>{setState(true)}}>Add Money</div>
</div>
</div>
}