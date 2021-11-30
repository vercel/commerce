import { Collection } from '@commerce/types/collection'
import { ProductCard } from '@commerce/types/product'
import React, { useMemo } from 'react'
import { OPTION_ALL, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { getCategoryNameFromCollectionId } from 'src/utils/funtion.utils'
import { CollectionCarcousel } from '..'
interface FreshProductsProps {
  data: ProductCard[]
  collections: Collection[]
}

const FreshProducts = ({ data, collections }: FreshProductsProps) => {

  const dataWithCategory = useMemo(() => {
    return data?.map(item => {
      return {
        ...item,
        collection: getCategoryNameFromCollectionId(collections, item.collectionIds ? item.collectionIds[0] : undefined)
      }
    })
  }, [data, collections])

  if (data.length === 0) {
    return null
  }
  return (
    <div className="w-full">
      <CollectionCarcousel
        type="highlight"
        data={dataWithCategory}
        itemKey="product-1"
        title="Fresh Products Today"
        subtitle="Last call! Shop deep deals on 100+ bulk picks while you can."
        viewAllLink={`${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=${OPTION_ALL}`}
        hasLineBottom
      />
    </div>
  )
}

export default FreshProducts
