"use client";
import { addBalance } from "@/actions/addBalance";
import { getRunningBalance } from "@/actions/getRunningBalance";
import { getImage } from "@/actions/getBalance";
import { BalanceCard } from "@/components/BalanceCard";

import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";

interface Data {
  day: string;
  balance: number;
}


export default function () {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const router = useRouter();
  const session = useSession();

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    async function getBalance() {
      if (session.status === "loading") return;
      
      if (session.status === "unauthenticated") {
        router.push("/login");
        return;
      }

      const res = await getImage();

      if (res.image === "") {
        router.push("/verify");
        return;
      }

      const res1 = await getRunningBalance();
      if(!res1.ok){
        toast({
            title:"Error",
            description:res1.message,
            variant:"destructive"
        })
        setLoading(false);
        return;
      }
      if(res1.data) setData(res1.data);
      setLoading(false);
    }
    getBalance();
  }, [session.status, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
        <div className="flex space-x-2 justify-center items-center dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }


  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  
  return (
    <div className="flex flex-col gap-4 flex-1 text-white p-4 md:p-6 lg:p-8 overflow-y-auto">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center py-2">Running Balance</h2>
      <div className="text-black w-full">
        <div className="bg-white/60 backdrop-blur-lg backdrop-filter rounded-lg p-2 md:p-4">
          <LineChart
            xAxis={[{ 
              data: data.map((item) => item.day),
              scaleType: 'point',
              tickLabelStyle: {
                angle: isMobile ? 45 : 0,
                textAnchor: isMobile ? 'start' : 'middle',
                fontSize: isMobile ? 10 : 12,
              }
            }]}
            series={[
              {
                data: data.map((item) => item.balance),
                label: 'Balance (₹)',
                color: '#3b82f6',
              },
            ]}
            margin={{ 
              top: 20, 
              right: isMobile ? 10 : 40, 
              bottom: isMobile ? 60 : 50, 
              left: isMobile ? 40 : 60 
            }}
            height={isMobile ? 300 : isTablet ? 350 : 400}
            sx={{
              width: '100%',
              '& .MuiChartsAxis-root': { 
                color: '#000000 !important' 
              },
              '& .MuiChartsAxis-tick': { 
                stroke: '#000000 !important' 
              },
              '& .MuiChartsAxis-tickLabel': { 
                fill: '#000000 !important',
                fontSize: isMobile ? '10px' : '12px'
              },
              '& .MuiChartsLegend-root': {
                display: isMobile ? 'none' : 'block'
              }
            }}
          />
        </div>
      </div>
      
      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
          <h3 className="text-sm md:text-base text-gray-300 mb-1">Current Balance</h3>
          <p className="text-xl md:text-2xl font-bold">
            ₹{data.length > 0 ? data[data.length - 1].balance : 0}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
          <h3 className="text-sm md:text-base text-gray-300 mb-1">Peak Balance</h3>
          <p className="text-xl md:text-2xl font-bold">
            ₹{data.length > 0 ? Math.max(...data.map(d => d.balance)) : 0}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
          <h3 className="text-sm md:text-base text-gray-300 mb-1">Total Days</h3>
          <p className="text-xl md:text-2xl font-bold">{data.length}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
          <h3 className="text-sm md:text-base text-gray-300 mb-1">Latest Update</h3>
          <p className="text-xl md:text-2xl font-bold">
            {data.length > 0 ? data[data.length - 1].day : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}





