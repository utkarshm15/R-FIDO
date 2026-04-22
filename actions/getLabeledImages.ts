"use server"

import prisma from "@/lib/db"

const getLabeledImages = async()=>{
    try {
        const res = await prisma.user.findMany({
            select : {
                faceDiscriptor:true
            },where:{
                NOT:{
                    faceDiscriptor : undefined 
                }
            }
        })
        return {
            ok : true,
            data:res
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false,
        }        
    }
}

export default getLabeledImages