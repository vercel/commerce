import { FC } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import s from './ProductCard.module.css'
// import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
}

const ProductCard: FC<Props> = ({ className, product, variant }) => {
  const defaultImageProps = {
    layout: 'responsive',
  }

  return (
    <a className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}>
      {variant === 'slim' ? (
        <div className="relative overflow-hidden box-border">
          <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
            <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
              {product.name}
            </span>
            {/* Image */}
          </div>
        </div>
      ) : (
        <>
          <div className={s.squareBg} />
          <div className="flex flex-row justify-between box-border w-full z-20 absolute">
            <div className="absolute top-0 left-0 pr-16 max-w-full">
              <h3 className={s.productTitle}>
                <span>{product.name}</span>
              </h3>
              <span className={s.productPrice}>{product.price}</span>
            </div>
          </div>
          <div className={s.imageContainer}>
            {/* Image */}

            <Image
              quality="85"
              src={product.images[0].src}
              alt={product.name}
              className={s.productImage}
              {...defaultImageProps}
            />
          </div>
        </>
      )}
    </a>
  )
}

export default ProductCard
