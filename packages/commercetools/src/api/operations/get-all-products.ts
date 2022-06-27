import { normalizeProduct } from '../../utils/normalize'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import { Provider, CommercetoolsConfig } from '..'
import { OperationContext } from '@vercel/commerce/api/operations'
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk'

export type ProductVariables = { first?: number }

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config: cfg,
    variables = { first: 250 },
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const products = await config.sdkFetch<
      ClientResponse<ProductProjectionPagedQueryResponse>
    >({
      query: 'productProjections',
      method: 'get',
      variables: {
        limit: variables.first,
      },
    })

    return {
      products: products.body
        ? products.body.results.map((product) =>
            normalizeProduct(product, config)
          )
        : [],
    }
  }

  return getAllProducts
}
