import { ProductCard } from '@commerce/types/product'
import { Product } from '@framework/schema'
import React from 'react'
import { CollectionCarcousel } from '..'
interface FreshProductsProps {
  data: ProductCard[]
}

const FreshProducts = ({ data }: FreshProductsProps) => {
  if (data.length === 0) {
    return null
  }
  return (
    <div className="w-full">
      <CollectionCarcousel
        type="highlight"
        data={data}
        itemKey="product-1"
        title="Fresh Products Today"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
        category={"veggie"}
      />
    </div>
  )
}

export default FreshProducts
