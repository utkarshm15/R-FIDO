"use client"
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
export function Providers({children}:Readonly<{children : React.ReactNode}>){
    return <SessionProvider>
        {children}
        </SessionProvider>
}