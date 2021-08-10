import Cookies from 'js-cookie'
import { SHOPIFY_COOKIE_EXPIRE, SHOPIFY_WHISLIST_ID_COOKIE } from '../const'
import wishlistCreateMutation from './mutations/wishlist-create'
import { FetcherOptions } from '@commerce/utils/types'

import {
  CartCreateMutation,
  CartCreateMutationVariables,
  CartDetailsFragment,
  CartLineInput,
} from '../schema'

import throwUserErrors from './throw-user-errors'

export const wishlistCreate = async (
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>,
  lines?: Array<CartLineInput> | CartLineInput
): Promise<CartDetailsFragment | null | undefined> => {
  const { cartCreate } = await fetch<
    CartCreateMutation,
    CartCreateMutationVariables
  >({
    query: wishlistCreateMutation,
    variables: {
      input: {
        lines,
      },
    },
  })

  const wishlist = cartCreate?.cart

  throwUserErrors(cartCreate?.userErrors)

  if (wishlist?.id) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }
    Cookies.set(SHOPIFY_WHISLIST_ID_COOKIE, wishlist.id, options)
  }

  return wishlist
}

export default wishlistCreate
