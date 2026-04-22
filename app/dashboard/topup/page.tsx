import { getBalance } from "@/actions/getBalance";
import { BalanceCard } from "@/components/BalanceCard";
import { toast } from "@/hooks/use-toast";

export default async function Topup(){
    const {ok,balance} = await getBalance()
    if(!ok){
        toast({variant:"destructive",title:"Something went wrong"})
    }
    return (
        <div className="w-full flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-center text-2xl md:text-3xl font-bold text-white">Top up Wallet</h1>
                    <p className="text-center text-gray-300 mt-1">Securely add funds to your account</p>
                </div>
                <div className="flex items-center justify-center">
                    <BalanceCard balance={balance ?? 0} />
                </div>
            </div>
        </div>
    )
}


