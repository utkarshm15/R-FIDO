"use server"
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";


export async function transfer(to: string, amount: number,value:string) {
    const session = await getServerSession(authOptions);
    try{
        console.log(to);
        
    const toUser = await prisma.user.findFirst({
        where:{
            id:to
        }
    })
    console.log(toUser);
    
    if(toUser?.pin!=value){
        return {
            ok:false,
            message: "Incorrect Pin"
        }    
    }
}catch(err){
    console.log("hello1");
    
    return {
        ok:false,
        message: "Error while sending"
    }
}

    const from = session?.user?.id;
    if (!from) {
        console.log("hello2");
        
        return {
            ok:false,
            message: "Error while sending"
        }
    }
    try{
    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "User" WHERE "id" = ${to} FOR UPDATE`;

        const fromBalance = await tx.user.findUnique({
            where: { id: to },
          });
          if (!fromBalance || fromBalance.balance < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.user.update({
            where: { id: to },
            data: { balance: { decrement: amount } },
          });

          await tx.user.update({
            where: { id: from },
            data: { balance: { increment: amount } },
          });
          })
          return {
            ok:true
          }
        }catch(err:any){
            return {
                ok:false,
                message : err.message
            }
        }
    }
