import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
  imgProps?: Omit<ImageProps, 'src'>
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  className,
  product,
  variant,
  imgProps,
  ...props
}) => (
  <Link href={`/product/${product.slug}`} {...props}>
    <a className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}>
      {variant === 'slim' ? (
        <div className="relative overflow-hidden box-border">
          <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
            <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
              {product.name}
            </span>
          </div>
          {product?.images && (
            <Image
              quality="85"
              src={product.images[0]?.url || placeholderImg}
              alt={product.name || 'Product Image'}
              height={320}
              width={320}
              layout="fixed"
              {...imgProps}
            />
          )}
        </div>
      ) : (
        <>
          <div className={s.squareBg} />
          <div className="flex flex-row justify-between box-border w-full z-20 absolute">
            <div className="absolute top-0 left-0 pr-16 max-w-full">
              <h3 className={s.productTitle}>
                <span>{product.name}</span>
              </h3>
              <span className={s.productPrice}>
                {product.price.value}
                &nbsp;
                {product.price.currencyCode}
              </span>
            </div>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}
          </div>
          <div className={s.imageContainer}>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={product.images[0]?.url || placeholderImg}
                height={540}
                width={540}
                quality="85"
                layout="responsive"
                {...imgProps}
              />
            )}
          </div>
        </>
      )}
    </a>
  </Link>
)

export default ProductCard
