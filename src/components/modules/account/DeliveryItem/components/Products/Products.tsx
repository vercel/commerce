import React from "react"

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
        <div className="products">
            {toString(products)}
        </div>
    )
}

export default Products