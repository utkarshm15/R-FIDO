"use server"
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getBalance(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user){
        return {
            ok:false,
            message:"Unauthorized Request"
        }
    }
    try {
        const res = await prisma.user.findFirst({
                where:{
                    id:session.user.id
                },
                select:{
                    balance:true
                }})

        return {
            ok:true,
            balance:res!.balance,
        }
    } catch (error) {
        console.log(error);
        return {
            ok:false
        }
        
    }
}

export async function getImage(){
    const session = await getServerSession(authOptions)
    if(!session || !session.user){
        return {
            ok:false,
            message:"Unauthorized Request"
        }
    }
    try {
        const res = await prisma.user.findFirst({
                where:{
                    id:session.user.id
                },
                select:{
                    image:true,
                }})

        return {
            ok:true,
            image:res?.image,

        }
    } catch (error) {
        console.log(error);
        return {
            ok:false
        }
        
    }
}