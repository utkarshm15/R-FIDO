"use client"
import { transfer } from "@/actions/transaction";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function(){
    const [value,setValue] = useState("")
    const [name,setName] = useState(localStorage.getItem("name"))
    const [loading,setLoading]=useState(true);
    const [amount,setAmount] = useState(0);
    const param = useParams<{id:string}>();
    const user_id = param.id[0].slice(0,36)
    const router = useRouter()
    console.log(user_id);
    
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
            if(name){
                toast({
                    title:"Welcome "+name
                })}
        },2000)
    },[])


    if(loading){
        return <div>
            <div className='flex space-x-2 justify-center items-center bg-black h-screen dark:invert'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
</div>
        </div>
    }

    
    return <div className="bg-gradient-to-r from-black via-slate-950 to-black from-30% to-70% pt-40 min-h-lvh"> 
    <div className="p-1 shadow-lg border rounded-lg bg-black text-white mx-10 sm:mx-96 pb-4">
        <div className="mx-auto sm:text-2xl text-lg text-center mt-10  ">
            Enter Amount 
            <Input  onChange={(e)=>setAmount(Number(e.target.value))} className="w-3/5 my-4 text-black mx-auto text-center" autoFocus type="number" placeholder=""></Input>
        </div >
        <p className="sm:text-2xl text-lg text-center">Enter Pin</p>
        <InputOTP className="" onChange={(value)=>setValue(value)} value={value} maxLength={4} pattern={REGEXP_ONLY_DIGITS} >
      <InputOTPGroup className="mx-auto bg-white   text-black rounded my-4">
        <InputOTPSlot typeof="password" index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>    
    </div>
    <div className="flex justify-center py-4 w-full">
    <button className="font-bold hover:shadow py-2 px-8 text-white hover:bg-green-700 outline hover:outline-1 hover:outline-black bg-green-500 rounded-full" onClick={async()=>{
        if(value.length<4 || amount<=0){
            return toast({
                variant:"destructive",
                title:"Invalid Request",
                description:"Please provide complete details"
            })
        }
       
        const res = await transfer(user_id,amount,value)
        if(!res.ok){
            return toast({
                variant:"destructive",
                title:res.message
            })
        }
        toast({
            title:"Payment Successfull",
            description:`Amount ${amount} has been transfered to your account`,
            className:"bg-green-400"
        })
        router.push("/dashboard")

        }}>Pay</button>
    </div>
    </div>
}