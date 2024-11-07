'use client'

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSumary = () => {
    const [loaded, setLoaded] = useState(false);
    const [summary, setSummary] = useState({ subTotal: 0, itemInCart: 0, tax: 0, total: 0 });

    const cart = useCartStore(state => state.cart);
    const getSumaryInformation = useCartStore(state => state.getSummaryInformation);

    useEffect(() => {
        setSummary(getSumaryInformation());
        setLoaded(true);
    }, [cart, getSumaryInformation]);

    if (!loaded) {
        return <p>Loading...</p>;
    }


    return (
        <div className='grid grid-cols-2 gap-y-2'>
            <span>No. Productos</span>
            <span className='text-right'>
                {summary.itemInCart} {summary.itemInCart === 1 ? 'artículo' : 'artículos'}
            </span>

            <span>Subtotal</span>
            <span className='text-right'>{currencyFormat(summary.subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className='text-right'>{currencyFormat(summary.tax)}</span>

            <span className='mt-5 text-2xl font-semibold'>Total</span>
            <span className='mt-5 text-2xl text-right font-semibold'>{currencyFormat(summary.total)}</span>
        </div>
    );
}
