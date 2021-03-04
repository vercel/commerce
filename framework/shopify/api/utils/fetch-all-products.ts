import { ProductEdge } from '../../schema'
import { ShopifyConfig } from '..'

const fetchAllProducts = async ({
  config,
  query,
  variables,
  acc = [],
  cursor,
}: {
  config: ShopifyConfig
  query: string
  acc?: ProductEdge[]
  variables?: any
  cursor?: string
}): Promise<ProductEdge[]> => {
  const { data } = await config.fetch(query, {
    variables: { ...variables, cursor },
  })

  const edges: ProductEdge[] = data.products?.edges ?? []
  const hasNextPage = data.products?.pageInfo?.hasNextPage
  acc = acc.concat(edges)

  if (hasNextPage) {
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
