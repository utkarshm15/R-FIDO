"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db";
import { getServerSession } from "next-auth"

export async function verify({url,value}:{url:string,value:string}){
    const session = await getServerSession(authOptions);
    try{
        await prisma.user.update({where:{
            id:session.user.id
        },
    data:{
        image:url,
        pin:value
    }})
    return {
        ok:true,
    }
    }catch(err){
        return {
            ok:false
        }
    }
    

    
}