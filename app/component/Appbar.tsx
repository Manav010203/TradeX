// "use client";
// import { signIn } from "next-auth/react";

// export function Appbar(){
//     return <div>
//         <div className="flex justify-between">
//             <div>
//                 tradin
//             </div>
//             <div>
//                  <button className="m-2 p-2 bg-blue-400" onClick={()=> signIn()}>Signin</button>
//             </div>
//         </div>
//     </div>
// }

"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AppBar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Left Section - Logo / Brand */}
      <Link href="/home" className="text-2xl font-bold tracking-wide hover:text-blue-400">
        TradeX
      </Link>

      {/* Middle Section - Links */}
      <div className="flex gap-6">
        <Link href="/trade" className="hover:text-blue-400 transition">
          Trade
        </Link>
        <Link href="/transactions" className="hover:text-blue-400 transition">
          Transactions
        </Link>
        <Link href="/portfolio" className="hover:text-blue-400 transition">
          Portfolio
        </Link>
      </div>

      {/* Right Section - Auth */}
      <div>
        {status === "loading" ? (
          <span className="text-gray-400">Loading...</span>
        ) : session ? (
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="User avatar"
                className="w-8 h-8 rounded-full border border-gray-500"
              />
            )}
            <span className="text-sm">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
