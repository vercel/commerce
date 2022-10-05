import { Product } from '@vercel/commerce/types/product'

import {
  Product as SaleorProduct,
  Checkout,
  CheckoutLine,
  Money,
  ProductVariant,
} from '../../schema'

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
  return options
    ?.map((option) => option?.attributes)
    .flat(1)
    .reduce<any>((acc, x) => {
      if (
        acc.find(({ displayName }: any) => displayName === x.attribute.name)
      ) {
        return acc.map((opt: any) => {
          return opt.displayName === x.attribute.name
            ? {
                ...opt,
                id: x.attribute.id,
                values: [
                  ...opt.values,
                  ...x.values.map((value: any) => ({
                    label: value?.name,
                  })),
                ],
              }
            : opt
        })
      }

      return acc.concat({
        __typename: 'MultipleChoiceOption',
        id: x.attribute.id,
        displayName: x.attribute.name,
        variant: 'size',
        values: x.values.map((value: any) => ({
          label: value?.name,
        })),
      })
    }, [])
}

const normalizeProductVariants = (variants: ProductVariant[]) => {
  return variants?.map((variant) => {
    const { id, sku, name, pricing } = variant
    const price = pricing?.price?.net && money(pricing.price.net)?.value

    return {
      id,
      name,
      ...(!!sku && { sku }),
      price,
      listPrice: price,
      requiresShipping: true,
      options: normalizeProductOptions([variant]),
    }
  })
}

export function normalizeProduct(productNode: SaleorProduct): Product {
  const {
    id,
    name,
    media = [],
    variants,
    description,
    slug,
    pricing,
    ...rest
  } = productNode

  const product = {
    id,
    name,
    vendor: '',
    description: description
      ? JSON.parse(description)?.blocks[0]?.data.text
      : '',
    path: `/${slug}`,
    slug: slug?.replace(/^\/+|\/+$/g, ''),
    price: (pricing?.priceRange?.start?.net &&
      money(pricing.priceRange.start.net)) || {
      value: 0,
      currencyCode: 'USD',
    },
    // TODO: Check nextjs-commerce bug if no images are added for a product
    images: media?.length ? media : [{ url: placeholderImg }],
    variants:
      variants && variants.length > 0
        ? normalizeProductVariants(variants as ProductVariant[])
        : [],
    options:
      variants && variants.length > 0
        ? normalizeProductOptions(variants as ProductVariant[])
        : [],
    ...rest,
  }

  return product as Product
}

export function normalizeCart(checkout: Checkout): Cart {
  const lines = checkout.lines as CheckoutLine[]
  const lineItems: LineItem[] =
    lines.length > 0 ? lines?.map<LineItem>(normalizeLineItem) : []

  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: checkout.created,
    currency: {
      code: checkout.totalPrice?.currency!,
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
    name: `${variant.product.name}`,
    quantity,
    variant: {
      id: String(variant?.id),
      ...(variant?.sku && { sku: variant.sku }),
      name: variant?.name!,
      image: {
        url: variant?.media![0] ? variant?.media![0].url : placeholderImg,
      },
      requiresShipping: false,
      price: variant?.pricing?.price?.gross.amount!,
      listPrice: 0,
    },
    path: String(variant?.product?.slug),
    discounts: [],
    options: [],
  }
}
