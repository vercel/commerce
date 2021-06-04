import type { OperationContext } from '@commerce/api/operations'
import { Product } from '@commerce/types/product'

import { ProductCountableEdge } from '../../schema'
import type { Provider, SaleorConfig } from '..'
import { normalizeProduct } from '../../utils'

import * as Query from '../../utils/queries'

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
  }: {
    query?: string
    variables?: any 
    config?: Partial<SaleorConfig>
    preview?: boolean
    featured?: boolean
  } = {}): Promise<ReturnType> {
    const { fetch, locale } = commerce.getConfig(config)

    const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )

    const products = data.products?.edges?.map(({ node: p }: ProductCountableEdge) => normalizeProduct(p)) ?? []

    return {
      products,
    }
  }

  return getAllProducts
}
