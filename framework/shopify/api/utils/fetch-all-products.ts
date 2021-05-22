import { ProductEdge, QueryRoot, QueryRootProductsArgs } from '../../schema'
import { ShopifyConfig } from '..'

const fetchAllProducts = async ({
  config,
  query,
  variables = {
    first: 250,
  },
  acc = [],
  cursor,
}: {
  config: ShopifyConfig
  query: string
  acc?: ProductEdge[]
  variables?: any
  cursor?: string
}): Promise<ProductEdge[]> => {
  const { fetch, locale } = config
  const { data } = await fetch<QueryRoot, QueryRootProductsArgs>(
    query,
    {
      variables: { ...variables, cursor },
    },
    {
      ...(locale && {
        headers: {
          'Accept-Locale': locale,
        },
      }),
    }
  )

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
