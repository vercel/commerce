import type {
  Cart,
  LineItem,
  ProductVariant,
  SelectedOption,
} from '@vercel/commerce/types/cart'
import MissingLineItemVariantError from '../../errors/MissingLineItemVariantError'
import { requireConfigValue } from '../../isomorphic-config'
import type { OrderAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Order'
import type { ProductAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Product'
import type { Image } from '@vercel/commerce/types/common'
import { jsonApi } from '@spree/storefront-api-v2-sdk'
import createGetAbsoluteImageUrl from '../create-get-absolute-image-url'
import getMediaGallery from '../get-media-gallery'
import type {
  LineItemAttr,
  OptionTypeAttr,
  SpreeProductImage,
  SpreeSdkResponse,
  VariantAttr,
} from '../../types'

const placeholderImage = requireConfigValue('lineItemPlaceholderImageUrl') as
  | string
  | false

const isColorProductOption = (productOptionType: OptionTypeAttr) => {
  return productOptionType.attributes.presentation === 'Color'
}

const normalizeVariant = (
  spreeSuccessResponse: SpreeSdkResponse,
  spreeVariant: VariantAttr
): ProductVariant => {
  const spreeProduct = jsonApi.findSingleRelationshipDocument<ProductAttr>(
    spreeSuccessResponse,
    spreeVariant,
    'product'
  )

  if (spreeProduct === null) {
    throw new MissingLineItemVariantError(
      `Couldn't find product for variant with id ${spreeVariant.id}.`
    )
  }

  const spreeVariantImageRecords =
    jsonApi.findRelationshipDocuments<SpreeProductImage>(
      spreeSuccessResponse,
      spreeVariant,
      'images'
    )

  let lineItemImage

  const variantImage = getMediaGallery(
    spreeVariantImageRecords,
    createGetAbsoluteImageUrl(requireConfigValue('imageHost') as string)
  )[0]

  if (variantImage) {
    lineItemImage = variantImage
  } else {
    const spreeProductImageRecords =
      jsonApi.findRelationshipDocuments<SpreeProductImage>(
        spreeSuccessResponse,
        spreeProduct,
        'images'
      )

    const productImage = getMediaGallery(
      spreeProductImageRecords,
      createGetAbsoluteImageUrl(requireConfigValue('imageHost') as string)
    )[0]

    lineItemImage = productImage
  }

  const image: Image =
    lineItemImage ??
    (placeholderImage === false ? undefined : { url: placeholderImage })

  return {
    id: spreeVariant.id,
    sku: spreeVariant.attributes.sku,
    name: spreeProduct.attributes.name,
    requiresShipping: true,
    price: parseFloat(spreeVariant.attributes.price),
    listPrice: parseFloat(spreeVariant.attributes.price),
    image,
    availableForSale: spreeVariant.attributes.purchasable,
    ...(spreeVariant.attributes.weight === '0.0'
      ? {}
      : {
          weight: {
            value: parseFloat(spreeVariant.attributes.weight),
            unit: 'KILOGRAMS',
          },
        }),
    // TODO: Add height, width and depth when Measurement type allows distance measurements.
  }
}

const normalizeLineItem = (
  spreeSuccessResponse: SpreeSdkResponse,
  spreeLineItem: LineItemAttr
): LineItem => {
  const variant = jsonApi.findSingleRelationshipDocument<VariantAttr>(
    spreeSuccessResponse,
    spreeLineItem,
    'variant'
  )

  if (variant === null) {
    throw new MissingLineItemVariantError(
      `Couldn't find variant for line item with id ${spreeLineItem.id}.`
    )
  }

  const product = jsonApi.findSingleRelationshipDocument<ProductAttr>(
    spreeSuccessResponse,
    variant,
    'product'
  )

  if (product === null) {
    throw new MissingLineItemVariantError(
      `Couldn't find product for variant with id ${variant.id}.`
    )
  }

  // CartItem.tsx expects path without a '/' prefix unlike pages/product/[slug].tsx and others.
  const path = `${product.attributes.slug}`

  const spreeOptionValues = jsonApi.findRelationshipDocuments(
    spreeSuccessResponse,
    variant,
    'option_values'
  )

  const options: SelectedOption[] = spreeOptionValues.map(
    (spreeOptionValue) => {
      const spreeOptionType =
        jsonApi.findSingleRelationshipDocument<OptionTypeAttr>(
          spreeSuccessResponse,
          spreeOptionValue,
          'option_type'
        )

      if (spreeOptionType === null) {
        throw new MissingLineItemVariantError(
          `Couldn't find option type of option value with id ${spreeOptionValue.id}.`
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
    productId: product.id,
    name: spreeLineItem.attributes.name,
    quantity: spreeLineItem.attributes.quantity,
    discounts: [], // TODO: Implement when the template starts displaying them.
    path,
    variant: normalizeVariant(spreeSuccessResponse, variant),
    options,
  }
}

const normalizeCart = (
  spreeSuccessResponse: SpreeSdkResponse,
  spreeCart: OrderAttr
): Cart => {
  const lineItems = jsonApi
    .findRelationshipDocuments<LineItemAttr>(
      spreeSuccessResponse,
      spreeCart,
      'line_items'
    )
    .map((lineItem) => normalizeLineItem(spreeSuccessResponse, lineItem))

  return {
    id: spreeCart.id,
    createdAt: spreeCart.attributes.created_at.toString(),
    currency: { code: spreeCart.attributes.currency },
    taxesIncluded: true,
    lineItems,
    lineItemsSubtotalPrice: parseFloat(spreeCart.attributes.item_total),
    subtotalPrice: parseFloat(spreeCart.attributes.item_total),
    totalPrice: parseFloat(spreeCart.attributes.total),
    customerId: spreeCart.attributes.token,
    email: spreeCart.attributes.email,
    discounts: [], // TODO: Implement when the template starts displaying them.
  }
}

export { normalizeLineItem }

export default normalizeCart
