import {
  GetAllProductPathsQuery,
  GetAllProductVendorsQuery,
  ProductEdge,
} from '../../schema'
import { ShopifyConfig } from '..'

type FetchAllProductsQuery = GetAllProductPathsQuery | GetAllProductVendorsQuery

const fetchAllProducts = async ({
  config,
  query,
  variables,
  acc = [],
  cursor,
}: {
  config: ShopifyConfig
  query: string
  acc?: any[]
  variables?: any
  cursor?: string
}): Promise<ProductEdge[]> => {
  const { data } = await config.fetch<FetchAllProductsQuery>(query, {
    variables: { ...variables, cursor },
  })

  const edges = data.products.edges
  acc = acc.concat(edges)

  if (data.products.pageInfo.hasNextPage) {
    const cursor = edges.pop()?.cursor
    if (cursor) {
      return fetchAllProducts({
        config,
        query,
        variables,
        acc,
        cursor,
      })
    }
  }

  return acc
}

export default fetchAllProducts
