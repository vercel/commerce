import { ProductCard } from '@commerce/types/product'
import { Collection, Facet, FacetValue, QuerySearchArgs } from '@framework/schema'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HeadingCommon, ProductList } from 'src/components/common'
import BreadcrumbCommon from 'src/components/common/BreadcrumbCommon/BreadcrumbCommon'
import SkeletonImage from 'src/components/common/SkeletonCommon/SkeletonImage/SkeletonImage'
import { useSearchProducts } from 'src/components/hooks/product'
import { DEFAULT_PAGE_SIZE, QUERY_KEY, QUERY_SPLIT_SEPERATOR, ROUTE } from 'src/utils/constanst.utils'
import { getFacetIdsFromCodes, getPageFromQuery } from 'src/utils/funtion.utils'
import s from './ProductListFilter.module.scss'
import ProductsMenuNavigationTablet from './ProductsMenuNavigationTablet/ProductsMenuNavigationTablet'
import ProductSort from './ProductSort/ProductSort'

interface ProductListFilterProps {
  facets: Facet[]
  collections: Collection[]
  products: ProductCard[]
  total: number

}

const BREADCRUMB = [
  {
    name: 'Products',
    link: `#`,
  },
]


const DEFAULT_SEARCH_ARGS = {
  groupByProduct: true, take: DEFAULT_PAGE_SIZE
}

const ProductListFilter = ({ facets, collections, products, total }: ProductListFilterProps) => {
  const router = useRouter()
  const [initialQueryFlag, setInitialQueryFlag] = useState<boolean>(true)
  const [optionQueryProduct, setOptionQueryProduct] = useState<QuerySearchArgs>({ input: DEFAULT_SEARCH_ARGS })
  const { products: productSearchResult, totalItems, loading } = useSearchProducts(optionQueryProduct)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string)
    setCurrentPage(page)
  }, [router.query])

  const onPageChange = (page: number) => {
    setCurrentPage(page)

    router.push({
      pathname: ROUTE.PRODUCTS,
      query: {
        ...router.query,
        [QUERY_KEY.PAGE]: page
      }
    },
      undefined, { shallow: true }
    )
  }

  useEffect(() => {
    const query = { input: { ...DEFAULT_SEARCH_ARGS } } as QuerySearchArgs

    const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string)
    query.input.skip = page * DEFAULT_PAGE_SIZE

    // collections
    const categoryQuery = router.query[QUERY_KEY.CATEGORY] as string
    if (categoryQuery) {
      query.input.collectionSlug = categoryQuery
    }

    // facets
    const facetsQuery = [router.query[QUERY_KEY.FEATURED] as string, router.query[QUERY_KEY.BRAND] as string].join(QUERY_SPLIT_SEPERATOR)
    if (facetsQuery) {
      const facetsValue = [] as FacetValue[]
      facets.map((item: Facet) => {
        facetsValue.push(...item.values)
        return null
      })

      query.input.facetValueIds = getFacetIdsFromCodes(facetsValue, facetsQuery.split(QUERY_SPLIT_SEPERATOR))
    }

    setOptionQueryProduct(query)
    setInitialQueryFlag(false)
  }, [router.query, facets])

  return (
    <div className={s.warpper}>
      <div className={s.breadcrumb}>
        <BreadcrumbCommon crumbs={BREADCRUMB} />
      </div>
      <div className={s.main}>
        <ProductsMenuNavigationTablet facets={facets} collections={collections} />
        <div className={s.list}>
          <div className={s.top}>
            <HeadingCommon align="left">SPECIAL RECIPES</HeadingCommon>

            <div className={s.boxSelect}>
              <ProductSort />
            </div>
          </div>
          {
            (!initialQueryFlag && loading && !productSearchResult) && <SkeletonImage />
          }
          <ProductList data={initialQueryFlag ? products : (productSearchResult || [])} total={totalItems !== undefined ? totalItems : total} onPageChange={onPageChange} defaultCurrentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}

export default ProductListFilter
