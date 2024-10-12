import { notFound } from "next/navigation";
import { ProductGridItem, Title } from "@/components";
import {Category} from '@/interfaces';

const seedProducts = initialData.products;

import { initialData } from "@/seed/seed";
interface Props{
  params: {
      id: Category;
  }

}


export default function ({params}:Props) {

  const {id} = params;

  const products = seedProducts.filter(product => product.gender === id);

  if(id !== 'kid' && id!=='men' && id !== 'women'){
    notFound()
  }

  const labels : Record<Category,string> =  {
    'women':'Mujer',
    'men' : 'Hombre',
    'kid' : 'Niños',
    'unisex': 'Todos'
  }

  return (
    <div>
        <Title title={`Articulos para ${labels[id]}`}  subtitle={"todos los productos"} className="mb-2"/>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
          {
              products.map(product =>(
                  <ProductGridItem key={product.slug} product={product}/>
    
              ))
          }
        </div>
    </div>
    
  )
}
