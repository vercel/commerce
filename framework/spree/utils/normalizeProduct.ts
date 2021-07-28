import type {
  ProductOption,
  ProductPrice,
  ProductVariant,
} from '@commerce/types/product'
import type {
  JsonApiListResponse,
  JsonApiResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import type { ProductAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships'
import { requireConfigValue } from '../isomorphicConfig'
import createGetAbsoluteImageUrl from './createGetAbsoluteImageUrl'
import expandOptions from './expandOptions'
import getMediaGallery from './getMediaGallery'
import { findIncludedOfType } from './jsonApi'

const normalizeProduct = (
  spreeSuccessResponse: JsonApiResponse | JsonApiListResponse,
  spreeProduct: ProductAttr
) => {
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
    (spreeProduct.relationships.variants.data as RelationType[]).length > 0

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

        options = expandOptions(spreeSuccessResponse, spreeOptionValue, options)
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

export default normalizeProduct
