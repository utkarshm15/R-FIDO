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
    phone : z.string().max(10),
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
    return <div className="h-dvh flex flex-col justify-center bg-slate-200">
     <div className="flex justify-center  ">
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
                    
})} className="border p-10 w-1/3 rounded-lg shadow bg-white">
            <Label className="text-4xl py-2 font-bold flex justify-center">Register Your Account</Label>
            <Label className="text-sm pb-6 font-md flex justify-center">Enter your details to join R-FIDO.</Label>
                <FormField control={form.control} name="name"  render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe"  {...field}></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                    </FormItem>
                )}/>
            
                <FormField control={form.control} name="phone"  render={({field})=>(
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="987654321"  {...field}></Input>
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
                <FormField control={form.control} name="confirmPassword"  render={({field})=>(
                    <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                            <Input placeholder="********" type="password"  {...field}></Input>
                        </FormControl>
                        <FormMessage></FormMessage>
                    </FormItem>
                )}/> 
                <div className="flex justify-center mt-4 ">
                <Button  className="w-full" type="submit">Submit</Button>
                </div>
                <div className="text-sm pt-2 pb-6 font-md flex justify-center">Already have an account ? <Link className="underline ml-1 text-sky-600 hover:text-blue-400" href={"/login"}>Login</Link></div>
            </form>
        </Form>
    </div>
    </div>
}