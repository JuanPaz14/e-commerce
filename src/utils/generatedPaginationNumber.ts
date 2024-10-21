
    
    export const generatedPaginationNumber = (currentPage:number, totalPages: number) => {
        
        //si el numero total de paginas es 7 o menos vamos a mostrar la paginas sin puntos suspensivos
        if(totalPages<=7){
            return Array.from({length:totalPages}, (_, i)=>i+1); //[1,2,3,4,5,6,7] 
        }


        //si la pagina  actual  está entre las primeras 3 paginas, mostrar las primeras 3, puntos suspensivos, y las ultimas 2
        if(currentPage <= 3){
            return [1,2,3,'...',totalPages-1,totalPages]; //[1,2,3,...,49,50]
        }   


        //si la pagina actual está entre las ultimas 3 paginas
        //mostrar las primeras 2, puntos suspensivos y luego las ultimas 3
        if(currentPage>=totalPages-2){
            return [1,2,'....',totalPages-1, totalPages]
        }

        //si la pagina actual está en otro lugar medio
        //mostrar la primera pagina, puntos suspensivos, la pagina actual y vecinos 

      return[
        1,
        '...',
        currentPage -1,
        currentPage +1,
        '...',
        totalPages


      ]
    }
    