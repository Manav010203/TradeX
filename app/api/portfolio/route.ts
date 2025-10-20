import  prisma  from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try{
    const session = await getServerSession();
    if(!session?.user){
        return NextResponse.json({
            message:"User not logged in"
        },{
            status:401
        })
    }
    const user  = await prisma.user.findUnique({
        where:{
            email:session.user.email ||""
        },
        include:{
            portfolios:{
                include:{
                    asset:true
                }
            }
        }
    })
    if(!user){
        return NextResponse.json({message:"User not found"},{status:404})
    }
    const marketData = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    const coins = await marketData.json();
    
    const holdings = user.portfolios.map((p:any)=>{
        const live = coins.find(
            (coin:any)=>
                coin.symbol.toLowerCase() === p.asset.symbol.toLowerCase()
        );
        const current_price = live ? live.current_price : p.asset.priceUsd;
        const value = p.quantity * current_price;
         return {
        id: p.asset.id,
        name: p.asset.name,
        symbol: p.asset.symbol,
        quantity: p.quantity,
        current_price,
        value,
      };
    })
    const totalValue = holdings.reduce((acc:number, h:{value:number}) => acc + h.value, 0);

    return NextResponse.json({
      user: {
        name: user.name,
        balance: user.balance,
      },
      portfolioValue: totalValue,
      holdings,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  

}
}