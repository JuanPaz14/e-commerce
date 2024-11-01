
'use client';


import { generatedPaginationNumber } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props{
    totalPages:number;
}


export const Pagination = ({totalPages}:Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1: +pageString //obteniendo la pagina actual

    if(currentPage < 1 || isNaN(+pageString)){
        redirect(pathname);
    }

    const allPages = generatedPaginationNumber(currentPage,totalPages);

    //aqui creamos la url
    const createPageUrl = (pageNumber: number | string)=>{

        const params = new URLSearchParams(searchParams);
        if(pageNumber === '...'){
            return `${pathname}?${params.toString()}`;
        }
        if(+pageNumber <= 0){
            return `${pathname}`; // href='/'
        }
        if(+pageNumber > totalPages){ //next
            return `${pathname}?${params.toString}`
        }

        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;

    }

  return (

    <div className="flex text-center justify-center mt-10 mb-32">
    <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
        <li className="page-item disabled"><a
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={createPageUrl(currentPage-1)}><IoChevronBackOutline size={30}/></a></li>

        {
            allPages.map((page)=>(
                <li key={page} className="page-item"><Link
                className = { clsx(
                    "page-link relative block py-1.5 px-3 border-0  outline-none transition-all duration-300 rounded background-colo text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                    {
                        'bg-blue-500 shadow-sm text-white hover:bg-blue-400':page === currentPage
                    }
                )}
                href={createPageUrl(page)} >{page}</Link>

                </li>
            ))
        }

        <li className="page-item"><a
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={createPageUrl(currentPage+1)}> <IoChevronForwardOutline size={30}/> </a></li>
        </ul>   
    </nav>
    </div>
  )
}
