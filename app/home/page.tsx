

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

type PortfolioItem = {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  current_price: number;
  value: number;
};

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  price_change_percentage_1y_in_currency?: number;
  ath_change_percentage?: number;
  sparkline_in_7d?: number[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

export default function HomePage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [balance, setBalance] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioRes = await fetch("/api/portfolio");
        const portfolioData = await portfolioRes.json();
        setPortfolio(portfolioData.holdings || []);
        setBalance(portfolioData.user?.balance || 0);
        setPortfolioValue(portfolioData.portfolioValue || 0);

        const marketRes = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=7d,30d,1y&per_page=10"
        );
        const marketData = await marketRes.json();
        const coinsWithSparkline = marketData.map((coin: any) => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          price_change_percentage_7d_in_currency:
            coin.price_change_percentage_7d_in_currency,
          price_change_percentage_30d_in_currency:
            coin.price_change_percentage_30d_in_currency,
          price_change_percentage_1y_in_currency:
            coin.price_change_percentage_1y_in_currency,
          ath_change_percentage: coin.ath_change_percentage,
          sparkline_in_7d: coin.sparkline_in_7d?.price || [],
        }));
        setCoins(coinsWithSparkline);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading dashboard...</div>;

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

  const getTopCoin = (key: keyof Coin) =>
    coins.reduce((prev, curr) =>
      (curr[key] as number) > (prev[key] as number) ? curr : prev
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 space-y-12">
      <h1 className="text-4xl font-bold text-gray-800">Crypto Dashboard</h1>

      {/* Navigation Cards */}
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

      {/* Top Performers */}
      <section className="bg-white p-6 rounded-xl shadow w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">Top Performing Coins</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Last Week", key: "price_change_percentage_7d_in_currency" },
            { label: "Last Month", key: "price_change_percentage_30d_in_currency" },
            { label: "Last Year", key: "price_change_percentage_1y_in_currency" },
            { label: "All Time", key: "ath_change_percentage" },
          ].map((timeFrame) => {
            const top = getTopCoin(timeFrame.key as keyof Coin);
            return (
              <div
                key={timeFrame.label}
                className="border rounded-xl p-4 shadow flex flex-col items-center"
              >
                <h3 className="font-semibold text-gray-700 mb-1">{timeFrame.label}</h3>
                <img src={top.image} alt={top.name} className="w-10 h-10 mb-1" />
                <p className="font-bold text-gray-800">{top.name}</p>
                <p
                  className={
                    (top[timeFrame.key as keyof Coin] as number) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {(top[timeFrame.key as keyof Coin] as number)?.toFixed(2)}%
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Market Overview with Sparklines */}
      <section className="bg-white p-6 rounded-xl shadow w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="border rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition"
            >
              <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-2" />
              <p className="font-semibold">{coin.name}</p>
              <p className="text-gray-500 uppercase">{coin.symbol}</p>
              <p className="mt-1 font-bold">${coin.current_price.toLocaleString()}</p>
              <p
                className={
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              {coin.sparkline_in_7d && coin.sparkline_in_7d.length > 0 && (
                <LineChart
                  width={100}
                  height={40}
                  data={coin.sparkline_in_7d.map((price, idx) => ({
                    price,
                    name: idx,
                  }))}
                >
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={
                      coin.sparkline_in_7d[0] <
                      coin.sparkline_in_7d.slice(-1)[0]
                        ? "#22c55e"
                        : "#ef4444"
                    }
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="bg-white p-6 rounded-xl shadow w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4">My Portfolio</h2>
        <div className="mb-4 flex justify-between">
          <p className="text-gray-700 font-medium">
            Balance: ${balance.toLocaleString()}
          </p>
          <p className="text-gray-700 font-medium">
            Total Value: ${portfolioValue.toLocaleString()}
          </p>
        </div>

        {portfolio.length === 0 ? (
          <p className="text-gray-500">You don’t have any holdings yet.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {portfolio.map((p, idx) => (
                <div
                  key={p.id}
                  className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                  <h3 className="font-bold">
                    {p.name} ({p.symbol.toUpperCase()})
                  </h3>
                  <p>Quantity: {p.quantity}</p>
                  <p>Price: ${p.current_price.toLocaleString()}</p>
                  <p className="font-semibold">Value: ${p.value.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolio}
                    dataKey="value"
                    nameKey="symbol"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {portfolio.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </section>
    </div>
  );
}