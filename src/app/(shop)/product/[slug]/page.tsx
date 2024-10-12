
import { TitleFont } from '@/config/fonst';
import {Category} from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Props{
  params: {
      slug: Category;
  }

}

export default function ({params}:Props) {

  const {slug} = params;

  const product = initialData.products.find(product => product.slug === slug)

  if(!product){
    notFound();
  }


  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      
      {/*Slidesshow */}
      <div className='col-span-1 md:col-span-2'>
        <Image src={`/products/${product.images[0]}`} alt={product.title} width={500} height={500} />
      </div>
      
      
      {/*Detalles*/}
      <div className='col-span-1 px-5'>
        <h1 className={`${TitleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        <p className='text-lg mb-5'>${product.price}</p>
        {/*Selector de tallas */}


        {/*Selector de cantidad  */}


        {/*button  */}
        <button className='btn-primary my-5'>Agregar al carrito</button>

        {/*Descripcion */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p  className='font-light'>
          {product.description}
        </p>
      </div>

    </div>
  )
}
