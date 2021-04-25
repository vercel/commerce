import { ProductEdge } from '../../schema'
import { SwellConfig } from '..'

const fetchAllProducts = async ({
  config,
  query,
  method,
  variables,
  acc = [],
  cursor,
}: {
  config: SwellConfig
  query: string
  acc?: ProductEdge[]
  variables?: any
  cursor?: string
}): Promise<ProductEdge[]> => {
  // const response = await config.fetch(query, {
  //   variables: { ...variables, cursor },
  // })
  const response = await config.fetchSwell('products', 'list', [{ limit: 100 }])

  const edges: ProductEdge[] = response.results ?? []
  const hasNextPage = response.results.length < response.count
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
