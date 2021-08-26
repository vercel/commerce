import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image from 'next/image'
import usePrice from '@framework/product/use-price'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  className,
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    className
  )

  return (
    <Link href={`/products/${product.slug}`}>
      <a className={rootClassName}>
        <div className={s.imageContainer}>
          <div className={s.imageContainerInner}>
            {product?.images && (
              <Image
                alt={product.name || 'Product Image'}
                className={s.productImage}
                src={product.images[0]?.url || placeholderImg}
                quality="85"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div className={s.typeIcon}>
            <Image
              src="/icon-audiobook.svg"
              width={22}
              height={23}
            />
          </div>
        </div>
        <div className="font-bold line-clamp-3">
          {product.name}
        </div>
        <div className="italic">
          Author (missing data)
        </div>
        <div>{price}</div>
      </a>
    </Link>
  )
}

export default ProductCard
