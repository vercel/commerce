// import type { Product } from '../types/product'
// import type { Cart, BigcommerceCart, LineItem } from '../types/cart'
// import type { Page } from '../types/page'
// import type { BCCategory, Category } from '../types/site'
// import { definitions } from '../api/definitions/store-content'
import update from './immutability'
import getSlug from './get-slug'
import {PrCategory} from '../schema'

function normalizeProductOption(productOption: any) {
  const {
    node: {
      entityId,
      values: { edges = [] } = {},
      ...rest
    },
  } = productOption

  return {
    id: entityId,
    values: edges?.map(({ node }: any) => node),
    ...rest,
  }
}

export function normalizeProduct(productNode: any): any {
  const {
    entityId: id,
    productOptions,
    prices,
    path,
    id: _,
    options: _0,
  } = productNode

  return update(productNode, {
    id: { $set: String(id) },
    images: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { urlOriginal, altText, ...rest } }: any) => ({
          url: urlOriginal,
          alt: altText,
          ...rest,
        })),
    },
    variants: {
      $apply: ({ edges }: any) =>
        edges?.map(({ node: { entityId, productOptions, ...rest } }: any) => ({
          id: entityId,
          options: productOptions?.edges
            ? productOptions.edges.map(normalizeProductOption)
            : [],
          ...rest,
        })),
    },
    options: {
      $set: productOptions.edges
        ? productOptions?.edges.map(normalizeProductOption)
        : [],
    },
    brand: {
      $apply: (brand: any) => (brand?.entityId ? brand?.entityId : null),
    },
    slug: {
      $set: path?.replace(/^\/+|\/+$/g, ''),
    },
    price: {
      $set: {
        value: prices?.price.value,
        currencyCode: prices?.price.currencyCode,
      },
    },
    $unset: ['entityId'],
  })
}

export function normalizePage(page: any): any {
  return {
    id: String(page.id),
    name: page.name,
    is_visible: page.is_visible,
    sort_order: page.sort_order,
    body: page.body,
  }
}

export function normalizeCart(data: any): any {
  return {
    id: data.id,
    customerId: data.userId,
    email: data?.email,
    createdAt: data?.created_time,
    currency: {
      code: 'USD',
    },
    taxesIncluded: true,
    lineItems: data.items.map(normalizeLineItem),
    lineItemsSubtotalPrice: data?.items.reduce(
      (acc: number, obj: { subtotal: number }) => acc + obj.subtotal,
      0
    ),
    subtotalPrice: data?.subtotal,
    totalPrice: data?.total,
    discounts: data.orderDiscounts?.map((discount: any) => ({
      value: discount.impact,
    })),
  }
}

function normalizeLineItem(item: any): any {
  return {
    id: item.id,
    variantId: item.product.variationProductCode,
    productId: String(item.product.productCode),
    name: item.product.name,
    quantity: item.quantity,
    variant: {
      id: item.product.variationProductCode,
      sku: item.product?.sku,
      name: item.product.name,
      image: {
        url: item?.product.imageUrl,
      },
      requiresShipping: item?.is_require_shipping,
      price: item?.unitPrice.extendedAmount,
      listPrice: 0,
    },
    path: `${item.product.productCode}/na`,
    discounts: item?.discounts?.map((discount: any) => ({
      value: discount.discounted_amount,
    })),
  }
}

export function normalizeCategory(category: PrCategory): any {
  return {
    id: category?.categoryCode,
    name: category?.content?.name,
    slug: category?.content?.slug,
    path: `/${category?.content?.slug}`
  }
}
