import getTransactions from "@/actions/getTransactions"
import { toast } from "@/hooks/use-toast";

export default async function History(){

    const {ok,message,transaction} = await getTransactions();

    if(!ok){ 
      toast({
        variant:"destructive",
        title:message
    })}

    return (
        <div className="z-10 max-h-[30rem] sm:max-h-[40rem] overflow-hidden flex flex-col justify-center items-center flex-1 shadow   ">
          <div className="sm:text-4xl  text-2xl font-semibold text-transparent  bg-gradient-to-b from-slate-950 via-white to-white bg-clip-text text-center">
            Transactions
          </div> 
          <div className="overflow-auto w-full cursor-all-scroll pt-2 h-5/6 hidescroll" >
            <div>
              <div className="py-4 w-full  rounded px-4 sm:px-20">
                {transaction!.length == 0
                  ? "no transactions"
                  : transaction!.map((r) => <TransactionCard name={r.type=="RECEIVED"?r.from.name:r.to.name} type={r.type} amount={r.amount} date={r.date} />
                    )}

              </div>
            </div>
          </div>
        </div>
    )
}


function TransactionCard({type,date,amount,name}:{type:string,date:Date,amount:number,name:string}) {
    return <div className={`${type=="RECEIVED"?"bg-green-300/20 border border-green-500":"bg-red-300 border border-red-500"} sm:w-2/3 rounded-full sm:text-xl backdrop-filter backdrop-blur-lg my-2 text-white  max-md:px-2 py-2 px-6 grid grid-cols-2 max-md:gap-[1rem] gap-[2rem] items-center mx-auto`}>
        <div className="mx-auto">
            <div className="text-sm max-md:text-xs text-gray-300">{type=="RECEIVED"?"Received from":"Sent to"}</div>
            <div className="font-semibold">{name}</div>
        </div>
        <div className="mx-auto">
            <div className="md:text-sm text-[10px] text-gray-300">{date.toLocaleDateString('en-GB')+" "+date.toLocaleTimeString('en-GB')}</div>
            <div className="font-semibold">₹ {amount}</div>
        </div>
    </div>
}




