import cn from 'clsx'
import Image from 'next/image'
import { WishlistButton } from '@components/wishlist'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'

import { useProduct } from '../product-context'

import s from './ProductDetails.module.css'
import ProductSlider from '../ProductSlider'

const ProductDetails = () => {
  const { product, variant, price } = useProduct()

  return (
    <div className={cn(s.root, 'fit')}>
      <div className={cn(s.main, 'fit')}>
        <ProductTag name={product.name} price={price} fontSize={32} />
        <div className={s.sliderContainer}>
          <ProductSlider key={product.id}>
            {product.images.map((image, i) => (
              <div key={image.url} className={s.imageContainer}>
                <Image
                  className={s.img}
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  width={600}
                  height={600}
                  priority={i === 0}
                  quality="85"
                />
              </div>
            ))}
          </ProductSlider>
        </div>
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={variant}
          />
        )}
      </div>
      <ProductSidebar key={product.id} className={s.sidebar} />
    </div>
  )
}

export default ProductDetails
