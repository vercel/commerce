import { Collection, Facet } from '@framework/schema'
import React from 'react'
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation'
import { QUERY_KEY } from 'src/utils/constanst.utils'
import s from './ProductsMenuNavigationTablet.module.scss'

interface Props {
  facets: Facet[]
  collections: Collection[]

}

const ProductsMenuNavigationTablet = ({ facets, collections }: Props) => {
  return (
    <div className={s.productsMenuNavigationTablet}>
      <MenuNavigation categories={collections} heading="Categories" queryKey={QUERY_KEY.CATEGORY} />
      {
        facets.map(item => <MenuNavigation
          key={item.id}
          queryKey={item.code}
          categories={item.values}
          heading={item.name} />)
      }
    </div>
  )
}

export default ProductsMenuNavigationTablet
