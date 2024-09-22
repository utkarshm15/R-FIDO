"use client"


import { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import { getUsers } from "@/actions/getUsers"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"




export default function(){
    const [init,setInit] = useState(true)
    const router = useRouter()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)

    useEffect(()=>{
        async function loadModels(){
            const MODEL_URL = "/models"
            console.log(MODEL_URL);
            setInit(true);
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            ]).then(startVideo)
        }
        loadModels();
    },[])

    function startVideo(){

        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video:true}).then(function(stream){
                //@ts-expect-error
                videoRef.current.srcObject =stream;
            })
        }       
    }
    async function loadLabeledImages(){
        const {res} = await getUsers()
        const labels = res?.map((user)=>(user.image!=""?{label:user.name+"{}"+user.id,
            img:user.image
        }:""))
        if(!labels){
            return
        }
        return Promise.all(
            labels.map(async label =>{
                if(label==""){
                    return
                }
                const img = await faceapi.fetchImage(label.img)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                if(!detections){
                    return
                }
                return new faceapi.LabeledFaceDescriptors(label.label,[detections.descriptor])
            })
        )
    }

    async function handleVideoPlay(){
        const labeledFace = await loadLabeledImages();
        console.log(labeledFace);
        
        const matcher = new faceapi.FaceMatcher(labeledFace,0.55)
        setTimeout(async()=>{
            if(init){
                setInit(false)
            }
            //@ts-expect-error
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
            const displaySize={
                width:640,
                height :480
            }
            //@ts-expect-error
            faceapi.matchDimensions(canvasRef.current,displaySize)
            //@ts-expect-error
            const detections = await faceapi.detectSingleFace(videoRef.current,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
            if(!detections){
                return toast({
                    title:"Face not recognized",
                    description:"Do you want to pay by using phone no.?",
                    action:<ToastAction onClick={()=>router.push("/phone")} altText="Continue">Continue</ToastAction>
                })
            }
            const reseizedDetections = faceapi.resizeResults(detections,displaySize)
            // //@ts-expect-error
            // canvasRef.current.getContext('2d').clearRect(0,0,640,480);
            // //@ts-expect-error
            // faceapi.draw.drawDetections(canvasRef.current,reseizedDetections)
            // //@ts-expect-error
            // faceapi.draw.drawFaceLandmarks(canvasRef.current,reseizedDetections)
            if(!reseizedDetections){
                return
            }
            const result = matcher.findBestMatch(reseizedDetections?.descriptor)
            const box = detections?.detection.box
            
            if(box){
            const drawBox = new faceapi.draw.DrawBox(box,{label:result.toString().split("{}")[0]})
            //@ts-expect-error
            drawBox.draw(canvasRef.current)
            }
            console.log(result.toString().split("{}")[0]);
            
            if(result.toString().split("{}")[0].includes("unknown")){
                console.log("hello");
                
                return toast({
                    variant:"destructive",
                    title:"Unrecognized Face",
                    description:"Register your biometrics to use R-FIDO",
                    action:<ToastAction altText="Try Again" onClick={async()=>await handleVideoPlay()}>Try Again</ToastAction>
                })
            }else{
            localStorage.setItem("name",result.toString().split("{}")[0]);
            router.push("/transaction/"+result.toString().split("{}")[1])
            }
        },1000)
    }


    return <div className="pt-20 min-h-dvh  bg-slate-950">
        <div className="flex z-20 text-white justify-center " >
            <div>{init?"Loading":"Ready"}</div>
            <div>{init?<div
  className="inline-block h-4 w-4 ml-2 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span
  >
</div>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
}</div>
            
        </div>
        <div className="flex justify-center z-20">
            <video className="rounded" ref={videoRef} autoPlay muted height="480" width="640" onPlay={handleVideoPlay}/>
            <canvas className="absolute" ref={canvasRef}></canvas>
        </div>
        
    </div>
        
        
      
}