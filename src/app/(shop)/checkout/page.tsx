import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

export default function () {

  const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
  
  ]



  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      

      <div className='flex flex-col w-[1000px]'>
        <Title title="Verificar Orden"/>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
            {/*Carrito*/}
            <div className='flex flex-col mt-5'>
              <span className='text-xl '>Ajustar Elementos</span>
              <Link href='/cart' className='underline mb-5'>
              editar carrito
              </Link>
 
              {/*Items*/}
              {
                productsInCart.map(product => (
                  <div key={product.slug} className='flex mb-5'>
                    <Image
                      src={`/products/${product.images[0]}`}
                      width={100}
                      height={100}
                      style={{
                        width:'100px',
                        height:'100px'
                      }}
                      alt={product.title}
                      className='mr-5 rounded'
                    />
                    <div>
                      <p>{product.title}</p>
                      <p>{product.price} 3x</p>
                      <p className='font-bold'>Subtotal: ${product.price*3}</p>
                      <button className='underline mt-3'>remover</button>
                    </div>
                  </div>
                ))
              }
              </div> 
        
              {/*CheckOut - resumen de orden*/}
              <div className='bg-white rounded-xl shadow-xl p-7'>
                <h2 className='text-2xl mb-2 font-bold'>Direccion de Entrega</h2>

                <div className='mb-10'>
                  <p className='text-xl'>Juan Paz</p>
                  <p>Av. 44n</p>
                  <p>col centro</p>
                  <p>Alcalidia cuathmot</p>
                  <p>ciudad de mexico</p>
                  <p>CP 123</p>
                  <p>123 123 123</p>
                </div>
                {/*Divider */}
                <div className='w-full h-0.5 rounded bg-gray-300 mb-10'/>



                <h2 className='text-2xl mb-2 '>Resumen de Ordén</h2>
                <div className='grid grid-cols-2'>
                  <span>No. Productos</span>
                  <span className='text-right'>3 articulos</span>

                  <span>subTotal</span>
                  <span className='text-right'>$100</span>

                  <span>Inpuestos (15%)</span>
                  <span className='text-right'>$100</span>

                  <span className='mt-5 text-2xl '>Total</span>
                  <span className=' mt-5 text-2xl text-right'>$100</span>
                </div>
                <div className='mt-5 mb-2 wfull'>
                  <p className='mb-5'>
                    {/*disclaimer */}
                    <span>
                      al hacer click en colocar arden aceptas nuestros <a href="#" className='underline'>terminos y condiciones </a> 
                    </span>

                  </p>
                  <Link 
                    className='flex btn-primary justify-center'
                    href="/orders/123">
                    Colocar Orden
                  </Link>
                </div>

              </div>


        </div>
      </div>
    </div>
  )
}
