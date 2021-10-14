import React from 'react';
import ProductImgs from './components/ProductImgs/ProductImgs'
import ProductInfo from './components/ProductInfo/ProductInfo'
import s from './ProductInfoDetail.module.scss'
import { Product } from '@commerce/types/product'
import { Collection } from '@framework/schema'

interface Props {
    productDetail: Product,
}

const ProductInfoDetail = ({ productDetail }: Props) => {
    return (
        <section className={s.productInfoDetail}>
            <ProductImgs productImage={productDetail.images}/>
            <ProductInfo productInfoDetail={productDetail}/>
        </section >
    )
}
export default ProductInfoDetail
