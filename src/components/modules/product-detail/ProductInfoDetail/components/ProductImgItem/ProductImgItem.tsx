import React from 'react'
import { ImgWithLink } from 'src/components/common'
import s from './ProductImgItem.module.scss'

export interface ProductImgItemProps {
    url: string
    alt?: string
}


const ProductImgItem = ({ url, alt }: ProductImgItemProps) => {
    return (
        <section className={s.productImgItem}>
            <ImgWithLink src={url} alt={alt} />
        </section >
    )
}

export default ProductImgItem
