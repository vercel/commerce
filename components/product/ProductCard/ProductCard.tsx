import cn from 'classnames'
import s from './ProductCard.module.css'
import { FC } from 'react'
import { Heart } from '@components/icon'
interface Props {
  className?: string
  children?: any
  productData: ProductData
}

interface ProductData {
  name: string
  images: any
  prices: any
}

const ProductCard: FC<Props> = ({ className, productData }) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      {/* Overlay */}
      <div className="flex flex-row justify-between box-border w-full z-10 relative">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1">
            <h1 className={s.productTitle}>{productData.name}</h1>
          </div>
          <div className="flex-0">
            <div className={s.productPrice}>
              ${productData.prices.price.value}
            </div>
          </div>
        </div>

        <div className={s.wishlistButton}>
          <Heart />
        </div>
      </div>

      <div className="absolute box-border top-0 left-0 w-full h-full z-0 m-12">
        {/* <img
          className="object-cover object-center w-full"
          src={productData.images.edges[0].node.urlSmall}
        /> */}
      </div>
    </div>
  )
}

export default ProductCard
