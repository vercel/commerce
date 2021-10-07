import React, { useMemo } from 'react';
import ProductImgs from './components/ProductImgs/ProductImgs'
import ProductInfo from './components/ProductInfo/ProductInfo'
import s from './ProductInfoDetail.module.scss'
import { Product } from '@commerce/types/product'
import { Collection } from '@framework/schema'
import { getCategoryNameFromCollectionId } from 'src/utils/funtion.utils';

interface Props {
    productDetail: Product,
    collections: Collection[]
}

const ProductInfoDetail = ({ productDetail, collections }: Props) => {
    const dataWithCategoryName = useMemo(() => {
            return {
              ...productDetail,
              collection: getCategoryNameFromCollectionId(collections, productDetail.collectionIds ? productDetail.collectionIds[0] : undefined)
            }
    }, [productDetail, collections])
    return (
        <section className={s.productInfoDetail}>
            <ProductImgs productImage={productDetail.images}/>
            <ProductInfo productInfoDetail={dataWithCategoryName}/>
        </section >
    )
}
export default ProductInfoDetail
