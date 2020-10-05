import cn from 'classnames'
import s from './ProductCard.module.css'
import { FC } from 'react'
import { Heart } from '@components/icon'
import Link from 'next/link'

interface Props {
  className?: string
  children?: any
  node: ProductData
  variant?: 'slim'
}

interface ProductData {
  name: string
  images: any
  prices: any
  path: string
}

const ProductCard: FC<Props> = ({ className, node: p, variant }) => {
  const rootClassName = cn(s.root, className)

  if (variant === 'slim') {
    return (
      <div className="relative overflow-hidden box-border">
        <img
          className="object-scale-down h-24"
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
      <div className={rootClassName}>
        <div className="absolute z-10 inset-0 flex items-center justify-center">
          <img
            className="w-full object-cover"
            src={p.images.edges[0].node.urlSmall}
          />
        </div>
        <div className={s.squareBg} />
        <div className="flex flex-row justify-between box-border w-full z-10 relative">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1">
              <h1 className={s.productTitle}>{p.name}</h1>
            </div>
            <div className="flex-0">
              <div className={s.productPrice}>${p.prices.price.value}</div>
            </div>
          </div>
          <div className={s.wishlistButton}>
            <Heart />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
