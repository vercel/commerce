import React, { useState } from 'react'
import PaginationCommon from '../PaginationCommon/PaginationCommon'
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard'
import s from "./ProductList.module.scss"
interface ProductListProps {
    data: ProductCardProps[]
}

const ProductList = ({data}: ProductListProps) => {
    const [currentPage, setCurrentPage] = useState(0)
    const onPageChange = (page:number) => {
        setCurrentPage(page)
    }
    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                {
                    data.slice(currentPage*20,(currentPage+1)*20).map((product,index)=>{
                        return <ProductCard {...product} key={index}/>
                    })
                }
            </div>
            <div className={s.pagination}>
                <PaginationCommon total={data.length} pageSize={20} onChange={onPageChange}/>
            </div>
        </div>
    )
}

export default ProductList
