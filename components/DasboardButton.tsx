"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardButton({name,children,to}:{name:string,children:React.ReactNode,to:string}){
  const path = usePathname()  
  return <Link href={to}><button className={`w-fit flex max-lg:gap-1 gap-2 items-center hover:text-blue-400 transition-colors duration-300 ${path==to?"text-blue-400":""}`}>{children}{name}</button></Link>
}