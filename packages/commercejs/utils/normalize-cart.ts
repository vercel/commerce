import type {
  Cart,
  LineItem,
  CommercejsCart,
  CommercejsLineItem,
} from '../types/cart'

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
    selected_options,
  } = commercejsLineItem
  return {
    id,
    variantId: variant?.id ?? '',
    productId: product_id,
    name: product_name,
    quantity,
    discounts: [],
    path: permalink,
    options: selected_options?.map(({ group_name, option_name }) => ({
      name: group_name,
      value: option_name,
    })),
    variant: {
      id: variant?.id ?? id,
      sku: variant?.sku ?? sku,
      name: product_name,
      requiresShipping: false,
      price: variant?.price?.raw ?? price.raw,
      listPrice: variant?.price?.raw ?? price.raw,
      image: {
        url: image?.url,
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
    createdAt: new Date(created * 1000).toISOString(),
    currency: {
      code: currency.code,
    },
    taxesIncluded: false,
    lineItems: line_items.map((item) => {
      return normalizeLineItem(item as CommercejsLineItemType)
    }),
    lineItemsSubtotalPrice: rawPrice,
    subtotalPrice: rawPrice,
    totalPrice: rawPrice,
  }
}
