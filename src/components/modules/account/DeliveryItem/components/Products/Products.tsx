import { OrderLine } from "@framework/schema";
import React from "react"
import s from './Products.module.scss'

interface ProductsProps {
    products?: OrderLine[];
}

const Products = ({ products } : ProductsProps) => {
    function toString(products?:OrderLine[]): string {
        let strProducts = "";
        products?.map((prod, i) => {
            if (i === 0) {
                strProducts += prod.productVariant?.name;
            } else {
                strProducts += `, ${prod.productVariant?.name}`
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