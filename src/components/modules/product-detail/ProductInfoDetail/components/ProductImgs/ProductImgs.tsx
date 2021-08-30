import React from 'react'
import { CarouselCommon } from 'src/components/common'
import s from './ProductImgs.module.scss'

interface ImgProps {
    src: string, alt?: string
}

interface Props {
    className?: string
    children?: any,
    // data: ImgProps[]
}

const ProductImgs = ({ }: Props) => {
    return (
        <section className={s.productImgs}>
            {/* <CarouselCommon<ImgProps>  /> */}
            <img className={s.img} src="https://user-images.githubusercontent.com/76729908/130574371-3b75fa72-9552-4605-aba9-a4b31cd9dce7.png" alt="" />
        </section >
    )
}

export default ProductImgs
