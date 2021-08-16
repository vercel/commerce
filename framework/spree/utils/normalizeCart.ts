import type {
  Cart,
  LineItem,
  ProductVariant,
  SelectedOption,
} from '@commerce/types/cart'
import MissingLineItemVariantError from '@framework/errors/MissingLineItemVariantError'
import { requireConfigValue } from '@framework/isomorphicConfig'
import type {
  JsonApiDocument,
  JsonApiListResponse,
  JsonApiSingleResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import type { OrderAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import { ProductAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { RelationType } from '@spree/storefront-api-v2-sdk/types/interfaces/Relationships'
import createGetAbsoluteImageUrl from './createGetAbsoluteImageUrl'
import getMediaGallery from './getMediaGallery'
import { findIncluded, findIncludedOfType } from './jsonApi'

const isColorProductOption = (productOptionType: any) => {
  // TODO: Fix type and merge with isColorProductOption in framework/spree/utils/expandOptions.ts
  return productOptionType.attributes.presentation === 'Color'
}

const normalizeVariant = (
  spreeSuccessResponse: JsonApiSingleResponse | JsonApiListResponse,
  spreeVariant: JsonApiDocument
): ProductVariant => {
  const productIdentifier = spreeVariant.relationships.product
    .data as RelationType
  const spreeProduct = findIncluded<ProductAttr>(
    spreeSuccessResponse,
    productIdentifier.type,
    productIdentifier.id
  )

  if (spreeProduct === null) {
    throw new MissingLineItemVariantError(
      `Couldn't find product with id ${productIdentifier.id}.`
    )
  }

  const spreeVariantImageRecords = findIncludedOfType(
    spreeSuccessResponse,
    spreeVariant,
    'images'
  )

  let lineItemImage

  const variantImage = getMediaGallery(
    spreeVariantImageRecords,
    createGetAbsoluteImageUrl(requireConfigValue('spreeImageHost') as string)
  )[0]

  if (variantImage) {
    lineItemImage = variantImage
  } else {
    const spreeProductImageRecords = findIncludedOfType(
      spreeSuccessResponse,
      spreeProduct,
      'images'
    )

    const productImage = getMediaGallery(
      spreeProductImageRecords,
      createGetAbsoluteImageUrl(requireConfigValue('spreeImageHost') as string)
    )[0]

    lineItemImage = productImage
  }

  return {
    id: spreeVariant.id,
    sku: spreeVariant.attributes.sku,
    name: spreeProduct.attributes.name,
    requiresShipping: true,
    price: parseFloat(spreeVariant.attributes.price),
    listPrice: parseFloat(spreeVariant.attributes.price),
    image: lineItemImage,
    isInStock: spreeVariant.attributes.in_stock,
    availableForSale: spreeVariant.attributes.purchasable,
    weight: spreeVariant.attributes.weight,
    height: spreeVariant.attributes.height,
    width: spreeVariant.attributes.width,
    depth: spreeVariant.attributes.depth,
  }
}

const normalizeLineItem = (
  spreeSuccessResponse: JsonApiSingleResponse | JsonApiListResponse,
  spreeLineItem: JsonApiDocument
): LineItem => {
  //TODO: Replace JsonApiDocument type in spreeLineItem with more specific, new Spree line item item
  const variantIdentifier = spreeLineItem.relationships.variant
    .data as RelationType
  const variant = findIncluded(
    spreeSuccessResponse,
    variantIdentifier.type,
    variantIdentifier.id
  )

  if (variant === null) {
    throw new MissingLineItemVariantError(
      `Couldn't find variant with id ${variantIdentifier.id}.`
    )
  }

  const productIdentifier = variant.relationships.product.data as RelationType
  const product = findIncluded<ProductAttr>(
    spreeSuccessResponse,
    productIdentifier.type,
    productIdentifier.id
  )

  if (product === null) {
    throw new MissingLineItemVariantError(
      `Couldn't find product with id ${productIdentifier.id}.`
    )
  }

  const path = `/${product.attributes.slug}`

  const spreeOptionValues = findIncludedOfType(
    spreeSuccessResponse,
    variant,
    'option_values'
  )

  const options: SelectedOption[] = spreeOptionValues.map(
    (spreeOptionValue) => {
      const spreeOptionTypeIdentifier = spreeOptionValue.relationships
        .option_type.data as RelationType

      const spreeOptionType = findIncluded(
        spreeSuccessResponse,
        spreeOptionTypeIdentifier.type,
        spreeOptionTypeIdentifier.id
      )

      if (spreeOptionType === null) {
        throw new MissingLineItemVariantError(
          `Couldn't find option type with id ${spreeOptionTypeIdentifier.id}.`
        )
      }

      const label = isColorProductOption(spreeOptionType)
        ? spreeOptionValue.attributes.name
        : spreeOptionValue.attributes.presentation

      return {
        id: spreeOptionValue.id,
        name: spreeOptionType.attributes.presentation,
        value: label,
      }
    }
  )

  return {
    id: spreeLineItem.id,
    variantId: variant.id,
    productId: productIdentifier.id,
    name: spreeLineItem.attributes.name,
    quantity: spreeLineItem.attributes.quantity,
    discounts: [], // TODO: Retrieve from Spree
    path,
    variant: normalizeVariant(spreeSuccessResponse, variant),
    options,
  }
}

const normalizeCart = (
  spreeSuccessResponse: JsonApiSingleResponse | JsonApiListResponse,
  spreeCart: OrderAttr
): Cart => {
  const lineItems = findIncludedOfType(
    spreeSuccessResponse,
    spreeCart,
    'line_items'
  ).map((lineItem) => normalizeLineItem(spreeSuccessResponse, lineItem))

  return {
    id: spreeCart.id,
    createdAt: spreeCart.attributes.created_at.toString(),
    currency: { code: spreeCart.attributes.currency },
    taxesIncluded: true,
    lineItems,
    lineItemsSubtotalPrice: parseFloat(spreeCart.attributes.item_total),
    // TODO: We need a value from Spree which includes item total and discounts in one value for subtotalPrice.
    subtotalPrice: parseFloat(spreeCart.attributes.item_total),
    totalPrice: parseFloat(spreeCart.attributes.total),
    customerId: spreeCart.attributes.token,
    email: spreeCart.attributes.email,
    discounts: [],
    // discounts: [{value: number}] // TODO: Retrieve from Spree
  }
}

export { normalizeLineItem }

export default normalizeCart
