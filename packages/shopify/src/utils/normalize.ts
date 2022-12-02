import type { Page } from '@vercel/commerce/types/page'
import type { Product, ProductMetafield } from '@vercel/commerce/types/product'
import type { Cart, LineItem } from '@vercel/commerce/types/cart'
import type { Category } from '@vercel/commerce/types/site'
import type { MetafieldType } from '../types/metafields'

import type {
  Product as ShopifyProduct,
  Checkout,
  CheckoutLineItemEdge,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  MoneyV2,
  ProductOption,
  Page as ShopifyPage,
  PageEdge,
  Collection,
  Maybe,
  Metafield,
} from '../../schema'

import { colorMap } from './colors'
import { getMetafieldValue, toLabel, parseJson } from './metafields'

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
  edges?.map(({ node: { url, ...rest } }) => ({
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
        sku,
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

export function normalizeProduct(
  {
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
  }: ShopifyProduct,
  locale?: string
): Product {
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
    metafields: normalizeMetafields(metafields, locale),
    description: description || '',
    ...(descriptionHtml && { descriptionHtml }),
    ...rest,
  }
}

export function normalizeMetafields(
  metafields: Maybe<Metafield>[],
  locale?: string
) {
  const output: Record<string, Record<string, ProductMetafield>> = {}

  if (!metafields) return output

  for (const metafield of metafields) {
    if (!metafield) continue

    const { key, type, namespace, value, ...rest } = metafield

    const newField = {
      ...rest,
      key,
      name: toLabel(key),
      type,
      namespace,
      value,
      valueHtml: getMetafieldValue(type, value, locale),
    }

    if (!output[namespace]) {
      output[namespace] = {
        [key]: newField,
      }
    } else {
      output[namespace][key] = newField
    }
  }

  return output
}

export function normalizeCart(checkout: Checkout): Cart {
  return {
    id: checkout.id,
    url: checkout.webUrl,
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
  node: { id, title, variant, quantity },
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
        url: variant?.image?.url || '/product-img-placeholder.svg',
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: String(variant?.product?.handle),
    discounts: [],
    options: variant?.title == 'Default Title' ? [] : variant?.selectedOptions,
  }
}

export const normalizePage = (
  { title: name, handle, ...page }: ShopifyPage,
  locale: string = 'en-US'
): Page => ({
  ...page,
  url: `/${locale}/${handle}`,
  name,
  body: page.body ?? '',
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

export const normalizeMetafieldValue = (
  type: MetafieldType,
  value: string,
  locale?: string
) => {
  if (type.startsWith('list.')) {
    const arr = parseJson(value)
    return Array.isArray(arr)
      ? arr
          .map((v) => getMetafieldValue(type.split('.')[1], v, locale))
          .join(' &#8226; ')
      : value
  }
  return getMetafieldValue(type, value, locale)
}
