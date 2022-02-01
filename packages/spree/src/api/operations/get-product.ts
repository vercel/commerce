import type { SpreeApiConfig, SpreeApiProvider } from '../index'
import type { GetProductOperation } from '@vercel/commerce/types/product'
import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { IProduct } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { SpreeSdkVariables } from '../../types'
import MissingSlugVariableError from '../../errors/MissingSlugVariableError'
import normalizeProduct from '../../utils/normalizations/normalize-product'
import { requireConfigValue } from '../../isomorphic-config'

const imagesSize = requireConfigValue('imagesSize') as string
const imagesQuality = requireConfigValue('imagesQuality') as number

export default function getProductOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getProduct<T extends GetProductOperation>(opts: {
    variables: T['variables']
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<SpreeApiConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables: getProductVariables,
    config: userConfig,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']> {
    console.log(
      'getProduct called. Configuration: ',
      'getProductVariables: ',
      getProductVariables,
      'config: ',
      userConfig
    )

    if (!getProductVariables?.slug) {
      throw new MissingSlugVariableError()
    }

    const variables: SpreeSdkVariables = {
      methodPath: 'products.show',
      arguments: [
        getProductVariables.slug,
        {},
        {
          include:
            'primary_variant,variants,images,option_types,variants.option_values',
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
      IProduct,
      SpreeSdkVariables
    >('__UNUSED__', {
      variables,
    })

    return {
      product: normalizeProduct(
        spreeSuccessResponse,
        spreeSuccessResponse.data
      ),
    }
  }

  return getProduct
}
