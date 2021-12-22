import { Product } from '@commerce/types/product'
import { Cart } from '@commerce/types/cart'
import { CartFragment, SearchResultFragment } from '../schema'

export function normalizeSearchResult(item: SearchResultFragment): Product {
  return {
    id: item.productId,
    name: item.productName,
    description: item.description,
    slug: item.slug,
    path: item.slug,
    images: [
      {
        url: item.productAsset?.preview
          ? item.productAsset?.preview + '?w=800&mode=crop'
          : '',
      },
    ],
    variants: [],
    price: {
      value: (item.priceWithTax as any).min / 100,
      currencyCode: item.currencyCode,
    },
    options: [],
    sku: item.sku,
  }
}

export function normalizeCart(order: CartFragment): Cart {
  return {
    id: order.id.toString(),
    createdAt: order.createdAt,
    taxesIncluded: true,
    lineItemsSubtotalPrice: order.subTotalWithTax / 100,
    currency: { code: order.currencyCode },
    subtotalPrice: order.subTotalWithTax / 100,
    totalPrice: order.totalWithTax / 100,
    customerId: order.customer?.id,
    lineItems: order.lines?.map((l) => ({
      id: l.id,
      name: l.productVariant.name,
      quantity: l.quantity,
      url: l.productVariant.product.slug,
      variantId: l.productVariant.id,
      productId: l.productVariant.productId,
      images: [{ url: l.featuredAsset?.preview + '?preset=thumb' || '' }],
      discounts: l.discounts.map((d) => ({ value: d.amount / 100 })),
      path: '',
      variant: {
        id: l.productVariant.id,
        name: l.productVariant.name,
        sku: l.productVariant.sku,
        price: l.discountedUnitPriceWithTax / 100,
        listPrice: l.unitPriceWithTax / 100,
        image: {
          url: l.featuredAsset?.preview + '?preset=thumb' || '',
        },
        requiresShipping: true,
      },
    })),
  }
}
