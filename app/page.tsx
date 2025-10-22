// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";
// import Link from "next/link";

// export default function LandingPage() {
//   const { data: session } = useSession();

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-6 bg-gray-800 text-white">
//         <h1 className="text-3xl font-bold">TradeX</h1>
//         <div className="space-x-4">
//           {session ? (
//             <button
//               onClick={() => signOut()}
//               className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
//             >
//               Sign Out
//             </button>
//           ) : (
//             <button
//               onClick={() => signIn("google")}
//               className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
//             >
//               Sign In with Google
//             </button>
//           )}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 text-center md:text-left">
//         <div className="md:w-1/2 space-y-6">
//           <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
//             Trade, Track & Grow <br /> Your Crypto Portfolio
//           </h2>
//           <p className="text-gray-300 text-lg md:text-xl">
//             Buy and sell cryptocurrencies instantly. Track your portfolio and
//             see the top performing coins.
//           </p>
//           <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
//             <Link
//               href="/market"
//               className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
//             >
//               Explore Market
//             </Link>
//             {session ? (
//               <Link
//                 href="/portfolio"
//                 className="border border-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition"
//               >
//                 My Portfolio
//               </Link>
//             ) : (
//               <button
//                 onClick={() => signIn("google")}
//                 className="border border-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition"
//               >
//                 Get Started
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Hero Image */}
//         <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
//           <img
//             src="https://wallpapers.com/images/hd/trading-wallpaper-ynfqhj74ml8p96ca.jpg"
//             alt="Crypto Trading"
//             className="w-full max-w-md"
//           />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="bg-gray-800 text-gray-200 py-20 px-6 md:px-20">
//         <h3 className="text-4xl font-bold text-center mb-12">
//           Why Choose CryptoHub?
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           <div className="p-6 border border-gray-700 rounded-xl shadow hover:shadow-lg transition">
//             <h4 className="font-bold text-xl mb-2">Live Market Data</h4>
//             <p>Track prices and stats of top cryptocurrencies in real-time.</p>
//           </div>
//           <div className="p-6 border border-gray-700 rounded-xl shadow hover:shadow-lg transition">
//             <h4 className="font-bold text-xl mb-2">Instant Trading</h4>
//             <p>Buy and sell your favorite coins instantly with one click.</p>
//           </div>
//           <div className="p-6 border border-gray-700 rounded-xl shadow hover:shadow-lg transition">
//             <h4 className="font-bold text-xl mb-2">Portfolio Tracking</h4>
//             <p>See your holdings, profits, and losses all in one place.</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-300 py-6 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center">
//         <p>© 2025 CryptoHub. All rights reserved.</p>
//         <div className="flex gap-4 mt-4 md:mt-0">
//           <a href="#" className="hover:underline">
//             Privacy
//           </a>
//           <a href="#" className="hover:underline">
//             Terms
//           </a>
//           <a href="#" className="hover:underline">
//             Contact
//           </a>
//         </div>
//       </footer>
//     </div>
//   );
// }


"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect signed-in users to home/dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home"); // Change to your actual home page route
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar */}
      {/* <nav className="flex justify-between items-center p-6 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">TradeX</h1>
        <div className="space-x-4">
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Sign In with Google
            </button>
          )}
        </div> */}
      {/* </nav> */}

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 text-center md:text-left">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Trade, Track & Grow <br /> Your Crypto Portfolio
          </h2>
          <p className="text-gray-300 text-lg md:text-xl">
            Buy and sell cryptocurrencies instantly. Track your portfolio and
            see the top performing coins.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/market"
              className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              Explore Market
            </Link>
            {session ? (
              <Link
                href="/portfolio"
                className="border border-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition"
              >
                My Portfolio
              </Link>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="border border-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition"
              >
                Get Started
              </button>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://wallpapers.com/images/hd/trading-wallpaper-ynfqhj74ml8p96ca.jpg"
            alt="Crypto Trading"
            className="w-full max-w-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 text-gray-200 py-20 px-6 md:px-20">
        <h3 className="text-4xl font-bold text-center mb-12">
          Why Choose CryptoHub?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 border border-gray-700 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-bold text-xl mb-2">Live Market Data</h4>
            <p>Track prices and stats of top cryptocurrencies in real-time.</p>
          </div>
          <div className="p-6 border border-gray-700 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-bold text-xl mb-2">Instant Trading</h4>
            <p>Buy and sell your favorite coins instantly with one click.</p>
          </div>
          <div className="p-6 border border-gray-700 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-bold text-xl mb-2">Portfolio Tracking</h4>
            <p>See your holdings, profits, and losses all in one place.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 CryptoHub. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
