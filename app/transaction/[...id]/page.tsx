"use client"
import { transfer } from "@/actions/transaction";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function(){
    const [value,setValue] = useState("")
    const [amount,setAmount] = useState(0);
    const param = useParams<{id:string}>();
    const user_id = param.id[0].slice(0,(param.id.length-10))
    console.log(user_id);
    
    return <div className="">
        <div className="mx-auto text-2xl text-center mt-20">
            Enter Amount
            <Input value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="w-1/5 my-4  mx-auto text-center" autoFocus type="number" placeholder=""></Input>
        </div>
        <p className="text-2xl text-center">Enter Pin</p>
        <InputOTP  onChange={(value)=>setValue(value)} value={value} maxLength={4} pattern={REGEXP_ONLY_DIGITS} >
      <InputOTPGroup className="mx-auto my-4">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
    <div className="flex justify-center w-full">
    <button className="  py-2 px-4 text-white  bg-green-500 rounded-full" onClick={async()=>{
        if(value.length<4 || amount<=0){
            return toast({
                variant:"destructive",
                title:"Invalid Request",
                description:"Please provide complete details"
            })
        }
        console.log(amount,value)
        const res = await transfer(user_id,amount,value)
        if(!res.ok){
            return toast({
                variant:"destructive",
                title:res.message
            })
        }
        toast({
            title:"Payment Successfull",
            description:`Amount ${amount} has been transfered to your account`
        })


        }}>Pay</button>
    </div>
    </div>
}