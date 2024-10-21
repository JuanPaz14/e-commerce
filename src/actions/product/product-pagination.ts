'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";



interface PaginationOPtions {
    page?:number;
    take?:number;
    gender?:Gender;
}

export const getPaginatedProductsWhitImages= async({
    page=1,
    take=12,
    gender
}:PaginationOPtions)=>{

    if(isNaN(Number(page)) ) page = 1;
    if(page<1) page=1;

    try {

        //1. obtener los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: (page-1)* take,
            include:{
                ProductImage:{
                    take:2,
                    select:{
                        url: true
                    }
                }
            },
            //! por genero
            where:{
                gender:gender,
            },
        })

        //2. obtener el total de paginas
        //todo: 
        const totalCount = await prisma.product.count({
            where:{
                gender:gender,
            },
        })
        const totalPages = Math.ceil(totalCount/take)

        return{
            currentPage:page,
            totalPages:totalPages,
            products: products.map(product =>({
                ...product,
                images: product.ProductImage.map(image =>image.url)

            }))
        }
    } catch (error) {
        throw new Error("no se pudo cargar los productos")
    }
}