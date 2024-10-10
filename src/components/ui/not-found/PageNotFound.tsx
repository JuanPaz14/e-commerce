'use client'

import { motion } from 'framer-motion'
import { Home, AlertCircle } from 'lucide-react'
import Link from 'next/link'


export const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
        >
          <AlertCircle className="mx-auto h-24 w-24 text-gray-600" />
        </motion.div>
        <h2 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Oops! Página no encontrada
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="mt-5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out">
              <Home className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
              Regresar a la página de inicio
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-gray-500">
          Si crees que esto es un error, por favor{' '}
          <a href="/contacto" className="font-medium text-red-600 hover:text-red-500">
            contáctanos
          </a>
          .
        </p>
      </motion.div>
    </div>
  )
}
