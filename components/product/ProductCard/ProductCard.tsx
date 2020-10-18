import cn from 'classnames'
import s from './ProductCard.module.css'
import { FC, ReactNode, Component } from 'react'
import { Heart } from '@components/icon'
import Link from 'next/link'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  node: ProductData
  variant?: 'slim' | 'simple'
}

interface ProductData {
  name: string
  images: any
  prices: any
  path: string
}

const ProductCard: FC<Props> = ({ className, node: p, variant }) => {
  if (variant === 'slim') {
    return (
      <div className="relative overflow-hidden box-border">
        <img
          className="object-scale-down h-48"
          src={p.images.edges[0].node.urlSmall}
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
      <a className={cn(s.root, className)}>
        <div className="absolute z-10 inset-0 flex items-center justify-center">
          <img
            className="w-full object-cover"
            src={p.images.edges[0].node.urlXL}
          />
        </div>
        <div className={cn(s.squareBg, { [s.gray]: variant === 'simple' })} />
        <div className="flex flex-row justify-between box-border w-full z-10 relative">
          <div className="">
            <p className={s.productTitle}>
              <span>{p.name}</span>
            </p>
            <span className={s.productPrice}>${p.prices.price.value}</span>
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
