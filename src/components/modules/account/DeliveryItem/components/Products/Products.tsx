import React from "react"
import s from './Products.module.scss'

interface ProductsProps {
    products: string[];
}

const Products = ({ products } : ProductsProps) => {

    function toString(products:string[]): string {
        let strProducts = "";
        products.map((prod, i) => {
            if (i === 0) {
                strProducts += prod;
            } else {
                strProducts += `, ${prod}`
            }
        });
        return strProducts;
    }

    return (
        <div className={s.products}>
            {toString(products)}
        </div>
    )
}

export default Products