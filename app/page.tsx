"use client";

import Link from "next/link";

export default function HomePage() {
  const pages = [
    {
      title: "Market",
      description: "View live cryptocurrency prices and stats.",
      link: "/market",
    },
    {
      title: "Trade",
      description: "Buy or sell cryptocurrencies instantly.",
      link: "/trade",
    },
    {
      title: "Transactions",
      description: "Track your past trades and history.",
      link: "/transactions",
    },
    {
      title: "Portfolio",
      description: "Check your holdings and profit/loss summary.",
      link: "/portfolio",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Crypto Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-6">
        {pages.map((page) => (
          <Link
            key={page.link}
            href={page.link}
            className="block bg-white rounded-2xl shadow p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {page.title}
            </h2>
            <p className="text-gray-600">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
