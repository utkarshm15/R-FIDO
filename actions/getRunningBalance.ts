"use server"

import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export async function getRunningBalance() {
    try {
    const session = await getServerSession(authOptions)
    if(!session || !session.user){
        return {
            ok:false,
            message:"Unauthorized Request"
        }
    }

    const result = await prisma.$queryRawUnsafe<
      { day: Date; balance: number }[]
    >(`
      WITH daily_totals AS (
        SELECT
          DATE("date") AS day,
          SUM(
            CASE 
              WHEN "toUserId" = $1 THEN "amount"
              WHEN "fromUserId" = $1 THEN - "amount"
              ELSE 0
            END
          ) AS daily_change
        FROM "Transaction"
        WHERE "toUserId" = $1 OR "fromUserId" = $1
        GROUP BY DATE("date")
      )
      SELECT
        day,
        SUM(daily_change) OVER (ORDER BY day) AS balance
      FROM daily_totals
      ORDER BY day;
    `, session.user.id);

    return {
        ok:true,
        data:result.map((r) => ({
            day: new Date(r.day).toISOString().split("T")[0],
            balance: Number(r.balance),
          }))
    };
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message:"Internal Server Error"
        }
    }
}