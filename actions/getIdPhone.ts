"use server"
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getId(phone : string){
    
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        return {
            ok:false,
            message:"Unauthorized Request"
        }
    }
    try{
        
        const id = await prisma.user.findFirst({
            where:{
                phone:phone
            },
            select:{
                id:true            }
        })
    
        
        console.log(id?.id);
        
        if(!id){
            return {
                ok:false,
                message:"Phone no. not registered"
            }
        }
        return {
            ok:true,
            id:id?.id
        }
    }catch(err){
        return{
            ok:false,
            message:"Something went wrong !"
        }
    }
}