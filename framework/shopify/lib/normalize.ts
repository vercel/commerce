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
    id: { $set: String(id) },
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images),
    variants: variants ? normalizeProductVariants(variants) : null,
    options: options ? options.map((o) => normalizeProductOption) : [],
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
    discounts: data.discountApplications?.edges.map(({ value }: any) => ({
      value,
    })),
  }
}

function normalizeLineItem({ node: item }: CheckoutLineItemEdge): LineItem {
  return {
    id: item.id,
    variantId: String(item.variant?.id),
    productId: String(item.variant?.id),
    name: item.title,
    quantity: item.quantity,
    variant: {
      id: String(item.variant?.id),
      sku: item.variant?.sku ?? '',
      name: item.title,
      image: {
        url: item.variant?.image?.originalSrc,
      },
      requiresShipping: item.variant?.requiresShipping ?? false,
      price: item.variant?.price,
      listPrice: item.variant?.compareAtPrice,
    },
    path: '',
    discounts: item.discountAllocations.map(({ value }: any) => ({
      value,
    })),
  }
}
