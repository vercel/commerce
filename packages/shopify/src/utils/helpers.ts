import Cookies, { CookieAttributes } from 'js-cookie'
import { SearchProductsBody } from '../types/product'

import {
  SHOPIFY_CART_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from '../const'

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
  let output = {}
  switch (sort) {
    case 'price-asc':
      output = {
        sortKey: 'PRICE',
        reverse: false,
      }
      break
    case 'price-desc':
      output = {
        sortKey: 'PRICE',
        reverse: true,
      }
      break
    case 'trending-desc':
      output = {
        sortKey: 'BEST_SELLING',
        reverse: false,
      }
      break
    case 'latest-desc':
      output = {
        sortKey: isCategory ? 'CREATED' : 'CREATED_AT',
        reverse: true,
      }
      break
  }
  return output
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
