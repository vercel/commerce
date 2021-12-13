import type { Product } from '@commerce/types/product'
import type { GetAllProductsOperation } from '@commerce/types/product'
import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { IProducts } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { SpreeApiConfig, SpreeApiProvider } from '../index'
import type { SpreeSdkVariables } from '../../types'
import normalizeProduct from '../../utils/normalizations/normalize-product'
import { requireConfigValue } from '../../isomorphic-config'

const imagesSize = requireConfigValue('imagesSize') as string
const imagesQuality = requireConfigValue('imagesQuality') as number

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

    const defaultProductsTaxonomyId = requireConfigValue(
      'allProductsTaxonomyId'
    ) as string | false

    const first = getAllProductsVariables.first
    const filter = !defaultProductsTaxonomyId
      ? {}
      : { filter: { taxons: defaultProductsTaxonomyId }, sort: '-updated_at' }

    const variables: SpreeSdkVariables = {
      methodPath: 'products.list',
      arguments: [
        {},
        {
          include:
            'primary_variant,variants,images,option_types,variants.option_values',
          per_page: first,
          ...filter,
          image_transformation: {
            quality: imagesQuality,
            size: imagesSize,
          },
        },
      ],
    }

    const config = commerce.getConfig(userConfig)
    const { fetch: apiFetch } = config // TODO: Send config.locale to Spree.

    const { data: spreeSuccessResponse } = await apiFetch<
      IProducts,
      SpreeSdkVariables
    >('__UNUSED__', {
      variables,
    })

    const normalizedProducts: Product[] = spreeSuccessResponse.data.map(
      (spreeProduct) => normalizeProduct(spreeSuccessResponse, spreeProduct)
    )

    return { products: normalizedProducts }
  }

  return getAllProducts
}
