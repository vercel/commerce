import type {
  Product,
  ProductOption,
  ProductOptionValues,
  ProductPrice,
  ProductVariant,
} from '@commerce/types/product'
import type { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { IProducts } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships'
import type { SpreeApiConfig, SpreeApiProvider } from '../index'
import type { SpreeSdkVariables } from 'framework/spree/types'
import { findIncluded, findIncludedOfType } from 'framework/spree/utils/jsonApi'
import getMediaGallery from 'framework/spree/utils/getMediaGallery'
import createGetAbsoluteImageUrl from 'framework/spree/utils/createGetAbsoluteImageUrl'
import { requireConfigValue } from 'framework/spree/isomorphicConfig'
import SpreeResponseContentError from 'framework/spree/errors/SpreeResponseContentError'
import expandOptions from 'framework/spree/utils/expandOptions'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    variables: getAllProductsVariables = {},
    config: userConfig,
  }: {
    variables?: T['variables']
    config?: Partial<SpreeApiConfig>
  } = {}): Promise<{ products: Product[] | any[] }> {
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

    const { data: spreeSuccessResponse } = await apiFetch<IProducts>(
      '__UNUSED__',
      { variables }
    )

    const normalizedProducts: Product[] = spreeSuccessResponse.data.map(
      (spreeProduct) => {
        const spreeImageRecords = findIncludedOfType(
          spreeSuccessResponse,
          spreeProduct,
          'images'
        )

        const images = getMediaGallery(
          spreeImageRecords,
          createGetAbsoluteImageUrl(requireConfigValue('spreeImageHost'))
        )

        const price: ProductPrice = {
          value: parseFloat(spreeProduct.attributes.price),
          currencyCode: spreeProduct.attributes.currency,
        }

        // TODO: Add sku to product object equal to master SKU from Spree.
        // Currently, the Spree API doesn't return it.

        const hasNonMasterVariants =
          (spreeProduct.relationships.variants.data as RelationType[]).length >
          0

        let variants: ProductVariant[]
        let options: ProductOption[] = []

        if (hasNonMasterVariants) {
          const spreeVariantRecords = findIncludedOfType(
            spreeSuccessResponse,
            spreeProduct,
            'variants'
          )

          variants = spreeVariantRecords.map((spreeVariantRecord) => {
            const spreeOptionValues = findIncludedOfType(
              spreeSuccessResponse,
              spreeVariantRecord,
              'option_values'
            )

            let variantOptions: ProductOption[] = []

            // Only include options which are used by variants.

            spreeOptionValues.forEach((spreeOptionValue) => {
              variantOptions = expandOptions(
                spreeSuccessResponse,
                spreeOptionValue,
                variantOptions
              )

              options = expandOptions(
                spreeSuccessResponse,
                spreeOptionValue,
                options
              )
            })

            return {
              id: spreeVariantRecord.id,
              options: variantOptions,
            }
          })
        } else {
          variants = []
        }

        const slug = spreeProduct.attributes.slug
        const path = `/${spreeProduct.attributes.slug}`

        return {
          id: spreeProduct.id,
          name: spreeProduct.attributes.name,
          description: spreeProduct.attributes.description,
          images,
          variants,
          options,
          price,
          slug,
          path,
        }
      }
    )

    return { products: normalizedProducts }
  }

  return getAllProducts
}
