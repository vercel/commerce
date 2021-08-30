import React from 'react'
import { CarouselCommon, ImgWithLink } from 'src/components/common'
import { ImgWithLinkProps } from 'src/components/common/ImgWithLink/ImgWithLink'
import s from './ProductImgs.module.scss'

interface Props {
    className?: string
    children?: any,
}

const DATA = [
    {
        src: 'https://user-images.githubusercontent.com/76729908/130574371-3b75fa72-9552-4605-aba9-a4b31cd9dce7.png',
        alt: 'Broccoli',
    },
    {
        src: 'https://user-images.githubusercontent.com/76729908/130574371-3b75fa72-9552-4605-aba9-a4b31cd9dce7.png',
        alt: 'Broccoli',
    }
]

const option = {
    slidesPerView: 1,
}

const ProductImgs = ({ }: Props) => {
    return (
        <section className={s.productImgs}>
            <CarouselCommon<ImgWithLinkProps>
                data={DATA}
                itemKey="product-detail-img"
                Component={ImgWithLink}
                option={option}
                isDot={true}
            />
        </section >
    )
}

export default ProductImgs
