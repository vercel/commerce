import type { Cart, CartItemBody, LineItem } from '@vercel/commerce/types/cart'
import type {
  Cart as CartRequest,
  CartItem,
  CartAddItemRequest,
} from '@vnda/headless-framework'

import { getLastItem } from './product'

export const mapCommerceToRawRequest = ({
  quantity,
  variantId,
}: CartItemBody): CartAddItemRequest => ({
  quantity: quantity || 1,
  sku: variantId,
})

export const mapItemRawToCommerceResponse = ({
  id,
  quantity,
  productId,
  productName,
  productUrl,
  variantName,
  variantSku,
  variantPrice,
  imageUrl,
  availableQuantity,
  variantProperties,
}: CartItem): LineItem => ({
  id: id.toString(),
  variantId: variantSku,
  productId: productId.toString(),
  name: productName,
  quantity: quantity,
  discounts: [],
  path: getLastItem(productUrl),
  variant: {
    id: variantSku,
    sku: variantSku,
    name: variantName,
    requiresShipping: false,
    price: variantPrice,
    listPrice: variantPrice,
    isInStock: availableQuantity > 0,
    availableForSale: availableQuantity > 0,
    image: {
      url: imageUrl || 'http://localhost:3000/',
    },
  },
  options: Object.values(variantProperties).map(({ name, value }) => ({
    name: name === 'Cor' ? 'Color' : name,
    value,
  })),
})

export const mapRawToCommerceResponse = ({
  id,
  clientId,
  discountPrice,
  subtotal,
  total,
  items,
}: CartRequest): Cart => ({
  id: id?.toString(),
  customerId: clientId?.toString(),
  createdAt: '',
  currency: {
    code: 'BRL',
  },
  taxesIncluded: false,
  lineItems: items?.map(mapItemRawToCommerceResponse),
  lineItemsSubtotalPrice: 0,
  subtotalPrice: subtotal,
  totalPrice: total,
  discounts: [{ value: discountPrice }],
})
