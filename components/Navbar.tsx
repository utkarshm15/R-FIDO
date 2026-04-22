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
    const session = useSession();
    
    return <div className={`flex justify-between items-center sm:px-4 sm:pt-2 z-30 backdrop-filter  backdrop-blur-lg bg-opacity-30 ${pathname==="/home"?"fixed":"relative"}  top-0 left-0 right-0  sm:text-xl border-b  shadow-lg`}>
        <HoverBorderGradient containerClassName="rounded-full p-1 bg-black my-auto mb-1 hover:border-0 border-black" className="bg-black"
        as="button" >
            
        <div className="rounded-full font-serif cursor-pointer font-semibold hover:bg-gradient-to-r hover:from-orange-500 hover:via-white  hover:to-green-500  bg-white py-1 px-2">
        <Image src={rfido} height={40} width={100} className="sm:w-20 w-10 " alt="kk"></Image>
        </div>
        </HoverBorderGradient>
        {pathname=="/home" &&<div className="sm:flex invisible sm:visible justify-between  sm:gap-36 sm:pt-3  text-xs sm:text-base font-['Roboto'] text-gray-500">
        <div className=" rounded-full text-white hover:text-yellow-400 hover:font-semibold flex flex-col justify-center px-4 cursor-pointer ">About</div>
            <div className="cursor-pointer rounded-full text-white hover:text-yellow-400 hover:font-semibold flex flex-col justify-center px-2">Help & Support</div>
            <Link href={"https://github.com/utkarshm15/R-FIDO"} target="/" className="cursor-pointer rounded-full text-white hover:text-yellow-400 hover:font-semibold flex flex-col justify-center px-2">Contribute</Link>
        </div>}
        
         {pathname.startsWith("/dashboard") || pathname.startsWith("/transaction")?<Link href="/dashboard/profile"><div className="rounded-full cursor-pointer mr-2 my-auto size-6 sm:size-10 text-black text-center ring-1 ring-black font-semibold bg-gray-300 flex flex-col justify-center hover:ring-2 hover:ring-blue-500 transition-all">
            {session.data?.user?.name?.split(" ")[0].charAt(0)}
        </div></Link>:<div className="sm:text-sm text-xs pr-2 flex flex-col justify-center"><div><Link href={"/login"}><span className="hover:text-sky-400 cursor-pointer">Login</span></Link> / <Link href={"/signup"}><span className="hover:text-sky-400 cursor-pointer">Signup</span></Link></div></div>}   
        
    </div>
}
