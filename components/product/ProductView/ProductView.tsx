import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import s from './ProductView.module.css'
import { FC, useEffect, useState } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { useAddItem } from '@framework/cart'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard, ProductOptions } from '@components/product'
import {
  Button,
  Container,
  Text,
  useUI,
  Rating,
  Collapse,
} from '@components/ui'

interface ProductViewProps {
  product: Product
  className?: string
  relatedProducts: Product[]
  children?: React.ReactNode
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const addItem = useAddItem()
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <Container className="max-w-none w-full" clean>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.main, 'fit')}>
          <div className={s.header}>
            <h3 className={s.name}>
              <span>{product.name}</span>
            </h3>
            <div className={s.price}>
              {`${price} ${product.price?.currencyCode}`}
            </div>
          </div>

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
              variant={product.variants[0]}
            />
          )}
        </div>
        <div className={s.sidebar}>
          <ProductOptions
            options={product.options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <Text
            className="pb-4 break-words w-full max-w-xl"
            html={product.descriptionHtml || product.description}
          />
          <div className="flex flex-row justify-between items-center">
            <Rating value={2} />
            <div className="text-accent-6 pr-1 font-medium">36 reviews</div>
          </div>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={variant?.availableForSale === false}
            >
              {variant?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart'}
            </Button>
          </div>
          <div className="mt-6">
            <Collapse title="Care">
              This is a limited edition production run. Printing starts when the
              drop ends.
            </Collapse>
            <Collapse title="Details">
              This is a limited edition production run. Printing starts when the
              drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days
              due to COVID-19.
            </Collapse>
          </div>
        </div>
      </div>
      <hr className="mt-6 border-accent-2" />
      <section className="py-6 px-6 mb-10">
        <Text variant="sectionHeading">Related Products</Text>
        <div className="grid grid-cols-2 py-2 gap-4 md:grid-cols-4 md:gap-20">
          {relatedProducts.map((p) => (
            <div
              key={p.path}
              className="animated fadeIn bg-accent-0 border border-accent-2"
            >
              <ProductCard
                noNameTag
                product={p}
                key={p.path}
                variant="simple"
                className="animated fadeIn"
                imgProps={{
                  width: 182,
                  height: 182,
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}

export default ProductView
