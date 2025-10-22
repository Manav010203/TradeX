
// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// export const handle = NextAuth({


//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET ||""
//         })
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     session: { strategy: "jwt" },
    
// })
// export {handle as GET, handle as POST }


import prisma from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name ?? "",
          }
        });
      }

      return true;
    }
  }
});

export { handler as GET, handler as POST };
