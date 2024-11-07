'use server';

import { AuthError } from "next-auth";
import {  signIn } from "../../../auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})
type FormData = z.infer<typeof schema>
 
export async function authenticate(data: FormData) {
  try {

    
    await signIn('credentials',{
      ...data,
      redirect: false,
    })

    
    
    return {success:true}; //retornamos success true 


  } catch (error) {
    console.log(error);
    
    //caturamos el error que viene de auth
    if(error instanceof AuthError){
      return {error:error.cause?.err?.message };
    }

    return {error: 'error 500'};
     

  }
}


export const login = async(email:string, password: string) => {

  try {

    await signIn('credentials',{ email, password })

    return {ok: true};
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión'
    }
    
  }


}

