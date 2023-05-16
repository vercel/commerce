'use client'

import { Carousel, CarouselItem } from 'components/modules/carousel/carousel'
import Price from 'components/product/price'
import SanityImage from 'components/ui/sanity-image'
import { Product } from "lib/storm/types/product"
import { cn } from 'lib/utils'
import { useTranslations } from 'next-intl'
import dynamic from "next/dynamic"
import { AddToCart } from './add-to-cart'
const ProductCard = dynamic(() => import('components/ui/product-card'))
const Text = dynamic(() => import('components/ui/text'))
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductView({product, relatedProducts }: ProductViewProps) {
  const images = product.images
  const t = useTranslations('product')

  return (
    <div className="flex flex-col w-full mb-8 lg:my-16">
      <div className={cn('relative grid items-start grid-cols-1 lg:px-8 lg:grid-cols-12 2xl:px-16')}>
        
        <div className="relative col-span-1 lg:col-span-7">
          <div className={`pdp aspect-square lg:hidden`}>
            {images && (
              <Carousel
                hasArrows={true}
                hasDots={false}
                gliderClasses={'lg:px-8 2xl:px-16'}
                slidesToScroll={1}
                slidesToShow={images.length > 1 ? 1.0125 : 1}
                responsive={{
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 1,
                  },
                }}
              >
                {images.map((image: any, index: number) => (
                  <CarouselItem className="ml-1 first:ml-0" key={`${index}`}>
                    <SanityImage
                      image={image}
                      alt={image.alt}
                      priority={true}
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 70vw"
                    />
                  </CarouselItem>
                ))}
              </Carousel>
            )}
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {images.map((image: any, index: number) => (
              <div key={index} className="first:col-span-2">
                <SanityImage
                  image={image}
                  alt={image.alt}
                  priority={true}
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col col-span-1 mx-auto px-4 py-6 w-full h-auto lg:col-span-5 lg:py-0 lg:px-8 lg:pr-0 2xl:px-16 2xl:pr-0 lg:sticky lg:top-8 2xl:top-16">
          <Text variant={'productHeading'}>
            {product.name}
          </Text>

          <Price
            className='text-sm font-medium leading-tight lg:text-base' 
            amount={`${product.price.value}`} 
            currencyCode={product.price.currencyCode ? product.price.currencyCode : 'SEK'}
          />

          <AddToCart availableForSale={true} variants={[]} />
        </div>

      </div>
    
      {relatedProducts.length > 0 && (
        <section className="flex flex-col my-16 lg:my-24">
          <Text className="px-4 lg:px-8 2xl:px-16" variant="sectionHeading">
            {t('related')}
          </Text>

          <Carousel
            gliderClasses={'px-4 lg:px-8 2xl:px-16'}
            hasArrows={true}
            hasDots={true}
            slidesToShow={2.2}
            slidesToScroll={1}
            responsive={{
              breakpoint: 1024,
              settings: {
                slidesToShow: 4.5,
              },
            }}
          >
            {relatedProducts.map((p) => (
              <CarouselItem key={`product-${p.path}`}>
                <ProductCard product={p} />
              </CarouselItem>
            ))}
          </Carousel>
        </section>
      )}
    </div>
  )
}