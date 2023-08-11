'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Product } from '@/lib/storm/product';
import { Image } from '@/lib/storm/types';
import Text from 'components/ui/text/text';
import { cn } from 'lib/utils';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import Price from '../price';
import { Gallery } from './gallery';
import { Grid } from './grid';

interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductView({ product, relatedProducts }: ProductViewProps) {
  const t = useTranslations('product');
  const { name, description, price, images } = product;

  return (
    <div className="my-8 flex w-full flex-col lg:my-16">
      <div
        className={cn('relative grid grid-cols-1 items-start lg:grid-cols-12 lg:px-8 2xl:px-16')}
      >
        <div className="relative col-span-1 lg:col-span-7">
          <div className="lg:hidden">
            <Gallery
              images={images.map((image: Image) => ({
                src: image.url,
                alt: image.alt
              }))}
            />
          </div>

          <div className="hidden lg:flex">
            <Grid
              images={images.map((image: Image) => ({
                src: image.url,
                alt: image.alt,
                height: image.height,
                width: image.width
              }))}
            />
          </div>
        </div>

        <div className="col-span-1 mx-auto flex h-auto w-full flex-col p-4 lg:col-span-5 lg:px-8 lg:py-0 lg:pr-0 2xl:top-16 2xl:px-16 2xl:pr-0">
          <Text variant={'productHeading'}>{name}</Text>

          <Price
            className="mt-2 text-sm font-bold leading-tight lg:text-base"
            amount={`${price.value}`}
            currencyCode={price.currencyCode ? price.currencyCode : 'SEK'}
          />

          {description && (
            <Accordion
              className="mt-8"
              type="single"
              collapsible
              defaultValue="product-description"
            >
              <AccordionItem value="product-description">
                <AccordionTrigger>{t('description')}</AccordionTrigger>
                <AccordionContent>
                  <Text className="mt-2" variant="paragraph">
                    {description}
                  </Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <Suspense>
          <section className="my-16 flex flex-col lg:my-24">
            <Text className="px-4 lg:px-8 2xl:px-16" variant="sectionHeading">
              {t('related')}
            </Text>
          </section>
        </Suspense>
      )}
    </div>
  );
}
