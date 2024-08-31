"use server"
import prisma from "@/lib/db";

export async function getId(phone : string){
    try{
        console.log(phone);
        
        const id = await prisma.user.findFirst({
            where:{
                phone:phone
            },
            select:{
                id:true            }
        })
        console.log("jello");
        
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