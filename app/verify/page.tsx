"use client";


import { UploadDropzone } from "@/lib/uploadthing";
import {  } from "@uploadthing/react";
import { REGEXP_ONLY_DIGITS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react";

import { verify } from "@/actions/verify";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";



 
 
export default function Home() {
    const [value,setValue] = useState("") 
    const [url,setUrl] = useState("")
    const router = useRouter()
    
  return (
    <main className="flex min-h-screen text-white flex-col bg-gradient-to-tr via-slate-950 from-black to-black items-center justify-center gap-4  p-10">
        <div className="text-center text-xl font-lg">To complete your registration upload your photo for face <br />recognition and create your payment pin for payment verification.</div>
      <UploadDropzone
      className="bg-slate-900"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          setUrl(res[0].url)
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className="mx-auto border bg-slate-900 p-10 rounded-lg">
      <div className="my-2">Enter Pin </div>
      <InputOTP onChange={(value)=>setValue(value)} value={value} maxLength={4} pattern={REGEXP_ONLY_DIGITS} >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
      </div>
      <button className="rounded-lg bg-blue-500/30 border border-blue-500 p-2 px-8 hover:bg-slate-900" onClick={async()=>{
        console.log(value,url);
        
        if(value.length<4 || url===""){
            toast({
                variant:"destructive",
                title:"Invalid Request",
                description:"Provide complete details"
            })
            return
        }
        const res = await verify({url,value})
        if(!res.ok){
            return toast({variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",})
        }
        router.push("/dashboard")
      }}>Submit</button>
      
    </main>
    
  );
}