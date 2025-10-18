import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
    const resp = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",{
        next:{revalidate:60}
    })
    if(!resp.ok){
        return NextResponse.json({message:"No data from gpt link"},{status:500})
    }
    const data = await resp.json();
    const filtered = data.map((coin:any)=>({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        price_change_percentage_24h: coin.price_change_percentage_24h,
    }));
    return NextResponse.json(filtered,{status:200})
}catch(err){
    console.error(err)
    return NextResponse.json({
        message:"Something went wrong on our side"
    },{status:500})
}
}