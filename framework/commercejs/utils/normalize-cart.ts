import type { Cart as CommercejsCart } from '@chec/commerce.js/types/cart'
import type { LineItem as CommercejsLineItem } from '@chec/commerce.js/types/line-item'
import type { Cart, LineItem } from '@commerce/types/cart'

type CommercejsLineItemType = CommercejsLineItem & { image: { url: string } }

const normalizeLineItem = (
  commercejsLineItem: CommercejsLineItemType
): LineItem => {
  const {
    id,
    sku,
    quantity,
    price,
    product_id,
    product_name,
    permalink,
    variant,
    image,
  } = commercejsLineItem
  return {
    id,
    variantId: '',
    productId: product_id,
    name: product_name,
    quantity,
    discounts: [],
    path: permalink,
    variant: {
      id: variant?.id || id,
      sku: variant?.sku || sku,
      name: product_name,
      requiresShipping: false,
      price: variant?.price?.raw || price.raw,
      listPrice: variant?.price?.raw || price.raw,
      image: {
        url: image.url,
      },
    },
  }
}

export const normalizeCart = (commercejsCart: CommercejsCart): Cart => {
  const {
    id,
    created,
    subtotal: { raw: rawPrice },
    currency,
    line_items,
  } = commercejsCart

  return {
    id,
    createdAt: new Date(created * 1000).toString(),
    currency: {
      code: currency.code,
    },
    taxesIncluded: true,
    lineItems: line_items.map((item) => {
      return normalizeLineItem(item as CommercejsLineItemType)
    }),
    lineItemsSubtotalPrice: rawPrice,
    subtotalPrice: rawPrice,
    totalPrice: rawPrice,
    discounts: undefined,
  }
}
