import { ShoppingList } from '@commercetools/platform-sdk'
import { ClientResponse } from '@commercetools/sdk-client-v2'
import { FetcherOptions } from '@vercel/commerce/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  getWishlistId,
  removeWishlistCookie,
  setWishlistCookie,
} from './wishlist-cookie'
import createWishlist from './wishlist-create'

const getActiveCart = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>
) => {
  const wishlistId = getWishlistId(req)
  let activeWishlist
  if (wishlistId) {
    activeWishlist = (
      await fetch<ClientResponse<ShoppingList>>({
        query: 'shoppingLists',
        method: 'get',
        variables: {
          id: wishlistId,
        },
      })
    ).body
  } else {
    activeWishlist = await createWishlist(res, fetch)
  }

  if (!activeWishlist) {
    removeWishlistCookie(res)
  } else {
    setWishlistCookie(res, activeWishlist.id)
  }
  if (!activeWishlist) {
    throw Error('Unknown Error')
  }
  return activeWishlist
}

export default getActiveCart
