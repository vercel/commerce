import type { Product } from '@commerce/types/product'
import type { GetAllProductsOperation } from '@commerce/types/product'
import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { IProducts } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { SpreeApiConfig, SpreeApiProvider } from '../index'
import type { SpreeSdkVariables } from 'framework/spree/types'
import normalizeProduct from 'framework/spree/utils/normalizeProduct'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getAllProducts<T extends GetAllProductsOperation>(opts?: {
    variables?: T['variables']
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>(
    opts: {
      variables?: T['variables']
      config?: Partial<SpreeApiConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProducts<T extends GetAllProductsOperation>({
    variables: getAllProductsVariables = {},
    config: userConfig,
  }: {
    variables?: T['variables']
    config?: Partial<SpreeApiConfig>
  } = {}): Promise<{ products: Product[] }> {
    console.info(
      'getAllProducts called. Configuration: ',
      'getAllProductsVariables: ',
      getAllProductsVariables,
      'config: ',
      userConfig
    )

    const first = getAllProductsVariables.first
    const variables: SpreeSdkVariables = {
      methodPath: 'products.list',
      arguments: [
        {
          include: 'variants,images,option_types,variants.option_values',
          per_page: first,
        },
      ],
    }

    const config = commerce.getConfig(userConfig)
    const { fetch: apiFetch } = config // TODO: Send config.locale to Spree.

    const {
      data: { data: spreeSuccessResponse },
    } = await apiFetch<{ data: IProducts }>('__UNUSED__', { variables })

    const normalizedProducts: Product[] = spreeSuccessResponse.data.map(
      (spreeProduct) => normalizeProduct(spreeSuccessResponse, spreeProduct)
    )

    return { products: normalizedProducts }
  }

  return getAllProducts
}
