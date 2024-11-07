import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import prisma from "@/lib/prisma"
import bcryptjs from 'bcryptjs';
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials:any) => {
        console.log({credentials})

        //verficamos si el usuario ees correcto
        const user = await prisma.user.findUnique({
          where:{
            email: credentials.email
          },
        })

        //si no esxiste mandomos el error
        if(!user){
          throw new Error('User not found')
        }

        //verificar la contraseña
        const invalidPass = bcryptjs.compareSync(credentials.password,user.password);
        if(!invalidPass){
          throw new Error('password incorrect')
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig