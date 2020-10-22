import cn from 'classnames'
import s from './ProductCard.module.css'
import { FC, ReactNode, Component } from 'react'
import type { ProductNode } from '@lib/bigcommerce/api/operations/get-all-products'
import { Heart } from '@components/icon'
import Link from 'next/link'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  product: ProductNode
  variant?: 'slim' | 'simple'
}

const ProductCard: FC<Props> = ({ className, product: p, variant }) => {
  if (variant === 'slim') {
    return (
      <div className="relative overflow-hidden box-border">
        <img
          className="object-scale-down h-48"
          src={p.images.edges?.[0]?.node.urlSmall}
        />
        <div className="absolute inset-0 flex items-center justify-end mr-8">
          <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
            {p.name}
          </span>
        </div>
      </div>
    )
  }

  return (
    <Link href={`product${p.path}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        <div className="absolute z-10 inset-0 flex items-center justify-center">
          <img
            className={cn('w-full object-cover', s['product-image'])}
            src={p.images.edges?.[0]?.node.urlXL}
          />
        </div>
        <div className={s.squareBg} />
        <div className="flex flex-row justify-between box-border w-full z-10 relative">
          <div className="absolute top-0 left-0">
            <h3 className={s.productTitle}>
              <span>{p.name}</span>
            </h3>
            <span className={s.productPrice}>${p.prices?.price.value}</span>
          </div>
          <div className={s.wishlistButton}>
            <Heart />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
