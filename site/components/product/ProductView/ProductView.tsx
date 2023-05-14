import cn from 'clsx'
import Image from 'next/image'
import s from './ProductView.module.css'
import { FC, useState } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
import ProductModel from '../ProductModel/ProductModel'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { useRouter } from 'next/router'
import random from 'lodash.random'

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const listPrice = usePrice({
    amount: product.variants[0].listPrice ? product.variants[0].listPrice : -1,
    currencyCode: product.price.currencyCode!,
  }).price

  const model3dPath = product.media
    .map((media) => {
      return media.sources
        .filter((source) => source.format == 'glb')
        .map((source) => source.url)
        .slice(0)
    })
    .pop()
    ?.pop()

  const [isLightboxOpen, setLightboxOpen] = useState(false)
  const { locale = 'it' } = useRouter()

  const colors = [random(255), random(255), random(255)]
  const darkerColor =
    'rgba(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', 1)'
  const lighterColor =
    'rgba(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', 0.8)'

  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className={cn(s.root, 'fit')}>
          <div className={cn(s.main, 'fit')}>
            <ProductTag
              name={product.name}
              price={`${price}`}
              listPrice={listPrice.includes('-') ? '' : listPrice}
              fontSize={28}
            />
            <div className={s.sliderContainer}>
              <ProductSlider
                darkerColor={darkerColor}
                lighterColor={lighterColor}
                key={product.id}
              >
                {product.images.map((image, i) => (
                  <div key={image.url} className={s.imageContainer}>
                    <Image
                      id={'product-image-' + i}
                      className={s.img}
                      src={image.url!}
                      alt={image.alt || 'Product Image'}
                      width={600}
                      height={600}
                      priority={i === 0}
                      quality="85"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setLightboxOpen(true)}
                    />
                  </div>
                ))}
                {model3dPath != undefined ? (
                  <div key={'model3d'} className={s.imageContainer}>
                    <ProductModel modelPath={model3dPath}></ProductModel>
                  </div>
                ) : (
                  <></>
                )}
              </ProductSlider>
              <Lightbox
                open={isLightboxOpen}
                plugins={[Zoom]}
                close={() => setLightboxOpen(false)}
                slides={product.images.map((image) => {
                  return {
                    src: image.url,
                  }
                })}
              />
            </div>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
          </div>

          <ProductSidebar
            key={product.id}
            product={product}
            className={s.sidebar}
          />
        </div>
        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">
            {locale === 'en' ? 'Latest Products' : 'Prodotti Recenti'}
          </Text>
          <div className={s.relatedProductsGrid}>
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
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
