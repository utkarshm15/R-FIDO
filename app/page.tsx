import { Navbar } from "@/components/Navbar";
import { Cover } from "@/components/ui/cover";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/Spotlight";

import Link from "next/link";

export default async function(){
  
  return <div className="py-44 text-center text-stone-300 bg-black flex flex-col gap-8 font-bold  h-dvh">
   <Navbar></Navbar>
    <Spotlight className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"></Spotlight>
  
    <div className="text-5xl">
      <div className="text-4xl font-semibold">No<FlipWords className="text-stone-300 font-bold text-5xl " words={["Phone ?","Cash ?","Card ?"]}></FlipWords></div>
      <div ><span >No</span> Worries.</div>
    </div>
    <div className="text-5xl text-center mt-4">Here's  <Cover className="text-8xl rounded-lg cursor-default font-sans">RFIDO</Cover></div>
    <div className="flex justify-center">
      <div className="line-clamp-2 text-left  text-2xl font-semibold ">
          On-the-Go payments
          for everyone & everywhere
      </div> 
    </div>
    <Link href={"/signup"}> 
    <div className="relative mt-4 flex justify-center hover:text-sky-300 text-lg w-fit mx-auto pointer cursor-pointer">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>Join Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="  mx-1 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
</svg>
</div>
</Link>
  </div>
}