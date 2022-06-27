import { CommercetoolsConfig, Provider } from '..'
import { OperationContext } from '@vercel/commerce/api/operations'
import { GetAllProductPathsOperation } from '@vercel/commerce/types/product'
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk'
import { getLocalizedString } from '../../utils'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: CommercetoolsConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const response = await config.fetcher<
      ClientResponse<ProductProjectionPagedQueryResponse>
    >({
      query: 'productProjections',
      method: 'get',
    })

    return {
      products: response.body.results?.map((product) => ({
        path: `/${getLocalizedString(product.slug, config.locale)}`,
      })),
    }
  }

  return getAllProductPaths
}
