"use client";

import { useEffect, useState } from "react";
type Portfolio = {
    id:string;
    name:string;
    symbol:string;
    quantity:number;
    current_price:number;
    value:number;
}

export default function portfolioPage(){
    // const [coins,setCoins] = useState<Coin[]>([]);
    const [portfolio,setPortfolio] = useState<Portfolio[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError]= useState("");
    const [balance,setBalance] = useState(0);
    const [portfolioValue,setPortfolioValue] = useState(0);

    useEffect(()=>{
        const fetchPortfolio=async function() {
        try{
            const data = await fetch("/api/portfolio");
            const portfolio =await data.json();
            setPortfolio(portfolio?.holdings || []);
            setBalance(portfolio.balance);
            setPortfolioValue(portfolio.value);
        }
        catch(err){
        setError("unable to fetch the portfolio");
        console.error(err);
        }finally{
            setLoading(false);
        }
    }
        fetchPortfolio();
},[]);
    if(loading) return <div className="text-center mt-10">Loading...</div>
    if(error) return <p className="text-center mt-10">{error}</p>

    return (
  <div className="max-w-5xl mx-auto px-5 py-10">
    <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>
    <div className="mb-6 flex justify-between items-center">
  <p className="text-gray-700 font-medium">Balance: ${balance?.toLocaleString() || 0}</p>
  <p className="text-gray-700 font-medium">Total Value: ${portfolioValue?.toLocaleString() || 0}</p>
</div>


    {portfolio.length === 0 ? (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-lg mb-4">
          You don’t have any holdings yet.
        </p>
        <a
          href="/market"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Explore Market →
        </a>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolio.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg mb-2">
              {p.name} ({p.symbol.toUpperCase()})
            </h3>
            <p className="text-gray-600">Quantity: {p.quantity}</p>
            <p className="text-gray-600">
              Current Price: ${p.current_price.toLocaleString()}
            </p>
            <p className="mt-2 font-semibold">
              Value: ${p.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);


}