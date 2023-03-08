import type { OperationContext } from '@vercel/commerce/api/operations'
import { Product } from '@vercel/commerce/types/product'

import { ProductCountableEdge } from '../../../schema'
import type { Provider, SaleorConfig } from '..'
import { normalizeProduct } from '../../utils'

import * as Query from '../../utils/queries'
import { GraphQLFetcherResult } from '@vercel/commerce/api'

type ReturnType = {
  products: Product[]
}

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts({
    query = Query.ProductMany,
    variables,
    config,
    featured,
  }: {
    query?: string
    variables?: any
    config?: Partial<SaleorConfig>
    preview?: boolean
    featured?: boolean
  } = {}): Promise<ReturnType> {
    const { fetch, locale } = commerce.getConfig(config)

    if (featured) {
      variables = { ...variables, categoryId: 'Q29sbGVjdGlvbjo0' }
      query = Query.CollectionOne
    }

    const { data }: GraphQLFetcherResult = await fetch(
      query,
      { variables },
      {
        headers: {
          ...(locale && {
            'Accept-Language': locale,
          }),
        },
      }
    )

    if (featured) {
      const products =
        data?.collection.products?.edges?.map(
          ({ node: p }: ProductCountableEdge) => normalizeProduct(p)
        ) ?? []

      return {
        products,
      }
    } else {
      const products =
        data?.products?.edges?.map(({ node: p }: ProductCountableEdge) =>
          normalizeProduct(p)
        ) ?? []

      return {
        products,
      }
    }
  }

  return getAllProducts
}
