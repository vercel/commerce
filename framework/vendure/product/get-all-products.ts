import type { RecursivePartial, RecursiveRequired } from '../api/utils/types'
import filterEdges from '../api/utils/filter-edges'
import setProductLocaleMeta from '../api/utils/set-product-locale-meta'
import { productConnectionFragment } from '../api/fragments/product'
import { VendureConfig, getConfig } from '../api'
import { normalizeProduct } from '../lib/normalize'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $input: SearchInput!
  ) {
    search(input: $input) {
        items {
          productId
          productName
          description
          description
          slug
          sku
          currencyCode
          productAsset {
            id
            preview
          }
          priceWithTax {
            ... on SinglePrice { value }
            ... on PriceRange { min max }
          }
        }
    }
  }
`

export type ProductVariables = { first?: number; }

async function getAllProducts(opts?: {
  variables?: ProductVariables
  config?: VendureConfig
  preview?: boolean
}): Promise<{ products: Product[] }>

async function getAllProducts({
  query = getAllProductsQuery,
  variables: { ...vars } = {},
  config,
}: {
  query?: string
  variables?: ProductVariables
  config?: VendureConfig
  preview?: boolean
} = {}): Promise<{ products: Product[] | any[] }> {
  config = getConfig(config)
  const variables = {
    input: {
      take: vars.first,
      groupByProduct: true,
    }
  }
  const { data } = await config.fetch(
    query,
    { variables }
  )

  return { products: data.search.items.map((item: any) => {
    return {
      id: item.productId,
      name: item.productName,
      description: item.description,
      slug: item.slug,
      path: item.slug,
      images: [{ url: item.productAsset?.preview }],
      variants: [],
      price: {
        value: (item.priceWithTax.min / 100),
        currencyCode: item.currencyCode,
      },
      options: [],
      sku: item.sku,
    }
    }) }
}

export default getAllProducts
