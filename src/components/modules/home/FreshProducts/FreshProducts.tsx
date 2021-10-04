import { Product } from '@framework/schema'
import React from 'react'
import { CollectionCarcousel } from '..'
interface FreshProductsProps {
  data: Product[]
}

const FreshProducts = ({data}: FreshProductsProps) => {
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
