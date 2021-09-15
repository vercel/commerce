import React from "react"
import s from './FavouriteProducts.module.scss'
import {ProductList} from '../../../../../common'
import { ProductCardProps } from '../../../../../common/ProductCard/ProductCard'


interface FavouriteProductsProps {
    products: ProductCardProps[];
}

const FavouriteProducts = ({ products } : FavouriteProductsProps) => {

    return (
        <section className={s.favouriteProducts}>
            <ProductList data={products} />
        </section>
    )
}

export default FavouriteProducts