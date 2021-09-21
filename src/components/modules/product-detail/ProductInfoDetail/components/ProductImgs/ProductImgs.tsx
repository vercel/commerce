import React from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import { CarouselCommon } from 'src/components/common'
import ProductImgItem, { ProductImgItemProps } from '../ProductImgItem/ProductImgItem'
import s from './ProductImgs.module.scss'

interface Props {
    className?: string
    children?: any,
}

const DATA = [
    {
        src: 'https://user-images.githubusercontent.com/76729908/133026929-199799fc-bd75-4445-a24d-15c0e41796eb.png',
        alt: 'Meat',
    },
    {
        src: 'https://user-images.githubusercontent.com/76729908/130574371-3b75fa72-9552-4605-aba9-a4b31cd9dce7.png',
        alt: 'Broccoli',
    },
    {
        src: 'https://user-images.githubusercontent.com/76729908/130574371-3b75fa72-9552-4605-aba9-a4b31cd9dce7.png',
        alt: 'Broccoli',
    }
]

const RESPONSIVE: ResponsiveType = {
    desktop: {
      breakpoint: { max: 9999, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }
const ProductImgs = ({ }: Props) => {
    return (
        <section className={s.productImgs}>
            <CarouselCommon<ProductImgItemProps>
                data={DATA}
                itemKey="product-detail-img"
                Component={ProductImgItem}
                responsive={RESPONSIVE}
                showDots={true}
            />
        </section >
    )
}

export default ProductImgs

