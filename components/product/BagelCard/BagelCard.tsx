import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types'
import styles from './BagelCard.module.scss'
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
    <div className={styles.row}>
      <div className={styles.square}>
        {product?.images && (
          <img src={product.images[0].url} alt="" />
          // <Image
          //   alt={product.name || 'Product Image'}
          //   className={styles.productImage}
          //   src={product.images[0].url || placeholderImg}
          //   height={540}
          //   width={540}
          //   quality="85"
          //   layout="responsive"
          //   {...imgProps}
          // />
        )}
      </div>
      <div className={styles.info}>
        <h1>
          Featuring <i>Grain</i>changing Technology
        </h1>
        <button className={styles.btn}>
          <Link href={`/product/${product.slug}`} {...props}>
            <a>
              <h5>Try The Better Bagel</h5>
            </a>
          </Link>
        </button>
      </div>
    </div>
  </>
)

export default BagelCard
