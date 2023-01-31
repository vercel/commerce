import type { FetcherOptions } from '@vercel/commerce/utils/types'

import type {
  CartLineInput,
  CartCreateMutation,
  CartDetailsFragment,
  CartCreateMutationVariables,
} from '../../schema'

import Cookies from 'js-cookie'
import { cartCreateMutation } from './mutations/cart-mutations'
import throwUserErrors from './throw-user-errors'

import {
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CART_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
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
