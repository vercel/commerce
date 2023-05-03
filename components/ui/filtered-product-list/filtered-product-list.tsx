'use client'

import Text from 'components/ui/text'
import dynamic from 'next/dynamic'

const ProductCard = dynamic(() => import('components/ui/product-card'))

interface SliderProps {
  products: any
  title: string
  itemsToShow: number
}

const FilteredProductList = ({ title, products, itemsToShow }: SliderProps) => {
  return (
    <div className="px-4 lg:px-8 2xl:px-16">
      {title ? (
        <Text className="mb-4 lg:mb-6 2xl:mb-8" variant="sectionHeading">
          {title}
        </Text>
      ) : (
        <Text className="italic mb-4 lg:mb-6 2xl:mb-8" variant="sectionHeading">
          No title provided yet
        </Text>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.slice(0, itemsToShow).map((product: any, index: number) => (
          <span>Product</span>
          // <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  )
}

export default FilteredProductList
