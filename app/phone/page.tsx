"use client"
import { getId } from "@/actions/getIdPhone";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function(){
    const router = useRouter()
    const [value,setValue] = useState("")
    return <div className="">
        <div className="mx-auto text-2xl text-center mt-20">
            Enter Phone Number
            <Input value={value} onChange={(e)=>setValue(e.target.value)} className="w-1/5 my-4  mx-auto text-center" autoFocus type="number" placeholder=""></Input>
        </div>
    <div className="flex justify-center w-full">
    <button className="  py-2 px-4 text-white  bg-green-500 rounded-full" onClick={async()=>{
        const res = await getId(value);
        if(!res.ok){
            return toast({
                variant:"destructive",
                title:res.message
            })
        }
        router.push("/transaction/"+res.id+"122345678")
    }} >Pay</button>
    </div>
    </div>
}
