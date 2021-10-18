import { useRouter } from 'next/router'
import React, { useState } from "react"
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { ProductList } from '../../../../../common'
import { ProductCardProps } from '../../../../../common/ProductCard/ProductCard'
import s from './FavouriteProducts.module.scss'
interface FavouriteProductsProps {
    products: ProductCardProps[],
    totalItems:number
}

const FavouriteProducts = ({ products,totalItems } : FavouriteProductsProps) => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(0);
    
    function onPageChange(page:number){
        setCurrentPage(page)
        router.push({
            pathname: ROUTE.ACCOUNT,
            query: {
              ...router.query,
              [QUERY_KEY.PAGE]: page
            }
        },
        undefined, { shallow: true }
        )
    }

    return (
        <section className={s.favouriteProducts}>
            <ProductList data={products} total={totalItems} onPageChange={onPageChange}/>
        </section>
    )
}

export default FavouriteProducts