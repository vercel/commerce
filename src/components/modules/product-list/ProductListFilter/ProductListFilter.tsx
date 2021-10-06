import { ProductCard } from '@commerce/types/product'
import { Collection, Facet } from '@framework/schema'
import React from 'react'
import { HeadingCommon, ProductList } from 'src/components/common'
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon'
import s from './ProductListFilter.module.scss'
import ProductsMenuNavigationTablet from './ProductsMenuNavigationTablet/ProductsMenuNavigationTablet'
import ProductSort from './ProductSort/ProductSort'

interface ProductListFilterProps {
  facets: Facet[]
  collections: Collection[]
  products: ProductCard[]

}

const BREADCRUMB = [
  {
    name: 'Products',
    link: `#`,
  },
]

const ProductListFilter = ({ facets, collections, products }: ProductListFilterProps) => {

  return (
    <div className={s.warpper}>
      <div className={s.breadcrumb}>
        <BreadcrumbCommon crumbs={BREADCRUMB} />
      </div>
      <div className={s.main}>
        <ProductsMenuNavigationTablet facets={facets} collections={collections} />
        <div className={s.list}>
          <HeadingCommon align="left">SPECIAL RECIPES</HeadingCommon>

          <div className={s.boxSelect}>
            <ProductSort/>
          </div>
          <ProductList data={products} />
        </div>
      </div>
    </div>
  )
}

export default ProductListFilter
