"use server"
import bcrypt from "bcrypt"
import prisma from "@/lib/db"

interface SignupUser {
    name : string,
    phone : string
    password : string,
}

export async function signup({name,phone,password}:SignupUser){
    const otp = Math.floor(Math.random()*1000000).toString();
    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const existingUser = await prisma.user.findFirst({
            where:{
                phone
            }
        })
        if(existingUser){
            return {
                ok:false,
                message: "User already exists"
            }
        }
        const user = await prisma.user.create({data:{
            name,
            phone,
            password : hashedPassword,
            verificationCode:otp,
            pin:"",
            balance:0

        }})
    return {
        ok:true,
        id: user.id,
        message : "Signed up successfully"
    }
    }catch(err){
        return {
            ok:false,
            message : "Error while Signing up"
        }
    }
}


