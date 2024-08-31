"use server"

import prisma from "@/lib/db"

export async function getUsers(){
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