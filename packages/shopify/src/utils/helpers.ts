import Cookies, { CookieAttributes } from 'js-cookie'

import type {
  CartLineInput,
  CollectionEdge,
  CartCreateMutation,
  CartDetailsFragment,
  CartCreateMutationVariables,
  GetAllProductVendorsQuery,
  GetAllProductVendorsQueryVariables,
} from '../../schema'

import type { Category } from '../types/site'
import type { MetafieldType, SearchProductsBody } from '../types/product'
import type { FetcherOptions } from '@vercel/commerce/utils/types'

import {
  SHOPIFY_CART_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from '../const'

import { ShopifyConfig } from '../api'
import { normalizeCategory } from './normalize'
import { throwUserErrors } from './throw-user-errors'
import { cartCreateMutation } from './mutations/cart-mutations'
import { getAllProductVendors, getSiteCollectionsQuery } from './queries'

export const cartCreate = async (
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>,
  lines?: Array<CartLineInput> | CartLineInput
): Promise<CartDetailsFragment | null | undefined> => {
  const { cartCreate } = await fetch<
    CartCreateMutation,
    CartCreateMutationVariables
  >({
    query: cartCreateMutation,
    variables: {
      input: {
        lines,
      },
    },
  })

  const cart = cartCreate?.cart

  throwUserErrors(cartCreate?.userErrors)

  if (cart?.id) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }
    Cookies.set(SHOPIFY_CART_ID_COOKIE, cart.id, options)
  }

  setCartUrlCookie(cart?.checkoutUrl)

  return cart
}

export const getCategories = async ({
  fetch,
  locale,
}: ShopifyConfig): Promise<Category[]> => {
  const { data } = await fetch(
    getSiteCollectionsQuery,
    {
      variables: {
        first: 250,
      },
    },
    {
      ...(locale && {
        headers: {
          'Accept-Language': locale,
        },
      }),
    }
  )

  return (
    data.collections?.edges?.map(({ node }: CollectionEdge) =>
      normalizeCategory(node)
    ) ?? []
  )
}

export type Brand = {
  entityId: string
  name: string
  path: string
}

export type BrandEdge = {
  node: Brand
}

export type Brands = BrandEdge[]

export const getBrands = async (
  config: ShopifyConfig
): Promise<BrandEdge[]> => {
  const { data } = await config.fetch<
    GetAllProductVendorsQuery,
    GetAllProductVendorsQueryVariables
  >(getAllProductVendors, {
    variables: {
      first: 250,
    },
  })

  let vendorsStrings = data.products.edges.map(({ node: { vendor } }) => vendor)

  return [...new Set(vendorsStrings)].map((v) => {
    const id = v.replace(/\s+/g, '-').toLowerCase()
    return {
      node: {
        entityId: id,
        name: v,
        path: `brands/${id}`,
      },
    }
  })
}

export const setCartUrlCookie = (cartUrl: string) => {
  if (cartUrl) {
    const oldCookie = Cookies.get(SHOPIFY_CART_URL_COOKIE)
    if (oldCookie !== cartUrl) {
      Cookies.set(SHOPIFY_CART_URL_COOKIE, cartUrl, {
        expires: SHOPIFY_COOKIE_EXPIRE,
      })
    }
  }
}

export const getCartId = (id?: string) => {
  return id || Cookies.get(SHOPIFY_CART_ID_COOKIE)
}

export const getSortVariables = (
  sort?: string,
  isCategory: boolean = false
) => {
  switch (sort) {
    case 'price-asc':
      return {
        sortKey: 'PRICE',
        reverse: false,
      }
    case 'price-desc':
      return {
        sortKey: 'PRICE',
        reverse: true,
      }
    case 'trending-desc':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      }
    case 'latest-desc':
      return {
        sortKey: isCategory ? 'CREATED' : 'CREATED_AT',
        reverse: true,
      }
  }
}

export const getSearchVariables = ({
  brandId,
  search,
  categoryId,
  sort,
  locale,
}: SearchProductsBody) => {
  let query = ''

  if (search) {
    query += `product_type:${search} OR title:${search} OR tag:${search} `
  }

  if (brandId) {
    query += `${search ? 'AND ' : ''}vendor:${brandId}`
  }

  return {
    categoryId,
    query,
    ...getSortVariables(sort, !!categoryId),
    ...(locale && {
      locale,
    }),
  }
}

export const getCustomerToken = () => Cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(SHOPIFY_CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(
      SHOPIFY_CUSTOMER_TOKEN_COOKIE,
      token,
      options ?? {
        expires: SHOPIFY_COOKIE_EXPIRE,
      }
    )
  }
}

export const parseJson = (value: string): any => {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

const unitConversion: Record<string, string> = {
  MILLIMETERS: 'millimeter',
  CENTIMETERS: 'centimeter',
  METERS: 'meter',

  MILLILITERS: 'milliliter',
  LITERS: 'liter',
  FLUID_OUNCES: 'fluid-ounce',
  IMPERIAL_FLUID_OUNCES: 'fluid-ounce',
  GALLONS: 'gallon',

  KILOGRAMS: 'kilogram',
  GRAMS: 'gram',
  OUNCES: 'ounce',
  POUNDS: 'pound',
}

export const getMeasurment = (input: string, locale: string = 'en-US') => {
  try {
    let { unit, value } = JSON.parse(input)

    return new Intl.NumberFormat(locale, {
      unit: unitConversion[unit],
      style: 'unit',
    }).format(parseFloat(value))
  } catch (e) {
    console.error(e)
    return input
  }
}

export const getMetafieldValue = (
  type: MetafieldType,
  value: string,
  locale: string = 'en-US'
) => {
  switch (type) {
    case 'boolean':
      return value === 'true' ? '&#10003;' : 'No'
    case 'number_integer':
      return parseInt(value).toLocaleString(locale)
    case 'number_decimal':
      return parseFloat(value).toLocaleString(locale)
    case 'date':
      return Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
      }).format(new Date(value))
    case 'date_time':
      return Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(new Date(value))
    case 'dimension':
    case 'volume':
    case 'weight':
      return getMeasurment(value, locale)
    case 'rating':
      const { scale_max, value: val } = JSON.parse(value)
      return Array.from({ length: scale_max }, (_, i) =>
        i <= val - 1 ? '&#9733;' : '&#9734;'
      ).join('')
    case 'color':
      return `<figure style="background-color: ${value}; width: 1rem; height:1rem; display:block; margin-top: 2px; border-radius: 100%;"/>`
    case 'url':
      return `<a href="${value}" target="_blank">${value}</a>`
    case 'multi_line_text_field':
      return value
        .split('\n')
        .map((line) => `<p>${line}</p>`)
        .join('')
    case 'json':
    case 'single_line_text_field':
    case 'product_reference':
    case 'page_reference':
    case 'variant_reference':
    case 'file_reference':
    default:
      return value
  }
}
