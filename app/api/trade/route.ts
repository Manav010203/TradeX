import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface userBody {
    symbol:string,
    type:"BUY"|"SELL",
    quantity:number
}

export async function POST(req:NextRequest) {
    try{
        const body :userBody= await req.json();
        if(!body){
            return NextResponse.json({
                message:"Body is not correct"
            },{
                status:405
            })
        }
        const session  = await getServerSession();
        if(!session?.user){
            return NextResponse.json({
                message:"User not logged in"
            },{
                status:401
            })
        }
        const user = await prisma.user.findUnique({
            where:{
                email:session.user.email||""
            }
        })
        if(!user){
            return NextResponse.json({
                message:"user not found"
            },{
                status:404
            })
        }
        const livemarket = await fetch("http://localhost:3000/api/market")
        const data = await livemarket.json();
        // console.log(data);
        const coin = data.find(
            (c:any)=> c.symbol.toLowerCase() === body.symbol.toLowerCase()
        );
        if(!coin){
            return NextResponse.json({message:"no coin found || symbol not found"},{status:404})
        }
        const price = coin.current_price;
        const total = price*body.quantity;
        if(body.type==="BUY"){
            if(user.balance<total){
                return NextResponse.json({message:"Insufficient balance"},{status:400})
            }
            else{
                await prisma.user.update({
                    where:{
                        id:user.id,

                    },
                    data:{balance:user.balance-total}
                })
                let asset_in_port = await prisma.asset.findUnique({
                    where:{symbol:body.symbol.toLowerCase()}
                })
                if(!asset_in_port){
                    asset_in_port = await prisma.asset.create({
                        data:{
                            symbol:body.symbol.toLowerCase(),
                            name:coin.name,
                            priceUsd:price
                        }
                    })
                }
                const portfolio = await prisma.portfolio.findUnique({
                    where:{
                        userId_assetId:{
                            userId:user.id,
                            assetId:asset_in_port.id
                        }
                    }
                });
                if(portfolio){
                    await prisma.portfolio.update({
                        where:{
                            userId_assetId:{
                                userId:user.id,
                                assetId:asset_in_port.id
                            }
                        },data:{
                            quantity:body.quantity+portfolio.quantity
                        }
                    });
                }else{
                    await prisma.portfolio.create({
                        data:{
                            userId:user.id,
                            assetId:asset_in_port.id,
                            quantity:body.quantity
                        }
                    })
                }
                await prisma.transaction.create({
                    data:{
                        userId:user.id,
                        assetId:asset_in_port.id,
                        type:"BUY",
                        quantity:body.quantity,
                        priceUsd:price,
                        total:total 
                    }
                });
                return NextResponse.json({
                    message:"suucessfully purchased",
                    newBalance:user.balance-total,
                    asset:body.symbol.toLowerCase(),
                    quantity:body.quantity,
                    price
                },{status:200})
            }
        }
        else{
            //handle sell here
            let asset = await prisma.asset.findUnique({
                where:{
                    symbol:body.symbol.toLowerCase()
                }
            })
            if(!asset){
                return NextResponse.json({
                    message:"Asset not found"
                },{
                    status:404
                })
            }
            const portfolio = await prisma.portfolio.findUnique({
                where:{
                    userId_assetId:{
                        userId:user.id,
                        assetId:asset.id
                    }
                }
            })
            if(portfolio && portfolio.quantity>=body.quantity){
               await prisma.portfolio.update({
                where:{
                    userId_assetId:{
                        userId:user.id,
                        assetId:asset.id
                    }
                },
                    data:{
                        quantity:portfolio.quantity-body.quantity
                    }
               });
               await prisma.user.update({
                    where:{
                        id:user.id,
                    },
                    data:{balance:user.balance+total}
                })
                if(portfolio.quantity-body.quantity===0){
                    await prisma.portfolio.delete({
                        where:{userId_assetId:{
                            userId:user.id,
                            assetId:asset.id
                        }}
                    })
                }
                await prisma.transaction.create({
                    data:{
                        userId:user.id,
                        assetId:asset.id,
                        type:"SELL",
                        quantity:body.quantity,
                        priceUsd:price,
                        total:total 
                    }
                })
                return NextResponse.json({
                    message:"trade successful",
                    newBalance:user.balance+total,
                    symbol:body.symbol.toLowerCase(),
                    quantity:body.quantity,
                    price
                })
            }
            else{
                return NextResponse.json({
                    message:"Not enough quantity"
                },{
                    status:400
                })
            }
        }
    }catch(err){
        console.error(err);
        return NextResponse.json({message:"Something went wrong on our side"},{status:500})
    }
}