import type { Page } from '@vercel/commerce/types/page'
import type { Product } from '@vercel/commerce/types/product'
import type { Cart, LineItem } from '@vercel/commerce/types/cart'
import type { Category, Brand } from '@vercel/commerce/types/site'
import type { BigcommerceCart, BCCategory, BCBrand } from '../types'

import { definitions } from '../api/definitions/store-content'
import update from './immutability'
import getSlug from './get-slug'

function normalizeProductOption(productOption: any) {
  const {
    node: { entityId, values: { edges = [] } = {}, ...rest },
  } = productOption

  return {
    id: String(entityId),
    values: edges?.map(({ node }: any) => node),
    ...rest,
  }
}

export function normalizeProduct(productNode: any): Product {
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
          id: String(entityId),
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
      $apply: (brand: any) => (brand?.id ? brand.id : null),
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

export function normalizePage(page: definitions['page_Full']): Page {
  return {
    id: String(page.id),
    name: page.name,
    is_visible: page.is_visible,
    sort_order: page.sort_order,
    body: page.body ?? '',
    url: page.url,
  }
}

export function normalizeCart(data: BigcommerceCart): Cart {
  return {
    id: data.id,
    customerId: String(data.customer_id),
    email: data.email,
    createdAt: data.created_time,
    currency: data.currency,
    taxesIncluded: data.tax_included,
    lineItems: [
      ...data.line_items.physical_items.map(normalizeLineItem),
      ...data.line_items.digital_items.map(normalizeLineItem),
    ],
    lineItemsSubtotalPrice: data.base_amount,
    subtotalPrice: data.base_amount + data.discount_amount,
    totalPrice: data.cart_amount,
    discounts: data.discounts?.map((discount) => ({
      value: discount.discounted_amount,
    })),
  }
}

function normalizeLineItem(item: any): LineItem {
  return {
    id: item.id,
    variantId: String(item.variant_id),
    productId: String(item.product_id),
    name: item.name,
    quantity: item.quantity,
    variant: {
      id: String(item.variant_id),
      sku: item.sku,
      name: item.name,
      image: {
        url: item.image_url,
      },
      requiresShipping: item.is_require_shipping,
      price: item.sale_price,
      listPrice: item.list_price,
    },
    options: item.options,
    path: item.url.split('/')[3],
    discounts: item.discounts.map((discount: any) => ({
      value: discount.discounted_amount,
    })),
  }
}

export function normalizeCategory(category: BCCategory): Category {
  return {
    id: `${category.entityId}`,
    name: category.name,
    slug: getSlug(category.path),
    path: category.path,
  }
}

export function normalizeBrand(brand: BCBrand): Brand {
  const path = brand.node.path.replace('/brands/', '')
  const slug = getSlug(path)
  return {
    id: `${brand.node.entityId}`,
    name: brand.node.name,
    slug,
    path: `/${slug}`,
  }
}
