import type {
  Product,
  ProductImage,
  ProductOption,
  ProductPrice,
  ProductVariant,
} from '@commerce/types/product'
import type { ProductAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships'
import { requireConfigValue } from '../isomorphic-config'
import createGetAbsoluteImageUrl from './create-get-absolute-image-url'
import expandOptions from './expand-options'
import getMediaGallery from './get-media-gallery'
import getProductPath from './get-product-path'
import MissingPrimaryVariantError from '../errors/MissingPrimaryVariantError'
import type { SpreeSdkResponse, VariantAttr } from '@framework/types'
import { jsonApi } from '@spree/storefront-api-v2-sdk'

const placeholderImage = requireConfigValue('productPlaceholderImageUrl') as
  | string
  | false

const normalizeProduct = (
  spreeSuccessResponse: SpreeSdkResponse,
  spreeProduct: ProductAttr
): Product => {
  const primaryVariant = jsonApi.findSingleRelationshipDocument<VariantAttr>(
    spreeSuccessResponse,
    spreeProduct,
    'primary_variant'
  )

  if (primaryVariant === null) {
    throw new MissingPrimaryVariantError(
      `Couldn't find primary variant for product with id ${spreeProduct.id}.`
    )
  }

  const sku = primaryVariant.attributes.sku

  const spreeImageRecords = jsonApi.findRelationshipDocuments(
    spreeSuccessResponse,
    spreeProduct,
    'images'
  )

  const productImages = getMediaGallery(
    spreeImageRecords,
    createGetAbsoluteImageUrl(requireConfigValue('imageHost') as string)
  )

  const images: ProductImage[] =
    productImages.length === 0
      ? placeholderImage === false
        ? []
        : [{ url: placeholderImage }]
      : productImages

  const price: ProductPrice = {
    value: parseFloat(spreeProduct.attributes.price),
    currencyCode: spreeProduct.attributes.currency,
  }

  const hasNonMasterVariants =
    (spreeProduct.relationships.variants.data as RelationType[]).length > 1

  const showOptions =
    (requireConfigValue('showSingleVariantOptions') as boolean) ||
    hasNonMasterVariants

  let variants: ProductVariant[]
  let options: ProductOption[] = []

  const spreeVariantRecords = jsonApi.findRelationshipDocuments(
    spreeSuccessResponse,
    spreeProduct,
    'variants'
  )

  variants = spreeVariantRecords.map((spreeVariantRecord) => {
    let variantOptions: ProductOption[] = []

    if (showOptions) {
      const spreeOptionValues = jsonApi.findRelationshipDocuments(
        spreeSuccessResponse,
        spreeVariantRecord,
        'option_values'
      )

      // Only include options which are used by variants.

      spreeOptionValues.forEach((spreeOptionValue) => {
        variantOptions = expandOptions(
          spreeSuccessResponse,
          spreeOptionValue,
          variantOptions
        )

        options = expandOptions(spreeSuccessResponse, spreeOptionValue, options)
      })
    }

    return {
      id: spreeVariantRecord.id,
      options: variantOptions,
    }
  })

  const slug = spreeProduct.attributes.slug
  const path = getProductPath(spreeProduct)

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
    sku,
  }
}

export default normalizeProduct
