import cn from 'classnames'
import s from './ProductCard.module.css'
import { FC } from 'react'
import { Heart } from '@components/icon'
import { url } from 'inspector'
interface Props {
  className?: string
  children?: any
  node: ProductData
}

interface ProductData {
  name: string
  images: any
  prices: any
}

const ProductCard: FC<Props> = ({ className, node: productData }) => {
  const rootClassName = cn(s.root, className)

  return (
    <div
      className={rootClassName}
      style={
        {
          // backgroundImage: `url('${productData.images.edges[0].node.urlSmall}')`,
        }
      }
    >
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
    </div>
  )
}

export default ProductCard
