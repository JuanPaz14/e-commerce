import { getPaginatedProductsWhitImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";




interface Props {
  searchParams:{
    page?:string;
  }
}

export default async function Home({searchParams}:Props) {

  const page = searchParams.page ? parseInt(searchParams.page): 1;
  const {products}= await getPaginatedProductsWhitImages({page});

  if(products.length ===0){
    redirect('/');
  }


  return (
    <div>
      <Title title="tienda" subtitle="todos los productos" className="mb-2"/>
      <ProductGrid products={products}/>
    </div>
    
  );
}
