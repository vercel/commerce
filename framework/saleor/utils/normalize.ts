import { Product } from '@commerce/types'

import {
  Product as SaleorProduct,
  Checkout,
  CheckoutLine,
  Money,
  ProductVariant,
} from '../schema'

import type { Cart, LineItem } from '../types'

// TODO: Check nextjs-commerce bug if no images are added for a product
const placeholderImg = '/product-img-placeholder.svg'

const money = ({ amount, currency }: Money) => {
  return {
    value: +amount,
    currencyCode: currency || 'USD',
  }
}

const normalizeProductOptions = (options: ProductVariant[]) => {
  const optionNames = options
    .map((option) => {
      // can a variant have multiple attributes?
      return option.attributes[0].attribute.name
    })
    .filter((x, i, a) => a.indexOf(x) == i)

  return optionNames.map((displayName) => {
    const matchedOptions = options.filter(
      ({ attributes }) => attributes[0].attribute.name === displayName // can a variant have multiple attributes?
    )

    return {
      __typename: 'MultipleChoiceOption',
      id: 123,
      // next-commerce can only display labels for options with displayName 'size', or colors
      displayName: displayName?.toLowerCase().includes('size')
        ? 'size'
        : displayName,
      values: matchedOptions.map(({ name }) => ({
        label: name,
      })),
    }
  })
}

const normalizeProductVariants = (variants: ProductVariant[]) =>
  variants?.map(({ id, sku, name, pricing }) => {
    const price = pricing?.price?.net && money(pricing.price.net)?.value

    return {
      id,
      name,
      sku: sku ?? id,
      price,
      listPrice: price,
      requiresShipping: true,
      options: normalizeProductOptions(variants),
    }
  })

export function normalizeProduct(productNode: SaleorProduct): Product {
  const {
    id,
    name,
    media,
    variants,
    description,
    slug,
    pricing,
    ...rest
  } = productNode

  const { blocks } = JSON.parse(description)

  const product = {
    id,
    name,
    vendor: '',
    description: blocks[0]?.data.text,
    path: `/${slug}`,
    slug: slug?.replace(/^\/+|\/+$/g, ''),
    price:
      (pricing?.priceRange?.start?.net &&
        money(pricing.priceRange.start.net)) ||
      0,
    // TODO: Check nextjs-commerce bug if no images are added for a product
    images: media?.length ? media : [{ url: placeholderImg }],
    variants:
      variants && variants.length > 0 ? normalizeProductVariants(variants) : [],
    options:
      variants && variants.length > 0 ? normalizeProductOptions(variants) : [],
    ...rest,
  }

  return product
}

export function normalizeCart(checkout: Checkout): Cart {
  const lines = checkout.lines as CheckoutLine[]; 
  const lineItems: LineItem[] = lines.length > 0 ? lines?.map<LineItem>(normalizeLineItem) : [];

  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: checkout.created,
    currency: {
      code: checkout.totalPrice?.currency!
    },
    taxesIncluded: false,
    lineItems, 
    lineItemsSubtotalPrice: checkout.subtotalPrice?.gross?.amount!, 
    subtotalPrice: checkout.subtotalPrice?.gross?.amount!, 
    totalPrice: checkout.totalPrice?.gross.amount!,
    discounts: [],
  }
}

function normalizeLineItem({ id, variant, quantity }: CheckoutLine): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: `${variant.name}`,
    quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.name!,
      image: {
        url: variant?.media![0].url ?? '/product-img-placeholder.svg',
      },
      requiresShipping: false,
      price: variant?.pricing?.price?.gross.amount!,
      listPrice: 0 
    },
    path: String(variant?.product?.slug),
    discounts: [],
    options: [ ],
  }
}
