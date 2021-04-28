import { Customer } from '@commerce/types'

import {
  Account,
  CatalogItem,
  Cart as ReactionCart,
  ProductPricingInfo,
  CatalogProductVariant,
  CartItemEdge,
} from '../schema'

import type { Cart, LineItem } from '../types'

const money = ({ displayPrice }: ProductPricingInfo) => {
  return {
    displayPrice,
  }
}

const normalizeProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => {
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      }
      if (displayName === 'Color') {
        output = {
          ...output,
          hexColors: [value],
        }
      }
      return output
    }),
  }
}

const normalizeProductVariants = (variants: [CatalogProductVariant]) => {
  return variants?.map(
    ({
      variantId,
      attributeLabel,
      optionTitle,
      options,
      sku,
      title,
      pricing,
    }) => {
      let variantPrice = pricing[0]?.price ?? pricing[0]?.minPrice

      if (variantPrice === undefined) {
        variantPrice = 0
      }

      return {
        id: variantId,
        name: title,
        sku: sku ?? variantId,
        price: variantPrice,
        listPrice: pricing[0]?.compareAtPrice?.amount ?? variantPrice,
        requiresShipping: true,
        options:
          options?.map(
            ({ _id, attributeLabel, optionTitle }: CatalogProductVariant) =>
              normalizeProductOption({
                id: _id,
                name: attributeLabel,
                values: [optionTitle],
              })
          ) ?? [],
        // options: [
        //   {
        //     __typename: 'MultipleChoiceOption',
        //     displayName: attributeLabel,
        //     values: [{ label: optionTitle }],
        //   },
        // ],
      }
    }
  )
}

export function groupProductOptionsByAttributeLabel(
  options: [CatalogProductVariant]
) {
  return options.reduce((groupedOptions, currentOption) => {
    const attributeLabelIndex = groupedOptions.findIndex((option) => {
      return (
        option.displayName.toLowerCase() ===
        currentOption.attributeLabel.toLowerCase()
      )
    })

    if (attributeLabelIndex !== -1) {
      groupedOptions[attributeLabelIndex].values = [
        ...groupedOptions[attributeLabelIndex].values,
        {
          label: currentOption.optionTitle,
          hexColors: [currentOption.optionTitle],
        },
      ]
    } else {
      groupedOptions = [
        ...groupedOptions,
        normalizeProductOption({
          id: currentOption.variantId,
          name: currentOption.attributeLabel,
          values: [currentOption.optionTitle],
        }),
      ]
    }

    return groupedOptions
  }, [])
}

export function normalizeProduct(productNode: CatalogItemEdge): CatalogItem {
  const {
    _id,
    product: {
      productId,
      description,
      title: name,
      vendor,
      pricing,
      slug,
      primaryImage,
      variants,
    },
    ...rest
  } = productNode

  const product = {
    id: productId ?? _id,
    name,
    vendor,
    description,
    path: `/${slug}`,
    slug: slug?.replace(/^\/+|\/+$/g, ''),
    price: {
      value: pricing[0].minPrice,
      currencyCode: pricing[0].currency.code,
    },
    variants: variants ? normalizeProductVariants(variants) : [],
    options: variants ? groupProductOptionsByAttributeLabel(variants) : [],
    images: [],
    ...rest,
  }

  if (productNode.product.primaryImage) {
    product.images = [
      {
        url: primaryImage?.URLs?.original,
        alt: name,
      },
    ]
  }

  return product
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
