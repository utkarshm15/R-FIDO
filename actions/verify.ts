"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db";
import { faceapi, loadModels } from "@/lib/faceApi";
import { loadRemoteImage } from "@/lib/loadImageUrl";
import { getServerSession } from "next-auth"

export async function verify({url,value}:{url:string,value:string}){
    const session = await getServerSession(authOptions);
    await loadModels()
    if(!session || !session.user){
        return {
            ok:false,
            message:"Unauthorized Request"
        }
    }
    try{
        
        const image = await loadRemoteImage(url);
        const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
        if(!detections){
            return {
                ok:false
            }
        }
        const labeledDiscriptor = new faceapi.LabeledFaceDescriptors(`${session.user.name}{}${session.user.id}`,[detections.descriptor])
        await prisma.user.update({where:{
            id:session.user.id
        },
    data:{
        image:url,
        pin:value,
        faceDiscriptor:labeledDiscriptor.toJSON()
    }})
    return {
        ok:true,
    }
    }catch(err){
        console.log(err)
        return {
            ok:false
        }
    }
    

    
}