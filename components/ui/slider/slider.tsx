import {
  CarouselItemProps as ItemProps,
  CarouselProps as Props,
} from 'components/ui/carousel/carousel'
import Text from 'components/ui/text'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
const Carousel = dynamic<Props>(() =>
  import('components/ui/carousel/carousel').then((mod) => mod.Carousel)
)
const CarouselItem = dynamic<ItemProps>(() =>
  import('components/ui/carousel/carousel').then((mod) => mod.CarouselItem)
)
const ProductCard = dynamic(() => import('components/ui/product-card'))
const CategoryCard = dynamic(() => import('components/ui/category-card'))

interface SliderProps {
  products: [] | any
  title: string
  categories: [] | any
  sliderType: String
}

const Slider = ({ products, categories, title, sliderType }: SliderProps) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (sliderType === 'products') setItems(products)
    else if (sliderType === 'categories') setItems(categories)
  }, [])

  return (
    <div className="flex flex-col">
      {title ? (
        <Text
          className="mb-4 px-4 lg:px-8 lg:mb-6 2xl:px-16 2xl:mb-8"
          variant="sectionHeading"
        >
          {title}
        </Text>
      ) : (
        <Text
          className="italic mb-4 px-4 lg:px-8 lg:mb-6 2xl:px-16 2xl:mb-8"
          variant="sectionHeading"
        >
          No title provided yet
        </Text>
      )}

      {items && (
        <Carousel
          gliderClasses={'px-4 lg:px-8 2xl:px-16'}
          gliderItemWrapperClasses={'space-x-2 lg:space-x-4'}
          slidesToShow={2.2}
          responsive={{
            breakpoint: 1024,
            settings: {
              slidesToShow: 4.5
            },
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
  )
}

export default Slider
