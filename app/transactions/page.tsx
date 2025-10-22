"use client";

import { useEffect, useState } from "react";

type Transaction = {
  id: string;
  symbol: string;
  name: string;
  type: "BUY" | "SELL";
  quantity: number;
  price: number;
  date: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        if (!res.ok) throw new Error("Failed to load transactions");
        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch transactions");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>

      {transactions.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg mb-4">
            You haven’t made any transactions yet.
          </p>
          <a
            href="/trade"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Make your first trade →
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-gray-600">Coin</th>
                <th className="p-3 text-left text-gray-600">Type</th>
                <th className="p-3 text-left text-gray-600">Quantity</th>
                <th className="p-3 text-left text-gray-600">Price</th>
                <th className="p-3 text-left text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="p-3 font-semibold">
                    {tx.name} ({tx.symbol.toUpperCase()})
                  </td>
                  <td
                    className={`p-3 font-bold ${
                      tx.type === "BUY" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td className="p-3">{tx.quantity}</td>
                  <td className="p-3">${tx.price.toLocaleString()}</td>
                  <td className="p-3 text-gray-500">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
