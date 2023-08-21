'use client';

import Text from 'components/ui/text';
import { useEffect, useState } from 'react';

import { Carousel, CarouselItem } from '@/components/modules/carousel/carousel';
import CategoryCard from '@/components/ui/category-card/category-card';
import ProductCard from '@/components/ui/product-card/product-card';

interface SliderProps {
  products: [] | any;
  title: string;
  categories: [] | any;
  sliderType: String;
}

const Slider = ({ products, categories, title, sliderType }: SliderProps) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (sliderType === 'products') setItems(products);
    else if (sliderType === 'categories') setItems(categories);
  }, []);

  return (
    <div className="flex flex-col">
      {title ? (
        <Text className="mb-4 px-4 lg:mb-6 lg:px-8 2xl:mb-8 2xl:px-16" variant="sectionHeading">
          {title}
        </Text>
      ) : (
        <Text
          className="mb-4 px-4 italic lg:mb-6 lg:px-8 2xl:mb-8 2xl:px-16"
          variant="sectionHeading"
        >
          No title provided yet
        </Text>
      )}

      {items && (
        <Carousel
          gliderClasses={'flex px-4 lg:px-8 2xl:px-16'}
          slidesToShow={2.2}
          responsive={{
            breakpoint: 1024,
            settings: {
              slidesToShow: 4.5
            }
          }}
        >
          {items.map((item: any, index: number) => (
            <CarouselItem key={`${sliderType}-${index}`}>
              {sliderType === 'products' && <ProductCard product={item} />}
              {sliderType === 'categories' && <CategoryCard category={item} />}
            </CarouselItem>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Slider;
