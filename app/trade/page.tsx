"use client";

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

export default function TradePage(){
    const [loading,setLoading]=useState(true);
    const [symbol,setSymbol] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [type,setType] = useState<"BUY"|"SELL"|"">("");
    const [error,setError] = useState("");
    const [coins,setCoins] = useState<Coin[]>([]);


    useEffect(()=>{
        const fetchCoins = async()=>{
            try{const fetchdata = await fetch("/api/market");
            const data = await fetchdata.json();
            setCoins(data);}
            catch(err){
                setError("unable to fetch the coins");
                console.error(err);
            }finally{
                setLoading(false);
            }
        }
        fetchCoins();
    },[]);
    if(loading) return <div className="text-center mt-10">Loading...</div>
    if(error) return <div className="text-center mt-10">{error}</div>



    const handleSubmit = async(e : React.FormEvent) =>{
        e.preventDefault();
        if (!symbol || quantity <= 0 || (type !== "BUY" && type !== "SELL")) {
            alert("Validation failed: please select all fields properly");
            return;
        }
        
        try{
            const trading = await fetch(`/api/trade`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json", 
                },
                body:JSON.stringify({symbol:symbol,
                    type,
                    quantity
                })
            })
            if(!trading.ok){
                alert("Trade not successful");
                return;
            }
            else{
                alert("trade successful ✅");
                setSymbol("");
                setQuantity(0);
                setType("");
            }
        }catch(err){
            // setError("Something went wrong");
            console.error(err);   
            alert("erro occured while trading");
        }
    };
    

    return (
        <div className="text-center mt-10 p-6 bg-gray-400 shadow rounded-xl">
            <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Trade Page</h1>
            <form className="space-y-5" onSubmit={handleSubmit}>

                {/*Select coin from thjwe dropbox */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-800">Select Coin</label>
                    <select 
                    value={symbol}
                    onChange={(e)=>setSymbol(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700">
                        <option value="">-- Choose Coin --</option>
                        {coins.map((coin)=>(
                            <option key={coin.id} value={coin.symbol}>
                                {coin.name} ({coin.symbol.toUpperCase()})
                            </option>
                        ))}
                    </select>
                </div>

                {/*Quantity of coin to trade */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Quantity</label>
                    <input 
                    type="number"
                    value={quantity}
                    onChange={(e)=>setQuantity(Number(e.target.value))}
                    placeholder="Enter Quantity"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                    min="0"/>
                </div>

                {/*Trade type that is buy or sell */}
                <div>
                     <label className="block text-sm font-semibold mb-2 text-gray-700">Trade type</label>
                     <div className="flex gap-4">
                        <button 
                        type="button"
                        onClick={()=>setType("BUY")}
                        className={`flex-1 py-2 rounded-lg font-semibold transition ${
                            type=== "BUY"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-green-300"
                        }`}>Buy</button>
                        <button
                        type="button"
                        onClick={(e)=>setType("SELL")}
                        className={`flex-1 py-2 rounded-lg font-semibold transition ${
                            type==="SELL"
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-red-300"
                        }`}>
                            Sell
                        </button>
                     </div>
                </div>

                {/* submit button */}
                <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition">Place Trade</button>
            </form>

            
        </div>
    )

}