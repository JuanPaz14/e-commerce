import { initialData } from "./seed"; // Asegúrate de que la ruta sea correcta
import prisma from '../lib/prisma';
import Image from 'next/image';

async function main() {


    //1. Borrar registros previos
    //await Promise.all([
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    //])


    const {categories, products} = initialData;

    //2 Categorias 
    const categoriesData = categories.map((name)=>({name}));
    
    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();
    
    const categoriesMap = categoriesDB.reduce((map,category)=>{
        map[category.name.toLowerCase()] = category.id;
        return map;
    },{} as Record<string,string>); //<string=shirt, string=categoryID>


    //productos 

    products.forEach(async (product) => {
        const { type, images, ...rest } = product;
    
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });


        const imageData = images.map(image=>({
            url:image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data:imageData
        });

    });
    
    console.log('seed Ejecutado');
}






(() => {
    
    if (process.env.NODE_ENV === 'production') return;


    main().catch((error) => console.error("Error en main:", error));
})();
