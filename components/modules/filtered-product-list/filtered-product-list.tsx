'use client';

import ProductCard from '@/components/ui/product-card/product-card';
import Text from 'components/ui/text';

interface SliderProps {
  disabled: boolean;
  products: any;
  title: string;
  itemsToShow: number;
}

const FilteredProductList = ({ disabled, title, products, itemsToShow }: SliderProps) => {
  if (disabled) {
    return;
  }

  return (
    <div className="px-4 lg:px-8 2xl:px-16">
      {title ? (
        <Text className="mb-4 lg:mb-6 2xl:mb-8" variant="sectionHeading">
          {title}
        </Text>
      ) : (
        <Text className="mb-4 italic lg:mb-6 2xl:mb-8" variant="sectionHeading">
          No title provided yet
        </Text>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, itemsToShow).map((product: any, index: number) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FilteredProductList;
