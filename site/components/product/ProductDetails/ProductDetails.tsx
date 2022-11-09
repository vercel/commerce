import cn from 'clsx'
import { useProduct } from '../context'
import { WishlistButton } from '@components/wishlist'
import Image from 'next/image'
import ProductTag from '../ProductTag'
import ProductSlider from '../ProductSlider'
import ProductSidebar from '../ProductSidebar'

import s from './ProductDetails.module.css'

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
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  width={600}
                  height={600}
                  quality="85"
                  priority={i === 0}
                />
              </div>
            ))}
          </ProductSlider>
        </div>
        {process.env.COMMERCE_WISHLIST_ENABLED && variant && (
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
