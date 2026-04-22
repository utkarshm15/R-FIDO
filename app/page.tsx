'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function(){
  const auth = useSession()
  const router = useRouter()
  if(auth.status=="authenticated"){
    router.push("/dashboard")
  }else if(auth.status=="unauthenticated"){
    router.push("/home")
  }else{
    return <div>
          <div className='flex space-x-2 justify-center items-center bg-black h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
          </div>
        </div>
  }
}