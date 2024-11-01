'use client';
import {getStockBySlug } from "@/actions";
import { TitleFont } from "@/config/fonst"
import { useEffect, useState } from "react";

interface Props {
    slug: string;

}


export const StockLabel = ({slug}:Props) => {
    const [stock,setStock] = useState(0);
    const[isLoading,setIsLoading]  = useState(true);

    useEffect(()=>{
        getStock();
    },[]);

    const getStock = async()=>{
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
        console.log(inStock);
    }

  return (
    <div>
        <h1 className={`${TitleFont.className} antialiased font-bold text-lg`}>
            Stock: {stock}
        </h1>
    </div>
  )
}
