import { Cart, LineItem, ProductVariant } from '../../types/cart'
import {
  Cart as MedusaCart,
  Discount as MedusaDiscount,
  LineItem as MedusaLineItem,
  ProductVariant as MedusaProductVariant,
} from '@medusajs/medusa-js/lib/types'
import { Discount } from '@commerce/types/common'

export function normalizeProductVariant(
  { id, title: name, sku }: MedusaProductVariant,
  price: number,
  thumbnail: string
): ProductVariant {
  return {
    id,
    name,
    price: price / 100,
    sku: sku || id,
    listPrice: price / 100,
    requiresShipping: true,
    image: { url: thumbnail, altText: name },
  }
}

export function normalizeLineItem({
  id,
  title: name,
  variant,
  quantity,
  unit_price,
  thumbnail,
}: MedusaLineItem): LineItem {
  return {
    id,
    name,
    path: variant?.product.handle || name.replace(' ', '-'),
    variant: normalizeProductVariant(variant!, unit_price, thumbnail!),
    variantId: variant!.id,
    productId: variant!.product.id,
    discounts: [],
    quantity,
  }
}

export function normalizeDiscount(discount: MedusaDiscount): Discount {
  return {
    value: discount.rule.value,
  }
}

export function normalizeCart({
  id,
  email,
  created_at,
  region,
  items,
  subtotal,
  total,
  tax_total,
  customer_id,
  discounts,
}: MedusaCart): Cart {
  return {
    id,
    email,
    customerId: customer_id,
    discounts: discounts.map((discount) => normalizeDiscount(discount)),
    createdAt: `${created_at}`,
    currency: { code: region.currency_code },
    lineItems: items.map((item) => normalizeLineItem(item)),
    subtotalPrice: subtotal / 100,
    totalPrice: total / 100,
    taxesIncluded: tax_total > 0,
    lineItemsSubtotalPrice: subtotal / 100,
  }
}
