import Cookies from 'js-cookie'
import { SHOPIFY_CART_ID_COOKIE, SHOPIFY_COOKIE_EXPIRE } from '../const'
import cartCreateMutation from './mutations/cart-create'

import {
  CartCreateMutation,
  CartCreateMutationVariables,
  CartDetailsFragment,
  CartLineInput,
} from '../schema'

import { FetcherOptions } from '@commerce/utils/types'
import throwUserErrors from './throw-user-errors'
import setCheckoutUrlCookie from './set-checkout-url-cookie'

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

  setCheckoutUrlCookie(cart?.checkoutUrl)

  return cart
}

export default cartCreate
