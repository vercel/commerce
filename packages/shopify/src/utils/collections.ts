import type {
  CollectionEdge,
  GetAllProductVendorsQuery,
  GetAllProductVendorsQueryVariables,
} from '../../schema'

import type { Category } from '../types/site'
import type { SearchProductsBody } from '../types/product'

import { ShopifyConfig } from '../api'
import { normalizeCategory } from './normalize'
import { getAllProductVendors, getSiteCollectionsQuery } from './queries'

export const getCategories = async ({
  fetch,
  locale,
}: ShopifyConfig): Promise<Category[]> => {
  const { data } = await fetch(
    getSiteCollectionsQuery,
    {
      variables: {
        first: 250,
      },
    },
    {
      ...(locale && {
        headers: {
          'Accept-Language': locale,
        },
      }),
    }
  )

  return (
    data.collections?.edges?.map(({ node }: CollectionEdge) =>
      normalizeCategory(node)
    ) ?? []
  )
}

export type Brand = {
  entityId: string
  name: string
  path: string
}

export type BrandEdge = {
  node: Brand
}

export type Brands = BrandEdge[]

export const getBrands = async (
  config: ShopifyConfig
): Promise<BrandEdge[]> => {
  const { data } = await config.fetch<
    GetAllProductVendorsQuery,
    GetAllProductVendorsQueryVariables
  >(getAllProductVendors, {
    variables: {
      first: 250,
    },
  })

  let vendorsStrings = data.products.edges.map(({ node: { vendor } }) => vendor)

  return [...new Set(vendorsStrings)].map((v) => {
    const id = v.replace(/\s+/g, '-').toLowerCase()
    return {
      node: {
        entityId: id,
        name: v,
        path: `brands/${id}`,
      },
    }
  })
}

export const getSortVariables = (
  sort?: string,
  isCategory: boolean = false
) => {
  switch (sort) {
    case 'price-asc':
      return {
        sortKey: 'PRICE',
        reverse: false,
      }
    case 'price-desc':
      return {
        sortKey: 'PRICE',
        reverse: true,
      }
    case 'trending-desc':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      }
    case 'latest-desc':
      return {
        sortKey: isCategory ? 'CREATED' : 'CREATED_AT',
        reverse: true,
      }
  }
}

export const getSearchVariables = ({
  brandId,
  search,
  categoryId,
  sort,
  locale,
}: SearchProductsBody) => {
  let query = ''

  if (search) {
    query += `product_type:${search} OR title:${search} OR tag:${search} `
  }

  if (brandId) {
    query += `${search ? 'AND ' : ''}vendor:${brandId}`
  }

  return {
    categoryId,
    query,
    ...getSortVariables(sort, !!categoryId),
    ...(locale && {
      locale,
    }),
  }
}
