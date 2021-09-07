import React from 'react'
import ProductImgs from './components/ProductImgs/ProductImgs'
import ProductInfo from './components/ProductInfo/ProductInfo'
import s from './ProductInfoDetail.module.scss'

interface Props {
    className?: string
    children?: any
}

const ProductInfoDetail = ({ }: Props) => {
    return (
        <section className={s.productInfoDetail}>
            <ProductImgs/>
            <ProductInfo/>
        </section >
    )
}

export default ProductInfoDetail
