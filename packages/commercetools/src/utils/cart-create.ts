import { Cart, CartDraft } from '@commercetools/platform-sdk'
import { ClientResponse } from '@commercetools/sdk-client-v2'
import { FetcherOptions } from '@vercel/commerce/utils/types'
import { NextApiResponse } from 'next'
import { removeCartCookie, setCartId } from './cart-cookie'

const createCart = async (
  res: NextApiResponse,
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>
) => {
  const draft: CartDraft = {
    currency: 'USD',
    country: 'US',
  }

  const cart = await fetch<ClientResponse<Cart>, CartDraft>({
    query: 'carts',
    method: 'post',
    body: draft,
  })

  if (!cart.body) {
    removeCartCookie(res)
  } else {
    setCartId(res, cart.body.id)
  }
  return cart.body
}

export default createCart
