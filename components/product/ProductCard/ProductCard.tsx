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
        <div className="flex flex-col">
          <div>
            <h1 className="p-3 h-14 bg-white text-black font-bold text-2xl truncate leading-8">
              {productData.name}
            </h1>
          </div>
          <div>
            <div className="px-6 py-1 pb-3 bg-white text-black font-semibold inline-block text-sm leading-6">
              ${productData.prices.price.value}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center h-12 w-12 bg-white text-black cursor-pointer">
          <Heart />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          className="object-cover object-center w-full"
          src={productData.images.edges[0].node.urlSmall}
        />
      </div>
    </div>
  )
}

export default ProductCard
