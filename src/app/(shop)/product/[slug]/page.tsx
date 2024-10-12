
import {Category} from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';


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
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      


    </div>
  )
}
