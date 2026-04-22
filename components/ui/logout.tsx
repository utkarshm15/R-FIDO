"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function LogoutBtn(){
    return <button className="w-fit flex items-center backdrop-filter backdrop-blur-lg bg-red-500/40 hover:bg-red-500/70 transition-colors duration-300 px-4 py-1.5 rounded border border-red-600 gap-2" onClick={()=>signOut()}><LogOut/>Logout</button>
}