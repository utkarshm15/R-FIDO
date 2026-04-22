"use client";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { FlipWords } from "@/components/ui/flip-words";
import { ScanFace, Shield, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

import Link from "next/link";



export default function () {

const animatipnProps = {
            initial:{opacity:0,y:50,filter:"blur(10px)"},
          whileInView:{opacity:1,y:0,filter:"blur(0px)",}
}

  return (
    <div className=" text-center bg-[url(/bluebg.jpg)] max-sm:bg-left   snap-y snap-mandatory h-screen overflow-y-scroll text-stone-300  font-bold  ">
      <Navbar></Navbar>
      <div className="h-screen  snap-start bg-cover flex flex-col justify-center">
        <div className="sm:text-5xl my-4 text-yellow-400 text-2xl">
          <div className="sm:text-4xl text-2xl font-semibold">
            No
            <FlipWords
              className="text-yellow-400 font-bold sm:text-5xl max-sm:text-2xl"
              words={["Phone ?", "Cash ?", "Card ?"]}
            ></FlipWords>
          </div>
          <div>
            <span>No</span> Worries.
          </div>
        </div>
        <div className=" text-yellow-400 max-sm:text-base sm:text-4xl py-2">
          Here's{" "}
          <span className="text-transparent max-sm:text-4xl sm:text-6xl  bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            RFIDO
          </span>
        </div>
        <div className="flex justify-center text-yellow-400">
          <div className="line-clamp-2 sm:text-left text-center max-sm:text-lg  sm:text-2xl font-semibold ">
            On-the-Go payments for everyone & everywhere
          </div>
        </div>
        <Link href={"/signup"}>
          <div className=" text-yellow-400 sm:mt-4 mt-2 bg-yellow-700  rounded-full px-2 flex justify-center hover:text-yellow-200 sm:text-lg w-fit mx-auto pointer cursor-pointer">
            Join Now{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="  ml-1 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
          </div>
        </Link>
      </div>

      {/* <div className="flex max-md:flex-col md:flex-row  z-70 relative text-yellow-400 gap-10  text-justify justify-center md:justify-between snap-start h-screen px-1 sm:px-10 items-center py-6 rounded ">
        <div>
          <img src="/faceID.png" alt="" />
        </div>
        <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{once:true}}
          transition={{ staggerChildren: 0.5,duration:1 }}
          className="md:w-2/3 z-30 sm:text-2xl max-sm:text-xs mt-4 sm:mt-0  flex flex-col gap-2 md:gap-10  "
        >
          <motion.div
            variants={animatipnProps}
          >
            At RFIDO, we envision a world where financial transactions are not
            just fast and secure, but also incredibly intuitive. We believe that
            technology should simplify our lives, especially when it comes to
            managing our money. That's why we've developed RFIDO (Realtime Face
            Identification Outlay) – a revolutionary web application that
            leverages the power of advanced face recognition to redefine the way
            you send and receive payments.
          </motion.div>
          <motion.div
            variants={animatipnProps}
          >
            R-FIDO is more than just a payment platform; it's a paradigm shift.
            Designed with your convenience and security in mind, R-FIDO allows
            you to make payments simply by scanning your face using the
            receiver's device. No more fumbling for cards, typing in lengthy
            account numbers, or remembering complex passwords for every
            transaction. Your unique facial biometrics become your secure,
            personal payment key
          </motion.div>
        </motion.div>
      </div> */}
      <div className="z-70 relative  snap-start h-screen flex flex-col justify-center">
        <h1 className="max-sm:mb-4 sm:mb-16 text-center max-sm:text-2xl sm:text-5xl bg-gradient-to-r to-blue-700 via-blue-500 from-blue-700 w-fit mx-auto text-transparent bg-clip-text">Our Features</h1>
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true,amount: 0.3 }}
        transition={{ staggerChildren: 0.3,delayChildren: 0.2}}
        className="grid md:grid-cols-3 text-left px-4 max-sm:gap-0 sm:gap-8 z-70 relative  items-center"
      >
        <motion.div
        variants={animatipnProps}
        >
          
          <Card className="bg-slate-900 border-slate-700 max-md:p-4 md:p-8 hover:bg-slate-900/70 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ScanFace className="w-6 h-6 text-white" />
            </div>
            <h3 className="max-sm:text-base sm:text-xl font-semibold text-white mb-3">
              Tap, Scan, Pay.
            </h3>
            <p className="text-slate-300 leading-relaxed max-sm:text-xs sm:text-base">
              Say goodbye to cards and cash. R-FIDO uses advanced face
              recognition to securely identify you, allowing instant payments
              with just a glance on the receiver's device. Your face is your
              wallet.
            </p>
          </Card>
        </motion.div>
        <motion.div
        variants={animatipnProps}
        >
          <Card className="bg-slate-900 border-slate-700 max-md:p-4 md:p-8 hover:bg-slate-900/70 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="max-sm:text-base sm:text-xl font-semibold text-white mb-3">
              Unmatched Security. Total Control.
            </h3>
            <p className="text-slate-300 leading-relaxed max-sm:text-xs sm:text-base">
              Your security is our priority. R-FIDO combines cutting-edge facial
              biometrics with a unique PIN for every transaction, ensuring your
              funds are always protected and only accessible by you.
            </p>
          </Card>
        </motion.div>
        <motion.div
        variants={animatipnProps}
        >
          <Card className="bg-slate-900 border-slate-700 max-md:p-4 md:p-8 hover:bg-slate-900/80 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="max-sm:text-base sm:text-xl font-semibold text-white mb-3">
              Effortless Payments. Beautifully Designed.
            </h3>
            <p className="text-slate-300 leading-relaxed max-sm:text-xs sm:text-base">
              Experience the future of finance with R-FIDO's intuitive and
              responsive interface. Built with Next.js, Tailwind CSS, and modern
              UI components, it delivers a smooth, delightful user journey on
              any device.
            </p>
          </Card>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}

