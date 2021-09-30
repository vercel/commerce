import React from 'react'
import { ImgWithLink } from 'src/components/common'
import s from './ProductImgItem.module.scss'

export interface ProductImgItemProps {
    preview: string
    name?: string
}


const ProductImgItem = ({ preview, name }: ProductImgItemProps) => {
    return (
        <section className={s.productImgItem}>
            <ImgWithLink src={preview} alt={name} />
        </section >
    )
}

export default ProductImgItem
