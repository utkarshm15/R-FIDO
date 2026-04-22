"use client"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "@radix-ui/react-label"
import { signup } from "@/actions/signup"
import { useRouter } from "next/navigation"


import Link from "next/link"
import { toast } from "@/hooks/use-toast"

const inputSchema = z.object({
    name : z.string().min(1,{message:"This field is mandatory"}),
    phone : z.string().max(10,{message:"Phone Number can not be more than 10 digits"}).min(10,{message:"Phone Number can not be less than 10 digits"}).regex(/^\d+$/, {
    message: "Only numeric characters are allowed",
  }),
    password : z.string().min(8,{message:"Password length should not be less than 8"}).max(16,{message:"Password length should not be more than 16"}),
    confirmPassword : z.string()
}).refine((data)=>{
     if(data.password === data.confirmPassword){
        return true
     }else{
        return false
     }
},{message:"Passwords should be same",
    path:["confirmPassword"],
})


export function Signup(){
    const router = useRouter();
    const form = useForm<z.infer<typeof inputSchema>>({
        resolver:zodResolver(inputSchema),
        defaultValues:{
            name:"",
            phone:"",
            password:"",
            confirmPassword:""
        }
    })
    return <div className="h-lvh grid grid-cols-2 items-center max-sm:flex flex-col justify-center max-sm:bg-left bg-[url(/bluebg.jpg)]">
     <div className="flex justify-center py-10 ">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(async(data:z.infer<typeof inputSchema>)=>{
                    const res = await signup(data);
                    if(res.ok && !!res.id){
                        router.push("/login")
                    }else{
                        if(res.message==="User already exists"){
                            toast({
                                variant: "destructive",
                                title: res.message,
                                description: "The Phone no. you entered already exists, sign up with a different Phone no. or sign in to continue.",
                            })
                        }else{
                            
                            toast({
                                variant: "destructive",
                                title: "Uh oh! Something went wrong.",
                                description: "There was a problem with your request.",
                            })
                        }
                    }
                    
})} className=" lg:p-10  lg:w-2/3 sm:p-6 p-4 rounded-lg text-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] bg-blue-500/10 border border-blue-800 backdrop-blur-xl">
            <Label className="lg:text-4xl text-2xl py-2 font-bold flex justify-center">Register Your Account</Label>
            <Label className="lg:text-sm text-xs sm:pb-6 pb-2 font-md flex justify-center">Enter your details to join RFIDO.</Label>
                <FormField control={form.control} name="name"  render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" className="text-black"  {...field}></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                    </FormItem>
                )}/>
            
                <FormField control={form.control} name="phone"  render={({field})=>(
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="987654321" className="text-black"  {...field}></Input>
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
                <FormField control={form.control} name="confirmPassword"  render={({field})=>(
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input placeholder="********" className="text-black" type="password"  {...field}></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                    </FormItem>
                )}/> 
                <div className="flex justify-center mt-4 ">
                <Button  className="w-full bg-sky-500 hover:bg-orange-500 transition-colors duration-300" type="submit">Signup</Button>
                </div>
                <div className="sm:text-sm text-xs pt-2 pb-6 font-md flex justify-center">Already have an account ? <Link className="underline ml-1 text-sky-600 hover:text-blue-400" href={"/login"}>Login</Link></div>
            </form>
        </Form>
    </div>
    </div>
}