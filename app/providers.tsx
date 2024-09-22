"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";

export function Providers({children,}:Readonly<{children : React.ReactNode}>){
    return <div>
        <SessionProvider>
        {children}
        </SessionProvider>
        </div>
}