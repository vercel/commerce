import type { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import { EnhancedImage } from '@components/core'
import s from './ProductCard.module.css'
import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  product: ProductNode
  variant?: 'slim' | 'simple'
  imgWidth: number | string
  imgHeight: number | string
  priority?: boolean
}

const ProductCard: FC<Props> = ({
  className,
  product: p,
  variant,
  imgWidth,
  imgHeight,
  priority,
}) => {
  const src = p.images.edges?.[0]?.node?.urlOriginal!
  const { price } = usePrice({
    amount: p.prices?.price?.value,
    baseAmount: p.prices?.retailPrice?.value,
    currencyCode: p.prices?.price?.currencyCode!,
  })

  return (
    <Link href={`/product${p.path}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        {variant === 'slim' ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {p.name}
              </span>
            </div>
            <EnhancedImage
              src={p.images.edges?.[0]?.node.urlOriginal!}
              alt={p.images.edges?.[0]?.node.altText || 'Product Image'}
              width={imgWidth}
              height={imgHeight}
              priority={priority}
              quality="85"
            />
          </div>
        ) : (
          <>
            <div className={s.squareBg} />
            <div className="flex flex-row justify-between box-border w-full z-20 absolute">
              <div className="absolute top-0 left-0 pr-16 max-w-full">
                <h3 className={s.productTitle}>
                  <span>{p.name}</span>
                </h3>
                <span className={s.productPrice}>{price}</span>
              </div>
              <WishlistButton
                className={s.wishlistButton}
                productId={p.entityId}
                variant={p.variants.edges?.[0]!}
              />
            </div>
            <div className={s.imageContainer}>
              <EnhancedImage
                alt={p.name}
                className={cn('w-full object-cover', s['product-image'])}
                src={src}
                width={imgWidth}
                height={imgHeight}
                priority={priority}
                quality="85"
              />
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
