"use client"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "@radix-ui/react-label"

import { useRouter } from "next/navigation"

import {signIn} from "next-auth/react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

const inputSchema = z.object({
    phone : z.string().max(10).min(10),
    password : z.string().min(8,{message:"Password length should not be less than 8"}).max(16,{message:"Password length should not be more than 16"})
})

export function Login(){
    const router = useRouter();
    const form = useForm<z.infer<typeof inputSchema>>({
        resolver:zodResolver(inputSchema),
        defaultValues:{
            phone:"",
            password:""
        }
    })

    return <div className="h-dvh grid grid-cols-2 items-center max-sm:flex flex-col justify-center bg-[url(/bluebg.jpg)] max-sm:bg-left">
    <div className="flex justify-center " >
       <Form {...form}>
           <form onSubmit={form.handleSubmit(async(data)=>{
                console.log(data);
                try{
                const res = await signIn("credentials",{phone:data.phone,password:data.password,redirect:false})
                if(!res){
                    toast({variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",})
                        return
                }
                if(!res.ok){
                    toast({
                        variant:"destructive",
                        description:res?.error
                    })
                    return
                }
                router.push("/dashboard")
            }catch(err){
                console.log(err);
                
            }
                
    })} className="text-white sm:p-10 sm:w-2/3 p-4 rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] bg-blue-500/10 border border-blue-800 backdrop-blur-xl ">
           <Label className="sm:text-4xl text-2xl py-2 font-bold flex justify-center">Login</Label>
           <Label className="sm:text-sm text-xs sm:pb-6 pb-2 font-md flex justify-center">Enter your details to log into R-FIDO.</Label>
           
           <FormField control={form.control} name="phone"  render={({field})=>(
                   <FormItem>
                       <FormLabel>Phone</FormLabel>
                       <FormControl>
                           <Input placeholder="9876543210" className="text-black"  {...field}></Input>
                       </FormControl>
                       <FormMessage></FormMessage>
                   </FormItem>
               )}/>
                               <FormField control={form.control} name="password"  render={({field})=>(
                   <FormItem>
                       <FormLabel>Password</FormLabel>
                       <FormControl>
                           <Input placeholder="********" className="text-black" type="password"  {...field}></Input>
                       </FormControl>
                       <FormMessage></FormMessage>
                   </FormItem>
               )}/> 
               <div className="flex justify-center mt-4 ">
               <Button  className="w-full bg-sky-500 hover:bg-orange-500 transition-colors duration-300" type="submit">Login</Button>
               </div>
               <div className="sm:text-sm text-xs pt-2 pb-6 font-md flex justify-center">Don't have an account ? <Link className="underline ml-1 text-sky-600 hover:text-blue-400" href={"/signup"}>SignUp</Link></div>
           </form>
       </Form>
   </div>
   
   </div>
}