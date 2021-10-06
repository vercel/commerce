import classNames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { DEFAULT_PAGE_SIZE, ROUTE } from 'src/utils/constanst.utils'
import { ButtonCommon, EmptyCommon } from '..'
import PaginationCommon from '../PaginationCommon/PaginationCommon'
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard'
import s from "./ProductList.module.scss"

interface ProductListProps {
    data: ProductCardProps[],
    total?: number,
    defaultCurrentPage?: number
    onPageChange?: (page: number) => void
}

const ProductList = ({ data, total = data.length, defaultCurrentPage, onPageChange }: ProductListProps) => {
    const router = useRouter()
    const handlePageChange = (page: number) => {
        onPageChange && onPageChange(page)
    }

    const handleShowAllProduct = () => {
        router.push({
            pathname: ROUTE.PRODUCTS,
        },
            undefined, { shallow: true }
        )
    }

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                {
                    data.map((product, index) => {
                        return <ProductCard {...product} key={index} />
                    })
                }
                {
                    data.length === 0 && <div className={s.empty}>
                        <EmptyCommon />
                        <ButtonCommon onClick={handleShowAllProduct}>Show all products</ButtonCommon>
                    </div>
                }
            </div>
            <div className={classNames(s.pagination, { [s.hide]: data.length === 0 })}>
                <PaginationCommon defaultCurrent={defaultCurrentPage} total={total} pageSize={DEFAULT_PAGE_SIZE} onChange={handlePageChange} />
            </div>
        </div>
    )
}

export default ProductList
