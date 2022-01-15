import { ProductCountableEdge } from '../../../schema'
import { SaleorConfig } from '..'

const fetchAllProducts = async ({
  config,
  query,
  variables,
  acc = [],
  cursor,
}: {
  config: SaleorConfig
  query: string
  acc?: ProductCountableEdge[]
  variables?: any
  cursor?: string
}): Promise<ProductCountableEdge[]> => {
  const { data } = await config.fetch(query, {
    variables: { ...variables, cursor },
  })

  const edges: ProductCountableEdge[] = data.products?.edges ?? []
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
