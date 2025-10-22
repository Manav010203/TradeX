// app/api/transactions/route.ts

import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "User not logged in" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { transactions: { orderBy: { createdAt: "desc" }, include: { asset: true } } },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const formattedTransactions = user.transactions.map((tx) => ({
      id: tx.id,
      symbol: tx.asset.symbol,
      name: tx.asset.name,
      type: tx.type,
      quantity: tx.quantity,
      price: tx.priceUsd,
      date: tx.createdAt,
    }));

    return NextResponse.json({ transactions: formattedTransactions });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
