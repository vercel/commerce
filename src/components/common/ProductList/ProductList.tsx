import React, { useState } from 'react'
import { DEFAULT_PAGE_SIZE } from 'src/utils/constanst.utils'
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
                    data.slice(currentPage*DEFAULT_PAGE_SIZE,(currentPage+1)* DEFAULT_PAGE_SIZE).map((product,index)=>{
                        return <ProductCard {...product} key={index}/>
                    })
                }
            </div>
            <div className={s.pagination}>
                <PaginationCommon total={data.length} pageSize={DEFAULT_PAGE_SIZE} onChange={onPageChange}/>
            </div>
        </div>
    )
}

export default ProductList
