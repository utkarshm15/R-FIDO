"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db";
import { getServerSession } from "next-auth"

export async function addBalance(amount:number){
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return {
            ok:false,
            message:"Unauthorized Request"
        }
    }
    try{
        await prisma.user.update({
                where :{
                    id:session.user.id
                },
                data:{
                    balance:{
                        increment:amount
                    }
                }
            })
        return {
            ok:true,
            message:"Balance updated succesfully"
        }
    }catch(err){
        console.log(err);
        return {
            ok:false,
            message:"Error while updating balance"
        }
    }
}