import React from 'react'
import { ImgWithLink } from 'src/components/common'
import s from './ProductImgItem.module.scss'

export interface ProductImgItemProps {
    src: string
    alt?: string
}


const ProductImgItem = ({ src, alt }: ProductImgItemProps) => {
    return (
        <section className={s.productImgItem}>
            <ImgWithLink src={src} alt={alt} />
        </section >
    )
}

export default ProductImgItem
