import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R-FIDO",
  description: "Realtime Face IDentification Overlay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <Providers> 
        {children}
        </Providers>
        <Toaster/>
        </body>
        
    </html>
  );
}
