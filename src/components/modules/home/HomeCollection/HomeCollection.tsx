import React from 'react'
import { CollectionsWithData } from 'src/utils/types.utils'
import { CollectionCarcousel } from '..'
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
