import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function getTransactions(){
    try {
        const session = await getServerSession(authOptions)
            if(!session || !session.user){
                return {
                    ok:false,
                    message:"Unauthorized Request"
                }
            }
        const res = await prisma.transaction.findMany({
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
                    },],
                    select:{
                        id:true,
                        date:true,
                        to :{
                            select:{
                                id:true,   
                                name:true}
                        },
                        from:{
                            select:{
                                id:true,
                                name:true
                            }
                        },
                        amount:true
                    }
                })
        const transaction = res.map(r=>{
            if(r.to.id===session.user.id) return {...r,type:"RECEIVED"}
            else return {...r,type:"SENT"}
        })
        return {
            ok:true,
            transaction
        }
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message : "Something went wrong!"
        }
    }
}