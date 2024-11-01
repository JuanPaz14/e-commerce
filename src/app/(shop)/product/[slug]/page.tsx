export const revalidate = 604800; //7dias
import { TitleFont } from '@/config/fonst';
import {Category} from '@/interfaces';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from "next";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { getProductBySlug, getStockBySlug } from '@/actions';


interface Props{
  params: {
      slug: Category;
  }

}

export async function generateMetadata(
  { params}: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
 
  // fetch data
  const product = await getProductBySlug(slug);
 
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'producto no encontrado',
    description: product?.descripcion ?? '',
    openGraph: {
      title: product?.title ?? 'producto no encontrado',
      description: product?.descripcion ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductBySlugPage({params}:Props) {

  const {slug} = params;

  const product = await getProductBySlug(slug);
  const stock = await getStockBySlug(slug);
  console.log(product);

  if(!product){
    notFound();
  }


  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      
      {/*Slidesshow */}
      <div className='col-span-1 md:col-span-2'>

        {/*Mobile slideShow */}
        <ProductMobileSlideShow 
          images={product.images} 
          title={product.title} 
          className='block md:hidden' 
        />


        {/*Desktop slideshow */}
        <ProductSlideShow 
          images={product.images} 
          title={product.title} 
          className='hidden md:block'
        />
      
      </div>
      
      
      {/*Detalles*/}
      <div className='col-span-1 px-5'>
        <StockLabel slug={product.slug}/>
        <h1 className={`${TitleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
        
        <p className='text-lg mb-5'>${product.price}</p>
        {/*Selector de tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/*Selector de cantidad  */}
        <QuantitySelector quantity={0}/>

        {/*button  */}
        <button className='btn-primary my-5'>Agregar al carrito</button>

        {/*Descripcion */}
        <h3 className='font-bold text-sm'>Descripción</h3>
        <p  className='font-light'>
          {product.descripcion}
        </p>
      </div>

    </div>
  )
}
