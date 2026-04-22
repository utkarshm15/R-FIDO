import type { Metadata, } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R-FIDO",
  description: "Realtime Face IDentification Overlay",
  
};

import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className+"flex flex-col min-h-screen"}>
        <Providers> 
        {children}
        </Providers>
        <Toaster/>
        </body>
        
    </html>
  );
}
