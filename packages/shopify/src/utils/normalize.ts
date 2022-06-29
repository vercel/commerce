import type { Page } from '../types/page'
import type { Product } from '../types/product'
import type { Cart, LineItem } from '../types/cart'
import type { Category } from '../types/site'

import {
  Product as ShopifyProduct,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  MoneyV2,
  ProductOption,
  Page as ShopifyPage,
  PageEdge,
  Collection,
  CartDetailsFragment,
} from '../../schema'
import { colorMap } from './colors'
import { CommerceError } from '@vercel/commerce/utils/errors'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
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
    displayName: displayName.toLowerCase(),
    values: values.map((value) => {
      let output: any = {
        label: value,
      }
      if (displayName.match(/colou?r/gi)) {
        const mapedColor = colorMap[value.toLowerCase().replace(/ /g, '')]
        if (mapedColor) {
          output = {
            ...output,
            hexColors: [mapedColor],
          }
        }
      }
      return output
    }),
  }
}

const normalizeProductImages = ({ edges }: ImageConnection) =>
  edges?.map(({ node: { altText: alt, url, ...rest } }) => ({
    ...rest,
    url,
    alt,
  }))

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges?.map(
    ({
      node: {
        id,
        selectedOptions,
        sku,
        title,
        priceV2,
        compareAtPriceV2,
        requiresShipping,
        availableForSale,
      },
    }) => {
      return {
        id,
        name: title,
        sku: sku ?? id,
        price: +priceV2.amount,
        listPrice: +compareAtPriceV2?.amount,
        requiresShipping,
        availableForSale,
        options: selectedOptions.map(({ name, value }: SelectedOption) => {
          const options = normalizeProductOption({
            id,
            name,
            values: [value],
          })

          return options
        }),
      }
    }
  )
}

export function normalizeProduct({
  id,
  title: name,
  vendor,
  images,
  variants,
  description,
  descriptionHtml,
  handle,
  priceRange,
  options,
  metafields,
  ...rest
}: ShopifyProduct): Product {
  return {
    id,
    name,
    vendor,
    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images),
    variants: variants ? normalizeProductVariants(variants) : [],
    options: options
      ? options
          .filter((o) => o.name !== 'Title') // By default Shopify adds a 'Title' name when there's only one option. We don't need it. https://community.shopify.com/c/Shopify-APIs-SDKs/Adding-new-product-variant-is-automatically-adding-quot-Default/td-p/358095
          .map((o) => normalizeProductOption(o))
      : [],
    ...(description && { description }),
    ...(descriptionHtml && { descriptionHtml }),
    ...rest,
  }
}
function normalizeLineItem({
  node: { id, merchandise: variant, quantity },
}: {
  node: any
}): LineItem {
  return {
    id,
    variantId: variant?.id,
    productId: variant?.id,
    name: variant?.product?.title || variant?.title,
    quantity: quantity ?? 0,
    variant: {
      id: variant?.id,
      sku: variant?.sku ?? '',
      name: variant?.title!,
      image: {
        url: variant?.image?.url || '/product-img-placeholder.svg',
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: +variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: variant?.product?.handle,
    discounts: [],
    options: variant?.title == 'Default Title' ? [] : variant?.selectedOptions,
  }
}

export function normalizeCart(
  cart: CartDetailsFragment | undefined | null
): Cart {
  if (!cart) {
    throw new CommerceError({ message: 'Missing cart details' })
  }
  return {
    id: cart.id,
    customerId: cart.buyerIdentity?.customer?.id,
    email: cart.buyerIdentity?.email ?? '',
    createdAt: cart.createdAt,
    currency: {
      code: cart.estimatedCost?.totalAmount?.currencyCode,
    },
    taxesIncluded: !!cart.estimatedCost?.totalTaxAmount?.amount,
    lineItems: cart.lines?.edges?.map(normalizeLineItem) ?? [],
    lineItemsSubtotalPrice: +cart.estimatedCost?.subtotalAmount?.amount,
    subtotalPrice: +cart.estimatedCost?.subtotalAmount?.amount,
    totalPrice: +cart.estimatedCost?.totalAmount?.amount,
    discounts: [],
  }
}

export const normalizePage = (
  { title: name, handle, ...page }: ShopifyPage,
  locale: string = 'en-US'
): Page => ({
  ...page,
  url: `/${locale}/${handle}`,
  name,
})

export const normalizePages = (edges: PageEdge[], locale?: string): Page[] =>
  edges?.map((edge) => normalizePage(edge.node, locale))

export const normalizeCategory = ({
  title: name,
  handle,
  id,
}: Collection): Category => ({
  id,
  name,
  slug: handle,
  path: `/${handle}`,
})
