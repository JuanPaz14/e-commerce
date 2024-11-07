import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';



declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string;
      image?: string;
    } & DefaultSession['user'];
  }
}