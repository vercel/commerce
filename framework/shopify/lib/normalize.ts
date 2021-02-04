import {
  Product as ShopifyProduct,
  Checkout,
  CheckoutLineItemEdge,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  ProductOption,
  MoneyV2,
} from '@framework/schema'

import type { Cart, LineItem } from '../types'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

const normalizeProductOption = ({
  name: displayName,
  values,
  ...rest
}: ProductOption) => ({
  __typename: 'MultipleChoiceOption',
  displayName,
  values: values.map((value) => ({
    label: value,
  })),
  ...rest,
})

const normalizeProductImages = ({ edges }: ImageConnection) =>
  edges?.map(({ node: { originalSrc: url, ...rest } }) => ({
    url,
    ...rest,
  }))

const normalizeProductVariants = ({ edges }: ProductVariantConnection) =>
  edges?.map(({ node: { id, selectedOptions } }) => ({
    id,
    options: selectedOptions.map(({ name, value }: SelectedOption) =>
      normalizeProductOption({
        id,
        name,
        values: [value],
      })
    ),
  }))

export function normalizeProduct(productNode: ShopifyProduct): any {
  const {
    id,
    title: name,
    vendor,
    images,
    variants,
    description,
    handle,
    priceRange,
    options,
    ...rest
  } = productNode

  return {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images),
    variants: variants ? normalizeProductVariants(variants) : null,
    options: options ? options.map((o) => normalizeProductOption(o)) : [],
    ...rest,
  }
}

export function normalizeCart(data: Checkout): Cart {
  return {
    id: data.id,
    customerId: '',
    email: '',
    createdAt: data.createdAt,
    currency: {
      code: data.currencyCode,
    },
    taxesIncluded: data.taxesIncluded,
    lineItems: data.lineItems?.edges.map(normalizeLineItem),
    lineItemsSubtotalPrice: data.subtotalPrice,
    subtotalPrice: data.subtotalPrice,
    totalPrice: data.totalPrice,
    discounts: [],
  }
}

function normalizeLineItem({
  node: { id, title, variant, quantity },
}: CheckoutLineItemEdge): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: title,
    quantity: quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: title,
      image: {
        url: variant?.image?.originalSrc,
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.price,
      listPrice: variant?.compareAtPrice,
    },
    path: '',
    discounts: [],
  }
}
