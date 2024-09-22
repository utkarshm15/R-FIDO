"use client"
import Image from "next/image";
import rfido from "../public/rfido.png"
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";


export function Navbar(){
    const pathname = usePathname();

    const session = useSession();
    return <div className="flex justify-between px-4 pt-2 z-30 backdrop-filter  backdrop-blur-lg bg-opacity-30 fixed  top-0 left-0 right-0  text-xl border-b  shadow-lg">
        <HoverBorderGradient containerClassName="rounded-full p-1 bg-black mb-1 hover:border-0 border-black" className="bg-black"
        as="button" >
        <div className="rounded-full font-serif cursor-pointer font-semibold hover:bg-gradient-to-r hover:from-orange-500 hover:via-white  hover:to-green-500  bg-white py-1 px-2">
        <Image src={rfido} height={40} width={100} alt="kk"></Image>
        </div>
        </HoverBorderGradient>
        <div className="flex justify-between gap-36 pt-3 text-base font-['Roboto'] text-gray-500">
        <div className=" rounded-full hover:bg-slate-700 hover:text-white hover:font-semibold flex flex-col justify-center px-4 cursor-pointer ">About</div>
            <div className="cursor-pointer rounded-full hover:bg-slate-700 hover:text-white hover:font-semibold flex flex-col justify-center px-2">Help & Support</div>
            <div className="cursor-pointer rounded-full hover:bg-slate-700 hover:text-white hover:font-semibold flex flex-col justify-center px-2">Rewards</div>
        </div>
         {pathname==="/dashboard"?<div className="rounded-full cursor-pointer my-auto size-10 text-center ring-1 ring-black font-semibold bg-gray-300 flex flex-col justify-center">
            {session.data?.user?.name?.split(" ")[0].charAt(0)}
        </div>:<div className="text-sm flex flex-col justify-center"><div><Link href={"/login"}><span className="hover:text-sky-400 cursor-pointer">Login</span></Link> / <Link href={"/signup"}><span className="hover:text-sky-400 cursor-pointer">Signup</span></Link></div></div>}   
        
    </div>
}