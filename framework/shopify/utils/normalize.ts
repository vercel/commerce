import type { Page } from '../types/page'
import type { Product } from '../types/product'
import type { Cart, LineItem } from '../types/cart'
import type { Category } from '../types/site'

import {
  Product as ShopifyProduct,
  SelectedOption,
  ImageConnection,
  MoneyV2,
  ProductOption,
  Page as ShopifyPage,
  PageEdge,
  Collection,
  CartDetailsFragment,
  ProductVariantConnection,
} from '../schema'

import { colorMap } from '@lib/colors'

import { CommerceError } from '@commerce/utils/errors'
import type { Wishlist } from '@commerce/types/wishlist'

const money = (money?: MoneyV2) => {
  if (money) {
    return {
      value: +money.amount,
      currencyCode: money.currencyCode,
    }
  }
  return null
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
  edges?.map(({ node: { originalSrc: url, ...rest } }) => ({
    url,
    ...rest,
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
        url: variant?.image?.originalSrc || '/product-img-placeholder.svg',
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

export function normalizeWishlist(
  cart: CartDetailsFragment | undefined | null
): Wishlist {
  if (!cart) {
    throw new CommerceError({ message: 'Missing cart details' })
  }
  return {
    items:
      cart.lines?.edges?.map(({ node: { id, merchandise: variant } }: any) => ({
        id,
        product_id: variant?.product?.id,
        variant_id: variant?.id,
        product: {
          name: variant?.product?.title,
          path: '/' + variant?.product?.handle,
          description: variant?.product?.description,
          images: [
            {
              url:
                variant?.image?.originalSrc || '/product-img-placeholder.svg',
            },
          ],
          id,
          variants: variant?.id ? [{ id: variant?.id }] : [],
          price: {
            value: +variant?.priceV2?.amount,
            currencyCode: variant?.priceV2?.currencyCode,
            retailPrice: variant?.compareAtPriceV2
              ? +variant?.compareAtPriceV2.amount
              : null,
          },
        },
      })) ?? [],
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
