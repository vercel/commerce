import type { Product } from '../types/product'
import type { Cart, BigcommerceCart, LineItem } from '../types/cart'
import type { Page } from '../types/page'
import type { BCCategory, Category } from '../types/site'
import { definitions } from '../api/definitions/store-content'
import update from './immutability'
import getSlug from './get-slug'

function normalizeProductOption(productOption: any) {
  const {
    node: { entityId, values: { edges = [] } = {}, ...rest },
  } = productOption

  return {
    id: entityId,
    values: edges?.map(({ node }: any) => node),
    ...rest,
  }
}

function normalizeRelatedProducts(relatedProducts: any) {
  const {
    node: { entityId, images, path, prices, productOptions, variants, ...rest },
  } = relatedProducts

  let normalizedImages = images.edges.map(({ node: { urlOriginal, altText, ...rest }}: any) => ({
    url: urlOriginal,
    alt: altText,
    ...rest,
  }));

  let normalizedVariants = variants.edges?.map(({ node: { entityId, productOptions, ...rest } }: any) => ({
    id: entityId,
    options: productOptions?.edges
      ? productOptions.edges.map(normalizeProductOption)
      : [],
    ...rest,
  }))

  let options = productOptions.edges
    ? productOptions?.edges.map(normalizeProductOption)
    : []

  let slug = path?.replace(/^\/+|\/+$/g, '');

  let normalizedPrice = {
    value: prices?.price.value,
    currencyCode: prices?.price.currencyCode,
  }

  return {
    id: String(entityId),
    images: normalizedImages,
    options,
    price: normalizedPrice,
    prices,
    slug,
    variants: normalizedVariants,
    ...rest
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
    relatedProducts,
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
    relatedProducts: {
      $set: relatedProducts?.edges
        ? relatedProducts?.edges.map(normalizeRelatedProducts)
        : [],
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
    body: page.body,
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
