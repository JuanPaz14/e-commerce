"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { authenticate } from "@/actions";
import clsx from 'clsx';
import z from 'zod';
import { useForm } from 'react-hook-form';

import { AlertCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';




const schema = z.object({
  email: z.string().email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})

type FormData = z.infer<typeof schema>

export const LoginForm = () => {


  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    setAuthError(null) 
      const res = await authenticate(data);
      console.log(res)

    if(res?.error){
      setAuthError(res.error)
    }else{
      window.location.replace('/');
    }
   
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {authError && (
            <p className="mt-2 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {authError}
            </p>
      )}
      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        type="email"
        {...register('email')}
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />
      {errors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </p>
      )}

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        id="password"
        type="password"
        {...register('password')}
      />
      {errors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password.message}
                </p>
              )}

      <button 
        type="submit" 
        className={ clsx({
          "btn-primary": !isLoading,
          "btn-disabled": isLoading
        })}
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

