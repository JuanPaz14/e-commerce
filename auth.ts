import prisma from "@/lib/prisma"
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"


export const { handlers, signIn, signOut, auth } = NextAuth({
     adapter: PrismaAdapter(prisma),
     session: { strategy: "jwt" },
     ...authConfig,
     callbacks: {
          jwt({ token, user }:any) {
            if (user) { // User is available during sign-in
              token.role = user.role
            }
            return token
          },
          session({ session, token }:any) {
            if(session.user){
               session.user.role = token.role;
            }
            return session
            
          },
    },
    
    
});