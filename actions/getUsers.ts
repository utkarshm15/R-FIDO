"use server"

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db"
import { getServerSession } from "next-auth";

export async function getUsers(){
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return {
            ok:false,
            message:"Unauthorized Request"
        }
    }
    try{
        const res = await prisma.user.findMany({select:{
            id:true,
            name:true,
            image:true
        }})
        return {
            ok:true,
            res
        }
    }catch(err){
        return {
            ok:false
        }
    }
}