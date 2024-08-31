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
    phone : z.string().max(10),
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

    return <div className="h-dvh flex flex-col justify-center bg-slate-200">
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
                router.push("/")
            }catch(err){
                console.log(err);
                
            }
                
    })} className="border p-10 w-1/3 rounded-lg shadow bg-white">
           <Label className="text-4xl py-2 font-bold flex justify-center">Login</Label>
           <Label className="text-sm pb-6 font-md flex justify-center">Enter your details to log into R-FIDO.</Label>
           
           <FormField control={form.control} name="phone"  render={({field})=>(
                   <FormItem>
                       <FormLabel>Phone</FormLabel>
                       <FormControl>
                           <Input placeholder="9876543210"  {...field}></Input>
                       </FormControl>
                       <FormMessage></FormMessage>
                   </FormItem>
               )}/>
                               <FormField control={form.control} name="password"  render={({field})=>(
                   <FormItem>
                       <FormLabel>Password</FormLabel>
                       <FormControl>
                           <Input placeholder="********" type="password"  {...field}></Input>
                       </FormControl>
                       <FormMessage></FormMessage>
                   </FormItem>
               )}/> 
               <div className="flex justify-center mt-4 ">
               <Button  className="w-full" type="submit">Submit</Button>
               </div>
               <div className="text-sm pt-2 pb-6 font-md flex justify-center">Don't have an account ? <Link className="underline ml-1 text-sky-600 hover:text-blue-400" href={"/signup"}>SignUp</Link></div>
           </form>
       </Form>
   </div>
   </div>
}