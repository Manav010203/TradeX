"use client";

// import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
type Coin = {
    id:string;
    symbol:string;
    name:string;
    image:string;
    current_price:number;
    market_cap : number;
    price_change_percentage_24h:number;
}

export default function marketPage(){

    const [coins,setCoins] = useState<Coin[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("")

    // const session = await getServerSession();
    // // if(!session){
    // //     setLoading(true);
    // // }
    useEffect(()=>{
        const fetchcoins =async()=>{ 
        try{
            const resp = await fetch("/api/market");
            if(!resp.ok) throw new Error ("Unable to fetch data")
            const data = await resp.json();
            setCoins(data);
        }catch(err){
            setError("Error loading the data");
            console.error(err);
        }finally{
            setLoading(false)
        }
    };
    fetchcoins();
    },[]);
    if(loading) return <div className="text-center mt-10">Loading...</div>
    if(error) return <p className="text-center mt-10">{error}</p>

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Market Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coins.map((coin)=>(
                    <div key={coin.id}
                    className="border rounded-xl p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center space-x-3">
                            <img src={coin.image} alt={coin.name} className="w-10 h-10">
                            </img>
                            <div>
                                <p className="font-semibold">{coin.name}</p>
                                <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
                                </div>
                                </div>
                                <p className="mt-3">$ {coin.current_price.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">
                                    24:{" "}
                                    <span
                                     className={
                                        coin.price_change_percentage_24h>0 ? "text-green-500":"text-red-500"
                                     }>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                     </span>
                                </p>
                                
                            </div>
                ))}
            </div>
        </div>
    )
}