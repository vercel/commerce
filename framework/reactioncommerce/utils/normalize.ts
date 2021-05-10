import { Product, Customer } from '@commerce/types'

import {
  Account,
  Cart as ReactionCart,
  ProductPricingInfo,
  CatalogProductVariant,
  CartItemEdge,
  CatalogItemProduct,
  CatalogProduct,
  ImageInfo,
  Maybe,
} from '../schema'

import type { Cart, LineItem } from '../types'

type ProductOption = {
  __typename?: string
  id: string
  displayName: string
  values: any[]
}

const money = ({ displayPrice }: ProductPricingInfo) => {
  return {
    displayPrice,
  }
}

const normalizeProductImages = (images: Maybe<ImageInfo>[], name: string) =>
  images.map((image) => ({
    url: image?.URLs?.original || image?.URLs?.medium || '',
    alt: name,
  }))

const normalizeProductOption = ({ id, displayName, values }: ProductOption) => {
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      }
      if (displayName.toLowerCase() === 'color') {
        output = {
          ...output,
          hexColors: [value],
        }
      }
      return output
    }),
  }
}

const normalizeProductVariants = (variants: CatalogProductVariant[]) => {
  return variants.map((variant) => {
    const { _id, options, sku, title, pricing = [], variantId } = variant ?? {}
    const variantPrice = pricing[0]?.price ?? pricing[0]?.minPrice ?? 0

    return {
      id: _id ?? '',
      name: title,
      sku: sku ?? variantId,
      price: variantPrice,
      listPrice: pricing[0]?.compareAtPrice?.amount ?? variantPrice,
      requiresShipping: true,
      options: options?.length
        ? options.map((option) => {
            return normalizeProductOption({
              id: option?._id ?? '',
              displayName: option?.attributeLabel ?? '',
              values: [option?.optionTitle],
            })
          })
        : [],
    }
  })
}

export function groupProductOptionsByAttributeLabel(
  options: CatalogProductVariant[]
) {
  return options.reduce((groupedOptions, currentOption) => {
    const attributeLabelIndex = groupedOptions.findIndex((option) => {
      return (
        option.displayName.toLowerCase() ===
        currentOption?.attributeLabel.toLowerCase()
      )
    })

    if (attributeLabelIndex !== -1) {
      groupedOptions[attributeLabelIndex].values = [
        ...groupedOptions[attributeLabelIndex].values,
        {
          label: currentOption?.optionTitle ?? '',
          hexColors: [currentOption?.optionTitle] ?? '',
        },
      ]
    } else {
      groupedOptions = [
        ...groupedOptions,
        normalizeProductOption({
          id: currentOption?._id ?? '',
          displayName: currentOption?.attributeLabel ?? '',
          values: [currentOption?.optionTitle ?? ''],
        }),
      ]
    }

    return groupedOptions
  }, [] as ProductOption[])
}

export function normalizeProduct(productNode: CatalogItemProduct): Product {
  const product = productNode.product as CatalogProduct

  const {
    _id,
    productId,
    title,
    description,
    slug,
    sku,
    media,
    pricing,
    vendor,
    variants,
    ...rest
  } = product

  return {
    id: productId ?? _id,
    name: title ?? '',
    description: description ?? '',
    slug: slug?.replace(/^\/+|\/+$/g, '') ?? '',
    path: slug ?? '',
    sku: sku ?? '',
    images: media?.length ? normalizeProductImages(media, title ?? '') : [],
    vendor: product.vendor,
    price: {
      value: pricing[0]?.price ?? 0,
      currencyCode: pricing[0]?.currency.code,
    },
    variants: variants?.length ? normalizeProductVariants(variants) : [],
    options: variants?.length
      ? groupProductOptionsByAttributeLabel(variants)
      : [],
    ...rest,
  }
}

export function normalizeCart(cart: ReactionCart): Cart {
  return {
    id: cart._id,
    customerId: '',
    email: '',
    createdAt: cart.createdAt,
    currency: {
      code: cart.checkout?.summary?.total?.currency.code,
    },
    taxesIncluded: false,
    lineItems: cart.items?.edges?.map(normalizeLineItem),
    lineItemsSubtotalPrice: +cart.checkout?.summary?.itemTotal?.amount,
    subtotalPrice: +cart.checkout?.summary?.itemTotal?.amount,
    totalPrice: cart.checkout?.summary?.total?.amount,
    discounts: [],
  }
}

function normalizeLineItem({
  node: {
    _id,
    compareAtPrice,
    imageURLs,
    title,
    productConfiguration,
    priceWhenAdded,
    optionTitle,
    variantTitle,
    quantity,
  },
}: CartItemEdge): LineItem {
  console.log('imageURLs', imageURLs)
  return {
    id: _id,
    variantId: String(productConfiguration?.productVariantId),
    productId: String(productConfiguration?.productId),
    name: `${title}`,
    quantity,
    variant: {
      id: String(productConfiguration?.productVariantId),
      sku: String(productConfiguration?.productVariantId),
      name: String(optionTitle || variantTitle),
      image: {
        url: imageURLs?.original ?? '/product-img-placeholder.svg',
      },
      requiresShipping: true,
      price: priceWhenAdded?.amount,
      listPrice: compareAtPrice?.amount,
    },
    path: '',
    discounts: [],
    options: [
      {
        value: String(optionTitle || variantTitle),
      },
    ],
  }
}

export function normalizeCustomer(viewer: Account): Customer {
  return {
    firstName: viewer.firstName ?? '',
    lastName: viewer.lastName ?? '',
    email: viewer.primaryEmailAddress,
  }
}
