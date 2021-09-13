import React from 'react'
import { HeadingCommon, ProductList, SelectCommon } from 'src/components/common'
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon'
import MenuNavigation from 'src/components/common/MenuNavigation/MenuNavigation'
import { BRAND, CATEGORY, FEATURED} from 'src/utils/constanst.utils'
import {  PRODUCT_DATA_TEST_PAGE } from 'src/utils/demo-data'
import s from './ProductListFilter.module.scss'

interface ProductListFilterProps {}

const BREADCRUMB = [
  {
    name: 'Products',
    link: `#`,
  },
]
const OPTIONSLECT = [
	{
		name: 'Most Viewed',
		value: 'most-viewed',
	},
	{
		name: 'Lastest Products',
		value: 'lastest-products',
	},
	{
		name: 'Recent Products',
		value: 'recent-products',
	},
]

const onModalClose = () => {
	
}

const ProductListFilter = (props: ProductListFilterProps) => {
  return (
    <div className={s.warpper}>
      <div className={s.breadcrumb}>
        <BreadcrumbCommon crumbs={BREADCRUMB} />
      </div>
      <div className={s.main}>
        <div className={s.categories}>
          <MenuNavigation categories={CATEGORY} heading="Categories" />
          <MenuNavigation categories={BRAND} heading="Brands" />
          <MenuNavigation categories={FEATURED} heading="featured" />
        </div>

        <div className={s.list}>
          <HeadingCommon align="left">SPECIAL RECIPES</HeadingCommon>

          <div className={s.boxSelect}>
            <div className={s.categorySelectSort}>
              <div className={s.select}>
                <SelectCommon option={OPTIONSLECT} placeholder="Sort By" />
              </div>
            </div>
          </div>
          <ProductList data={PRODUCT_DATA_TEST_PAGE} />
        </div>
      </div>
    </div>
  )
}

export default ProductListFilter
