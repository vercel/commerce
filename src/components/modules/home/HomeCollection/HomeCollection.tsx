import React from 'react'
import { ProductCard } from '@commerce/types/product'
import { CollectionCarcousel } from '..'
import image5 from '../../../../../public/assets/images/image5.png'
import image6 from '../../../../../public/assets/images/image6.png'
import image7 from '../../../../../public/assets/images/image7.png'
import image8 from '../../../../../public/assets/images/image8.png'
import { CollectionsWithData } from 'src/utils/types.utils'
interface HomeCollectionProps {
  data: CollectionsWithData[]
}

const HomeCollection = ({ data }: HomeCollectionProps) => {
  return (
    <div className="w-full">
      {data.map((collection) => {
        return collection.items.length > 0 ? (
          <CollectionCarcousel
            key={collection.slug}
            data={collection.items}
            itemKey={collection.id}
            title={collection.name}
            subtitle={collection.description}
            category={collection.name}
          />
        ) : null
      })}
    </div>
  )
}

export default HomeCollection
