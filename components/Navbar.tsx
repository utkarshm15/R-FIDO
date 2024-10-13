"use client"
import Image from "next/image";
import rfido from "../public/rfido.png"
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";


export function Navbar(){
    const pathname = usePathname();
    const [modal,setModal] = useState(false)
    const session = useSession();
    return <div className="flex justify-between  sm:px-4 sm:pt-2 z-30 backdrop-filter  backdrop-blur-lg bg-opacity-30 fixed  top-0 left-0 right-0  sm:text-xl border-b  shadow-lg">
        <HoverBorderGradient containerClassName="rounded-full p-1 bg-black my-auto mb-1 hover:border-0 border-black" className="bg-black"
        as="button" >
            
        <div className="rounded-full font-serif cursor-pointer font-semibold hover:bg-gradient-to-r hover:from-orange-500 hover:via-white  hover:to-green-500  bg-white py-1 px-2">
        <Image src={rfido} height={40} width={100} className="sm:w-20 w-10 " alt="kk"></Image>
        </div>
        </HoverBorderGradient>
        <div className="sm:flex invisible sm:visible justify-between  sm:gap-36 sm:pt-3  text-xs sm:text-base font-['Roboto'] text-gray-500">
        <div className=" rounded-full hover:bg-slate-700 hover:text-white hover:font-semibold flex flex-col justify-center px-4 cursor-pointer ">About</div>
            <div className="cursor-pointer rounded-full hover:bg-slate-700 hover:text-white hover:font-semibold flex flex-col justify-center px-2">Help & Support</div>
            <div className="cursor-pointer rounded-full hover:bg-slate-700 hover:text-white hover:font-semibold flex flex-col justify-center px-2">Rewards</div>
        </div>
        
         {pathname==="/dashboard"?<div onClick={()=>setModal(prev=>!prev)} className="rounded-full cursor-pointer mr-2 my-auto size-6 sm:size-10 text-center ring-1 ring-black font-semibold bg-gray-300 flex flex-col justify-center">
            {session.data?.user?.name?.split(" ")[0].charAt(0)}
        </div>:<div className="sm:text-sm text-xs pr-2 flex flex-col justify-center"><div><Link href={"/login"}><span className="hover:text-sky-400 cursor-pointer">Login</span></Link> / <Link href={"/signup"}><span className="hover:text-sky-400 cursor-pointer">Signup</span></Link></div></div>}   
        {modal?<Profile ></Profile>:<Profile className="translate-x-60"></Profile>}
    </div>
}

function Profile({className}:{className?:string}){
    return <div className={"absolute top-[49px] sm:top-[74px] right-0 h-dvh w-52 bg-white duration-500 transition ease-in-out "+className}>
            <div className="flex flex-col text-center items-center gap-4 py-4   text-base ">
                <div className="w-full hover:bg-green-200 cursor-pointer " >Your Photo</div>
                <div className="w-full hover:bg-green-200 cursor-pointer" >Change Password</div>
                <div className="w-full hover:bg-green-200 cursor-pointer">Change Name</div>
                <div className="mt-6 bg-red-400 rounded-full px-2 cursor-pointer">Logout</div>
            </div>
    </div>
}