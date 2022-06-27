import { ShoppingList, ShoppingListDraft } from '@commercetools/platform-sdk'
import { ClientResponse } from '@commercetools/sdk-client-v2'
import { FetcherOptions } from '@vercel/commerce/utils/types'
import { NextApiResponse } from 'next'
import { removeWishlistCookie, setWishlistCookie } from './wishlist-cookie'

export const createWishlist = async (
  res: NextApiResponse,
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>
) => {
  const wishlist = await fetch<ClientResponse<ShoppingList>, ShoppingListDraft>(
    {
      query: 'shoppingLists',
      method: 'post',
      body: {
        name: { en: 'wishlist' },
      },
    }
  )

  if (wishlist.body) {
    setWishlistCookie(res, wishlist.body.id)
  } else {
    removeWishlistCookie(res)
  }
  return wishlist.body
}

export default createWishlist
