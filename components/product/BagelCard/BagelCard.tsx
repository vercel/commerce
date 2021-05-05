import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types'
import s from './BagelCard.module.css'
import Image, { ImageProps } from 'next/image'

interface Props {
  className?: string
  product: Product
  variant?: 'slim' | 'simple'
  imgProps?: Omit<ImageProps, 'src'>
}

const placeholderImg = '/product-img-placeholder.svg'

const BagelCard: FC<Props> = ({
  className,
  product,
  variant,
  imgProps,
  ...props
}) => (
  <>
    <div
      className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
    >
      <div className={s.imageContainer}>
        {product?.images && (
          <Image
            alt={product.name || 'Product Image'}
            className={s.productImage}
            src={product.images[0].url || placeholderImg}
            height={540}
            width={540}
            quality="85"
            layout="responsive"
            {...imgProps}
          />
        )}
      </div>
      <div className={s.textContainer}>
        <h1>
          Featuring <i>Grain</i>changing Technology
        </h1>
        <Link href={`/product/${product.slug}`} {...props}>
          <a className={s.button}>Try The Better Bagel</a>
        </Link>
      </div>
    </div>
  </>
)

export default BagelCard
