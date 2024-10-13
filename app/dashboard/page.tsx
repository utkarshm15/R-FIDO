"use client"
import { addBalance } from "@/actions/addBalance"
import { getData } from "@/actions/getBalance"
import { BalanceCard } from "@/components/BalanceCard"
import { Navbar } from "@/components/Navbar"
import { Cover } from "@/components/ui/cover"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
import { toast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"



interface sentType {
    id: string,
    amount: number,
    date: Date,
    fromUserId: string,
    toUserId: string,
    color? : string
}

export default function(){
    const [open,setOpen] = useState(false)
    const [transaction,setTransaction] = useState<sentType[]>([])
    
    const router = useRouter()
    const session = useSession();

    

    
    const [balance,setBalance] = useState(0);
    const [user,setUser] = useState("");
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
         async function getBalance() {
             
            const res = await getData();
             
             if(res.img===""){
                router.push("/verify")
             }
             if(res.ok && res.balance){
             setBalance(res.balance)
             setTransaction(res.transaction)
             }
             if(res.id){
                setUser(res.id)
             }
            setLoading(false);
        }
        getBalance()
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


    return <div className="relative bg-slate-950 min-h-lvh pt-16">
        <Navbar></Navbar>
    <div className="sm:grid grid-cols-2  relative ">
        {open?<Modal setState={setOpen}></Modal>:null}
        <div>
        <div className="">
            <BalanceCard setState={setOpen} balance={balance}></BalanceCard>
        </div>    
        <div className="pt-12 flex justify-center my-auto  ">
        <div onClick={()=>router.push("/transaction")} className="rounded-md z-10 font-semibold  flex flex-col justify-center h-40 sm:h-64 w-2/3 cursor-pointer  hover:backdrop-blur-xs transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105  border  text-white   text-4xl text-center"> Request
        </div>
        </div>
        
        </div>
        <div className="  z-10  mt-10 rounded pt-4  h-[30rem] sm:h-[40rem] shadow   ">
        <div className="sm:text-4xl text-2xl font-semibold text-transparent  bg-gradient-to-b from-slate-950 via-white to-white bg-clip-text text-center">Transactions</div>
        <div className="overflow-auto pt-2 h-5/6 ">
            <div>
                <div className="py-4 overflow-auto   rounded mx-4 px-10 sm:px-20">
                    {transaction.length==0?"no transactions":transaction.map((r)=>{
                        if(user==r.toUserId){
                            r.color="bg-gradient-to-r from-lime-800 via-lime-600 to-lime-800"
                        }else{
                            r.color="bg-gradient-to-r from-red-900 via-red-700 to-red-900"
                        }
                        return <div className={"flex justify-center text-white my-2 font-semibold sm:w-3/5 py-2 text-center mx-auto rounded-full my-1  sm:text-lg "+r.color}><div className="mr-6">₹ {r.amount}</div><div> {+r.date.getDate()+"/"+r.date.getMonth()+"/"+r.date.getFullYear()}</div><div className="ml-4">  {r.date.getHours()+":"+r.date.getMinutes()}</div></div>})}
                </div>
            </div>
        </div>
    </div>        
    </div>
    <ShootingStars/>
        <StarsBackground/>
    </div>
    
}

function Modal({setState}:{setState:Dispatch<SetStateAction<boolean>>}){
    const router = useRouter()
    const [amount,setAmount] = useState(0);
    return <div className="flex justify-center absolute bg-black/[0.6] h-lvh inset-0 z-40  ">
        <div className="flex flex-col gap-6 bg-white h-60 drop-shadow-2xl rounded   sm:px-28 py-10 text-center ">
        <div className="absolute top-0 right-0 bg-red-600 py-1 px-3 rounded-tr cursor-pointer rounded-bl text-white" onClick={()=>setState(false)}>X</div>
        <div className="sm:text-4xl text-2xl font font-semibold">
           Enter Amount
        </div>
        <input onChange={(e)=>setAmount(Number(e.target.value))} className="shadow bg-gray-200/[0.9] rounded border border-1 border-black text-lg sm:text-2xl font-semibold px-2 text-center" autoFocus type="number"  />
        <div onClick={async()=>{
            if(amount===0){
                return toast({
                    variant : "destructive",
                    title : "Invalid Request",
                    description : "Please enter an appropriate amount"
                })
            }
            const res = await addBalance(amount)
            if(!res.ok){
                return toast({
                    variant : "destructive",
                    title : "Something Went Wrong",
                    description : res.message
                })
            }
            toast({
                title : "Successful",
                description : res.message,
                className:"bg-green-500"
            })
            setState(false);
            router.push("/dashboard")
            
        }} className="cursor-pointer bg-rose-400 hover:bg-rose-600 w-fit mx-auto px-3 py-1 rounded-lg text-white font-lg text-xl">
            Add
        </div>
        </div>
    </div>
}