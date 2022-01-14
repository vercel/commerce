import type { OperationContext } from '@commerce/api/operations'
import { ProductCountableEdge } from '../../schema'
import type { Provider, SaleorConfig } from '..'

import { getAllProductsPathsQuery } from '../../utils/queries'
import fetchAllProducts from '../utils/fetch-all-products'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({ commerce }: OperationContext<Provider>) {
  async function getAllProductPaths({
    query,
    config,
    variables,
  }: {
    query?: string
    config?: SaleorConfig
    variables?: any
  } = {}): Promise<GetAllProductPathsResult> {
    config = commerce.getConfig(config)

    const products = await fetchAllProducts({
      config,
      query: getAllProductsPathsQuery,
      variables,
    })

    return {
      products: products?.map(({ node: { slug } }: ProductCountableEdge) => ({
        path: `/${slug}`,
      })),
    }
  }

  return getAllProductPaths
}
