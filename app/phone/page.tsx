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
    return <div className="px-96 bg-gradient-to-r from-black via-slate-950 to-black from-30% to-70% pt-20 min-h-dvh">
        <div className="text-2xl text-center shadowed-lg bg-black text-white  mt-20 border rounded py-40 px-20">
            Enter Phone Number
            <Input value={value} onChange={(e)=>setValue(e.target.value)} className="w-full my-8  mx-auto text-center" autoFocus type="number" placeholder=""></Input>
            <div className="flex justify-center ">
    <button className=" text-xl  py-2 px-4 text-white w-full bg-green-500 hover:bg-green-700 rounded-full" onClick={async()=>{
        const res = await getId(value);
        if(!res.ok){
            return toast({
                variant:"destructive",
                title:res.message
            })
        }
        router.push("transaction/"+res.id)
    }} >Pay</button>
    </div>
        </div>
    
    </div>
}
