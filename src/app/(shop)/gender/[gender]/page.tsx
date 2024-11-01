import { notFound, redirect } from "next/navigation";
import { Pagination, ProductGrid,Title } from "@/components";
import { getPaginatedProductsWhitImages } from "@/actions";
import { Gender } from "@prisma/client";




interface Props{
  params: {
      gender: string;
  },
  searchParams:{
    page?:string;
  }

}


export default async function GenderByPage ({params,searchParams}:Props) {


  const {gender} = params;

  const page = searchParams.page ? parseInt(searchParams.page): 1;
  const {products,currentPage,totalPages}= await getPaginatedProductsWhitImages({page,gender:gender as Gender});

  console.log(currentPage,totalPages);

  if(products.length ===0){
    redirect(`/gender/${gender}`);
  }


  if(gender !== 'kid' && gender!=='men' && gender !== 'women'){
    notFound()
  }

  const labels : Record<string,string> =  {
    'women':'Mujer',
    'men' : 'Hombre',
    'kid' : 'Niños',
    'unisex': 'Todos'
  }

  return (
    <div>
        <Title title={`Articulos para ${labels[gender]}`}  subtitle={"todos los productos"} className="mb-2"/>
        <ProductGrid products={products}/>
        <Pagination totalPages={totalPages}/>
    </div>
    
  )
}
