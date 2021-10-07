import React from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import { CarouselCommon } from 'src/components/common'
import ProductImgItem, { ProductImgItemProps } from '../ProductImgItem/ProductImgItem'
import s from './ProductImgs.module.scss'
import { ProductImage } from '@commerce/types/product';

interface Props {
    productImage: ProductImage[]
}


const RESPONSIVE: ResponsiveType = {
    desktop: {
      breakpoint: { max: 9999, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }
const ProductImgs = ({ productImage }: Props) => {
    return (
        <section className={s.productImgs}>
            <CarouselCommon<ProductImgItemProps>
                data={productImage}
                itemKey="product-detail-img"
                Component={ProductImgItem}
                responsive={RESPONSIVE}
                showDots={true}
            />
        </section >
    )
}

export default ProductImgs

