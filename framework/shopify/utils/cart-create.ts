import Cookies from 'js-cookie'

import { SHOPIFY_CART_ID_COOKIE, SHOPIFY_COOKIE_EXPIRE } from '../const'

import cartCreateMutation from './mutations/cart-create'

import {
  CartCreateMutation,
  CartCreateMutationVariables,
  CartDetailsFragment,
} from '../schema'
import { FetcherOptions } from '@commerce/utils/types'
import { FetcherError } from '@commerce/utils/errors'

export const cartCreate = async (
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>
): Promise<{ node: CartDetailsFragment }> => {
  const { cartCreate } = await fetch<
    CartCreateMutation,
    CartCreateMutationVariables
  >({
    query: cartCreateMutation,
  })

  const cart = cartCreate?.cart

  if (!cart) {
    throw new FetcherError({
      status: 500,
      errors: cartCreate?.userErrors?.map((e) => ({
        message: e.message,
      })) ?? [{ message: 'Could not create cart' }],
    })
  }

  if (cart?.id) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }
    Cookies.set(SHOPIFY_CART_ID_COOKIE, cart.id, options)
  }

  return { node: cart }
}

export default cartCreate
