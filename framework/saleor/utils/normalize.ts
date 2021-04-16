import { Product } from '@commerce/types'

import {
  Product as SaleorProduct,
  Checkout,
  CheckoutLineItemEdge,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  MoneyV2,
  ProductOption,
  Money,
} from '../schema'

import type { Cart, LineItem } from '../types'

const money = ({ amount, currency }: Money) => {
  return {
    value: +amount,
    currencyCode: currency || 'USD',
  }
}

const normalizeProductOptions = (options: ProductOption[]) => {
  return options?.map(({ id, name: displayName, values }) => ({
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    // values: values.map((value) => {
    //   let output: any = {
    //     label: value,
    //   }
    //   if (displayName.match(/colou?r/gi)) {
    //     output = {
    //       ...output,
    //       hexColors: [value],
    //     }
    //   }
    //   return output
    // })
    values: [],
  }))
}

const normalizeProductImages = (images: any) =>
  images.map(({ node: { originalSrc: url, ...rest } }) => ({
    url,
    ...rest,
  }))

const normalizeProductVariants = (variants: any) => {
  return variants?.map(
    ({ id, selectedOptions, sku, name, priceV2, pricing }) => {
      const price = money(pricing?.price?.net)?.value

      console.log({ price })

      return {
        id,
        name,
        sku: sku ?? id,
        price,
        listPrice: price,
        requiresShipping: true,
        // options: selectedOptions.map(({ name, value }: SelectedOption) => {
        //   const options = normalizeProductOption({
        //     id,
        //     name,
        //     values: [value],
        //   })
        //   return options
        // }),
        options: [],
      }
    }
  )
}

export function normalizeProduct(productNode: SaleorProduct): Product {
  const {
    id,
    name,
    media,
    variants,
    description,
    slug,
    pricing,
    // options,
    ...rest
  } = productNode

  const product = {
    id,
    name,
    vendor: '',
    description,
    path: `/${slug}`,
    slug: slug?.replace(/^\/+|\/+$/g, ''),
    price: money(pricing?.priceRange?.start?.net) || 0,
    images: media,
    variants: variants ? normalizeProductVariants(variants) : [],
    options: variants ? normalizeProductOptions(variants) : [],
    ...rest,
  }

  return product
}

export function normalizeCart(checkout: Checkout): Cart {
  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2?.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItems: checkout.lineItems?.edges.map(normalizeLineItem),
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2?.amount,
    subtotalPrice: +checkout.subtotalPriceV2?.amount,
    totalPrice: checkout.totalPriceV2?.amount,
    discounts: [],
  }
}

function normalizeLineItem({
  node: { id, title, variant, quantity, ...rest },
}: CheckoutLineItemEdge): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: `${title}`,
    quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.title!,
      image: {
        url: variant?.image?.originalSrc ?? '/product-img-placeholder.svg',
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: String(variant?.product?.handle),
    discounts: [],
    options: [
      {
        value: variant?.title,
      },
    ],
  }
}
