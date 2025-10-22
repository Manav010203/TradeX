# Crypto Trading (TradeX)

A full-stack cryptocurrency trading platform built with **Next.js**, **TypeScript**, **Tailwind CSS**, **NextAuth**, **Prisma**, and **PostgreSQL**. The app allows users to view live crypto market data, track their portfolio, execute trades, and see top-performing coins over various timeframes.

---

## Features

- **Landing & Home Pages**: Modern responsive design with a gray-themed dashboard and crypto hero visuals.
- **Authentication**: Google OAuth 2.0 sign-in using NextAuth.
- **Live Market Data**: Fetches real-time cryptocurrency prices and stats from [CoinGecko API](https://www.coingecko.com/en/api).
- **Trading**: Buy and sell cryptocurrencies with real-time portfolio updates and balance tracking.
- **Portfolio Tracking**: View holdings, total portfolio value, and distribution with interactive charts.
- **Top Performing Coins**: Displays the best coins by last week, last month, last year, and all-time.
- **Charts & Graphs**: Recharts integration for price trends and portfolio distribution visualizations.

---

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Recharts
- **Backend**: Next.js API Routes, NextAuth
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: Google OAuth
- **APIs**: CoinGecko API for live market data

---

## Demo

> https://trade-x-fnp3.vercel.app

---

## Getting Started

1. Clone the repository And follow the below commands:

```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd TradeX
npm install
cp .env.example .env
npx prisma init
npx prisma migrate dev
npx prisma generate
npm run dev
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

MIT License
