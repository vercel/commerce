import { Cart } from '@commerce/types/cart'
import { ProductCard, Product } from '@commerce/types/product'
import { CartFragment, SearchResultFragment, Favorite } from '../schema'

export function normalizeSearchResult(item: SearchResultFragment): ProductCard {
  return {
    id: item.productId,
    name: item.productName,
    slug: item.slug,
    imageSrc: item.productAsset?.preview ? item.productAsset?.preview + '?w=800&mode=crop' : '',
    price: (item.priceWithTax as any).min / 100,
    currencyCode: item.currencyCode,
    productVariantId: item.productVariantId,
    productVariantName: item.productVariantName,
    facetValueIds: item.facetValueIds,
    collectionIds: item.collectionIds,

    // TODO:
    // oldPrice: item.price
    // discount
    // isNotSell
    // weight
  }
}

export function normalizeFavoriteProductResult(item: Favorite) {
  return {
    id: item.product.id,
    name: item.product.name,
    slug: item.product.slug,
    imageSrc: item.product.assets[0].preview ? item.product.assets[0].preview + '?w=800&mode=crop' : '',
    price: item.product.variants[0].priceWithTax as number / 100,
    currencyCode: item.product.variants[0].currencyCode,
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
    customer: {
      firstName: order.customer?.firstName || '',
      lastName: order.customer?.lastName || '',
      emailAddress: order.customer?.emailAddress || '',
    },
    shippingAddress: {
      streetLine1: order.shippingAddress?.streetLine1 || '',
      city: order.shippingAddress?.city || '',
      province: order.shippingAddress?.province || '',
      postalCode: order.shippingAddress?.postalCode || '',
      countryCode: order.shippingAddress?.countryCode || '',
      phoneNumber: order.shippingAddress?.phoneNumber || '',
    },
    lineItems: order.lines?.map((l) => ({
      id: l.id,
      name: l.productVariant.name,
      quantity: l.quantity,
      slug: l.productVariant.product.slug,
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

export function normalizeProductCard(product: Product): ProductCard {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    imageSrc: product.images[0].url,
    price: product.price,
    currencyCode: product.currencyCode,
    productVariantId: product.variants?.[0].id.toString(),
    productVariantName: product.variants?.[0].name,
    facetValueIds: product.facetValueIds,
    collectionIds: product.collectionIds,
  }
}