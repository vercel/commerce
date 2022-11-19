import type { Cart } from '@vercel/commerce/types/cart'
import type { OrdercloudCart, OrdercloudLineItem } from '../../types/cart'

export function formatCart(
  cart: OrdercloudCart,
  lineItems: OrdercloudLineItem[]
): Cart {
  return {
    id: cart.ID,
    customerId: cart.FromUserID,
    email: cart.FromUser.Email,
    createdAt: cart.DateCreated,
    currency: {
      code: cart.FromUser?.xp?.currency ?? 'USD',
    },
    taxesIncluded: cart.TaxCost === 0,
    lineItems: lineItems.map((lineItem) => ({
      id: lineItem.ID,
      variantId: lineItem.Variant ? String(lineItem.Variant.ID) : '',
      productId: lineItem.ProductID,
      name: lineItem.Product.Name,
      quantity: lineItem.Quantity,
      discounts: [],
      path: `/product/${lineItem.ProductID}`,
      variant: {
        id: lineItem.Variant ? String(lineItem.Variant.ID) : '',
        sku: lineItem.ID,
        name: lineItem.Product.Name,
        image: {
          url: lineItem.Product.xp?.Images?.[0]?.url,
        },
        requiresShipping: Boolean(lineItem.ShippingAddress),
        price: lineItem.UnitPrice,
        listPrice: lineItem.UnitPrice,
      },
    })),
    lineItemsSubtotalPrice: cart.Subtotal,
    subtotalPrice: cart.Subtotal,
    totalPrice: cart.Total,
    discounts: [],
  }
}
