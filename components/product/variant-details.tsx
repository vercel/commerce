'use client'

import Price from "components/ui/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useState } from "react";
import { VariantSelector } from "./variant-selector";

export function VariantDetails({ product }: { product: Product }) {
  const filterDeterminedOptions = product.options.filter(option => option.name !== 'Wrap');
  const [selectedVariant, setSelectedVariant] = useState<Partial<ProductVariant> | undefined>(product.variants[0]);

  return (
    <>
      <div className='border-b mb-6 border-neutral-500 dark:border-neutral-700 display-flex justify-end'>
        <div className="place-self-end justify-end mr-auto w-25 roundedp-2 text-sm text-neutral-300 mb-6">
          <Price
            amount={selectedVariant?.price?.amount || product.variants[0]!.price.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>

      </div>
      <VariantSelector options={filterDeterminedOptions} variants={product.variants} setSelectedVariant={setSelectedVariant} />
    </>
  )
}
