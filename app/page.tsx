import { Navbar } from "@/components/Navbar";
import { Cover } from "@/components/ui/cover";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/Spotlight";

import Link from "next/link";

export default async function(){
  
  return <div className="sm:py-44 py-20 text-center text-stone-300 bg-black flex flex-col gap-8 font-bold  h-lvh">
   <Navbar></Navbar>
    <Spotlight className="sm:-top-40 -top-20 left-0 md:left-60 md:-top-20"
        fill="white"></Spotlight>
  
    <div className="sm:text-5xl text-2xl">
      <div className="sm:text-4xl text-2xl font-semibold">No<FlipWords className="text-stone-300 font-bold sm:text-5xl text-3xl" words={["Phone ?","Cash ?","Card ?"]}></FlipWords></div>
      <div ><span >No</span> Worries.</div>
    </div>
    <div className="sm:text-5xl text-4xl text-center mx-2 mt-4">Here's  <Cover className="sm:text-8xl text-6xl rounded-lg cursor-default font-sans">RFIDO</Cover></div>
    <div className="flex justify-center">
      <div className="line-clamp-2 sm:text-left text-center text-xl  sm:text-2xl font-semibold ">
          On-the-Go payments
          for everyone & everywhere
      </div> 
    </div>
    <Link href={"/signup"}> 
    <div className="relative sm:mt-4 mt-2 flex justify-center hover:text-sky-300 sm:text-lg w-fit mx-auto pointer cursor-pointer">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>Join Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="  mx-1 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
</svg>
</div>
</Link>
  </div>
}