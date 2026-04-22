"use client"
import { addBalance } from "@/actions/addBalance";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function BalanceCard({balance}:{balance:Number}){

    const [open,setOpen] = useState<boolean>(false);

    return <div className="flex-1 flex justify-center items-start md:items-center py-6">
        {open ? <Modal setState={setOpen}></Modal> : null}
        <div className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="absolute -top-20 -right-20 h-56 w-56 bg-rose-500/30 rounded-full blur-3xl"/>
                <div className="absolute -bottom-16 -left-16 h-40 w-40 bg-indigo-500/20 rounded-full blur-2xl"/>

                <div className="relative p-6 md:p-8 text-center">
                    <div className="text-sm uppercase tracking-widest text-gray-300">Your Balance</div>
                    <div className="mt-2 text-4xl md:text-5xl font-extrabold text-white">
                        ₹ {balance.toString()}
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={()=> setOpen(true)}
                            className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-[0.98] text-white font-semibold shadow-lg shadow-rose-500/30 transition"
                        >
                            Add Money
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


function Modal({ setState }: { setState: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [amount, setAmount] = useState(0);

  function handleClickOutside(event: MouseEvent) {
    if (containerRef.current && (containerRef.current === event.target)) {
      setState(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md rounded-2xl border border-white/20 bg-white/10 shadow-2xl p-6 md:p-8 text-center">
        <button
          aria-label="Close"
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-red-500/90 hover:bg-red-600 text-white flex items-center justify-center"
          onClick={() => setState(false)}
        >
          ✕
        </button>
        <div className="text-2xl md:text-3xl text-white font-bold">Enter Amount</div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[100,200,500,1000].map(v => (
            <button key={v} onClick={() => setAmount(v)} className="px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm">₹{v}</button>
          ))}
        </div>
        <input
          onChange={(e) => setAmount(Number(e.target.value))}
          value={amount || ''}
          className="mt-4 w-full rounded-xl bg-white/10 focus:bg-white/15 border border-white/20 text-white placeholder:text-gray-300 text-lg md:text-2xl font-semibold px-4 text-center py-3 outline-none"
          autoFocus
          type="number"
          placeholder="Enter amount"
        />
        <button
          onClick={async () => {
            if (amount === 0) {
              return toast({
                variant: "destructive",
                title: "Invalid Request",
                description: "Please enter an appropriate amount",
              });
            }
            const res = await addBalance(amount);
            if (!res.ok) {
              return toast({
                variant: "destructive",
                title: "Something Went Wrong",
                description: res.message,
              });
            }
            toast({
              title: "Successful",
              description: res.message,
              className: "bg-green-500",
            });
            setState(false);    
            router.push("/dashboard");
          }}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-rose-500 hover:bg-rose-600 px-4 py-3 text-white text-lg font-semibold shadow-lg shadow-rose-500/30 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}