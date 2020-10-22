import { FC, ReactNode, Component } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import s from './ProductCard.module.css'
import type { ProductNode } from '@lib/bigcommerce/api/operations/get-all-products'
import { Heart } from '@components/icon'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  product: ProductNode
  variant?: 'slim' | 'simple'
  imgWidth: number
  imgHeight: number
  priority?: boolean
}

function getImagePath(imageUrl: string) {
  const url = new URL(imageUrl)
  return url.pathname
}

const ProductCard: FC<Props> = ({
  className,
  product: p,
  variant,
  imgWidth,
  imgHeight,
  priority,
}) => {
  const src = getImagePath(p.images.edges?.[0]?.node.urlOriginal!)

  if (variant === 'slim') {
    return (
      <div className="relative overflow-hidden box-border">
        <div className="absolute inset-0 flex items-center justify-end mr-8">
          <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
            {p.name}
          </span>
        </div>
        <Image
          src={src}
          width={imgWidth}
          height={imgHeight}
          priority={priority}
        />
      </div>
    )
  }

  return (
    <Link href={`product${p.path}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        <div className={s.squareBg} />
        <div className="flex flex-row justify-between box-border w-full z-10 absolute">
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
        <Image
          src={src}
          width={imgWidth}
          height={imgHeight}
          priority={priority}
        />
      </a>
    </Link>
  )
}

export default ProductCard
