"use client"


import { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js"
import { getUsers } from "@/actions/getUsers"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"




export default function(){
    const [init,setInit] = useState(false)
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
                    action:<ToastAction altText="Continue"></ToastAction>
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
            window.location.href = "http://localhost:3000/transaction/"+result.toString().split("{}")[1]
            }
        },1000)
    }

    return <div>
        <span>{init?"Initializing":"Ready"}</span>
        <div className="flex justify-center">
            <video ref={videoRef} autoPlay muted height="480" width="640" onPlay={handleVideoPlay}/>
            <canvas className="absolute" ref={canvasRef}></canvas>
        </div>
        
    </div>
        
        
      
}