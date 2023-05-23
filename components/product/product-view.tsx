'use client';

import { Carousel, CarouselItem } from 'components/modules/carousel/carousel';
import Price from 'components/product/price';
import SanityImage from 'components/ui/sanity-image';
import { Product } from 'lib/storm/types/product';
import { cn } from 'lib/utils';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
const ProductCard = dynamic(() => import('components/ui/product-card'));
const Text = dynamic(() => import('components/ui/text'));
interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductView({ product, relatedProducts }: ProductViewProps) {
  const images = product.images;
  const t = useTranslations('product');

  return (
    <div className="mb-8 flex w-full flex-col lg:my-16">
      <div
        className={cn('relative grid grid-cols-1 items-start lg:grid-cols-12 lg:px-8 2xl:px-16')}
      >
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
                    slidesToShow: 1
                  }
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

          <div className="hidden grid-cols-2 gap-4 lg:grid">
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

        <div className="col-span-1 mx-auto flex h-auto w-full flex-col px-4 py-6 lg:sticky lg:top-8 lg:col-span-5 lg:px-8 lg:py-0 lg:pr-0 2xl:top-16 2xl:px-16 2xl:pr-0">
          <Text variant={'productHeading'}>{product.name}</Text>

          <Price
            className="text-sm font-medium leading-tight lg:text-base"
            amount={`${product.price.value}`}
            currencyCode={product.price.currencyCode ? product.price.currencyCode : 'SEK'}
          />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="my-16 flex flex-col lg:my-24">
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
                slidesToShow: 4.5
              }
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
  );
}
