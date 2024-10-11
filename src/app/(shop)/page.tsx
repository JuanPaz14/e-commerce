import { ProductGrid, Title } from "@/components";
import { inter, TitleFont } from "@/config/fonst";
import { initialData } from "@/seed/seed";
import Image from "next/image";


const products = initialData.products;

export default function Home() {
  return (
    <div>
      <Title title="tienda" subtitle="todos los productos" className="mb-2"/>
      <ProductGrid products={products}/>
    </div>
    
  );
}
