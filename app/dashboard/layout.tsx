"use client"
import DashboardButton from "@/components/DasboardButton";
import { Navbar } from "@/components/Navbar";
import LogoutBtn from "@/components/ui/logout";
import { ArrowLeft, ArrowLeftRight, ArrowRight, History, House, IndianRupee} from "lucide-react";
import { ReactNode, useState } from "react";

export default function({children}:{children:ReactNode}){

    const [open,setOpen ] = useState<boolean>(false)

    return (
            <div className="relative bg-gradient-to-tr via-slate-950 from-black flex flex-col to-black min-h-screen">
      <Navbar></Navbar>
        <button style={{transform:`${open?"translateX(150px)":""}`}} className="absolute md:hidden left-1 top-12 z-40 text-white" onClick={()=>setOpen(p=>!p)}>{open?<ArrowLeft/>:<ArrowRight />}</button>
    <div className="flex relative flex-1 min-h-0">
        <div id="navbar" className={`text-white max-md:w-[70%] max-xl:w-[20%] w-[17%] flex flex-col justify-between max-lg:text-base text-xl font-semibold pl-[2rem] max-lg:pl-[1.2rem] py-10 bg-slate-900 sticky top-0 h-screen overflow-y-auto shrink-0`}>
            <div className="flex flex-col gap-10">
            <DashboardButton name="Dashboard" to="/dashboard"><House/></DashboardButton>
            <DashboardButton name="Transaction" to="/transaction"><ArrowLeftRight /></DashboardButton>
            <DashboardButton name="History" to="/dashboard/history"><History /></DashboardButton>
            <DashboardButton name="Topup Wallet" to="/dashboard/topup"><IndianRupee /></DashboardButton>
          </div>
          <LogoutBtn/>
        </div>
        <div style={{transform:`${open?"translateX(0px)":"translateX(-600px)"}`}} className={`md:hidden  absolute top-0 transition-all duration-300 text-white max-sm:min-w-[50vw] w-[30vw] flex flex-col bottom-0 justify-between max-md:text-base text-xl font-semibold pl-[2rem] max-md:pl-[1.2rem]  py-10 z-30 bg-slate-900/40 backdrop-filter backdrop-blur-xl`}>
            <div className="flex flex-col gap-10">
            <DashboardButton name="Dashboard" to="/dashboard"><House/></DashboardButton>
            <DashboardButton name="Transaction" to="/transaction"><ArrowLeftRight /></DashboardButton>
            <DashboardButton name="History" to="/dashboard/history"><History /></DashboardButton>
            <DashboardButton name="Topup Wallet" to="/dashboard/topup"><IndianRupee /></DashboardButton>
          </div>
          <LogoutBtn/>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        </div>
        </div>
    )
}

