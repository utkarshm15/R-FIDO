"use server"
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getData(){
    const session = await getServerSession(authOptions)
    try {
        const res = await prisma.$transaction([
            prisma.user.findFirst({
                where:{
                    id:session.user.id
                },
                select:{
                    balance:true,id:true
                }}),
                prisma.transaction.findMany({
                    where:{
                        OR:[
                            {
                                toUserId:session.user.id
                            },
                            {
                                fromUserId:session.user.id
                            }
                        ]
                    },
                    orderBy:[{
                        date:"desc"
                    },]
                })
        ])

        
        return {
            ok:true,
            id:res[0]?.id,
            balance:res[0]?.balance,
            transaction:res[1]
        }
    } catch (error) {
        console.log(error);
        return {
            ok:false
        }
        
    }
}