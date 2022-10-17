import type {
  Product,
  ProductPrice,
  ProductVariant,
} from '@vercel/commerce/types/product'
import type { Image } from '@vercel/commerce/types/common'
import type { ProductAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships'
import { jsonApi } from '@spree/storefront-api-v2-sdk'
import { JsonApiDocument } from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import { requireConfigValue } from '../../isomorphic-config'
import createGetAbsoluteImageUrl from '../create-get-absolute-image-url'
import expandOptions from '../expand-options'
import getMediaGallery from '../get-media-gallery'
import getProductPath from '../get-product-path'
import MissingPrimaryVariantError from '../../errors/MissingPrimaryVariantError'
import MissingOptionValueError from '../../errors/MissingOptionValueError'
import type {
  ExpandedProductOption,
  SpreeSdkResponse,
  VariantAttr,
} from '../../types'

const placeholderImage = requireConfigValue('productPlaceholderImageUrl') as
  | string
  | false

const imagesOptionFilter = requireConfigValue('imagesOptionFilter') as
  | string
  | false

const normalizeProduct = (
  spreeSuccessResponse: SpreeSdkResponse,
  spreeProduct: ProductAttr
): Product => {
  const spreePrimaryVariant =
    jsonApi.findSingleRelationshipDocument<VariantAttr>(
      spreeSuccessResponse,
      spreeProduct,
      'primary_variant'
    )

  if (spreePrimaryVariant === null) {
    throw new MissingPrimaryVariantError(
      `Couldn't find primary variant for product with id ${spreeProduct.id}.`
    )
  }

  const sku = spreePrimaryVariant.attributes.sku

  const price: ProductPrice = {
    value: parseFloat(spreeProduct.attributes.price),
    currencyCode: spreeProduct.attributes.currency,
  }

  const hasNonMasterVariants =
    (spreeProduct.relationships.variants.data as RelationType[]).length > 1

  const showOptions =
    (requireConfigValue('showSingleVariantOptions') as boolean) ||
    hasNonMasterVariants

  let options: ExpandedProductOption[] = []

  const spreeVariantRecords = jsonApi.findRelationshipDocuments(
    spreeSuccessResponse,
    spreeProduct,
    'variants'
  )

  // Use variants with option values if available. Fall back to
  // Spree primary_variant if no explicit variants are present.
  const spreeOptionsVariantsOrPrimary =
    spreeVariantRecords.length === 0
      ? [spreePrimaryVariant]
      : spreeVariantRecords

  const variants: ProductVariant[] = spreeOptionsVariantsOrPrimary.map(
    (spreeVariantRecord) => {
      let variantOptions: ExpandedProductOption[] = []

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

          options = expandOptions(
            spreeSuccessResponse,
            spreeOptionValue,
            options
          )
        })
      }

      return {
        id: spreeVariantRecord.id,
        sku: spreeVariantRecord.attributes.sku || spreeVariantRecord.id,
        options: variantOptions,
      }
    }
  )

  const spreePrimaryVariantImageRecords = jsonApi.findRelationshipDocuments(
    spreeSuccessResponse,
    spreePrimaryVariant,
    'images'
  )

  let spreeVariantImageRecords: JsonApiDocument[]

  if (imagesOptionFilter === false) {
    spreeVariantImageRecords = spreeVariantRecords.reduce<JsonApiDocument[]>(
      (accumulatedImageRecords, spreeVariantRecord) => {
        return [
          ...accumulatedImageRecords,
          ...jsonApi.findRelationshipDocuments(
            spreeSuccessResponse,
            spreeVariantRecord,
            'images'
          ),
        ]
      },
      []
    )
  } else {
    const spreeOptionTypes = jsonApi.findRelationshipDocuments(
      spreeSuccessResponse,
      spreeProduct,
      'option_types'
    )

    const imagesFilterOptionType = spreeOptionTypes.find(
      (spreeOptionType) =>
        spreeOptionType.attributes.name === imagesOptionFilter
    )

    if (!imagesFilterOptionType) {
      console.warn(
        `Couldn't find option type having name ${imagesOptionFilter} for product with id ${spreeProduct.id}.` +
          ' Showing no images for this product.'
      )

      spreeVariantImageRecords = []
    } else {
      const imagesOptionTypeFilterId = imagesFilterOptionType.id
      const includedOptionValuesImagesIds: string[] = []

      spreeVariantImageRecords = spreeVariantRecords.reduce<JsonApiDocument[]>(
        (accumulatedImageRecords, spreeVariantRecord) => {
          const spreeVariantOptionValuesIdentifiers: RelationType[] =
            spreeVariantRecord.relationships.option_values.data

          const spreeOptionValueOfFilterTypeIdentifier =
            spreeVariantOptionValuesIdentifiers.find(
              (spreeVariantOptionValuesIdentifier: RelationType) =>
                imagesFilterOptionType.relationships.option_values.data.some(
                  (filterOptionTypeValueIdentifier: RelationType) =>
                    filterOptionTypeValueIdentifier.id ===
                    spreeVariantOptionValuesIdentifier.id
                )
            )

          if (!spreeOptionValueOfFilterTypeIdentifier) {
            throw new MissingOptionValueError(
              `Couldn't find option value related to option type with id ${imagesOptionTypeFilterId}.`
            )
          }

          const optionValueImagesAlreadyIncluded =
            includedOptionValuesImagesIds.includes(
              spreeOptionValueOfFilterTypeIdentifier.id
            )

          if (optionValueImagesAlreadyIncluded) {
            return accumulatedImageRecords
          }

          includedOptionValuesImagesIds.push(
            spreeOptionValueOfFilterTypeIdentifier.id
          )

          return [
            ...accumulatedImageRecords,
            ...jsonApi.findRelationshipDocuments(
              spreeSuccessResponse,
              spreeVariantRecord,
              'images'
            ),
          ]
        },
        []
      )
    }
  }

  const spreeImageRecords = [
    ...spreePrimaryVariantImageRecords,
    ...spreeVariantImageRecords,
  ]

  const productImages = getMediaGallery(
    spreeImageRecords,
    createGetAbsoluteImageUrl(requireConfigValue('imageHost') as string)
  )

  const images: Image[] =
    productImages.length === 0
      ? placeholderImage === false
        ? []
        : [{ url: placeholderImage }]
      : productImages

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
