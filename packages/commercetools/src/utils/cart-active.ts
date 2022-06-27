import { Cart, ClientResponse } from '@commercetools/platform-sdk'
import { FetcherOptions } from '@vercel/commerce/utils/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { getCartId, removeCartCookie, setCartId } from './cart-cookie'
import createCart from './cart-create'

const getActiveCart = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>
) => {
  const cartId = getCartId(req)
  let activeCart
  if (cartId) {
    activeCart = (
      await fetch<ClientResponse<Cart>>({
        query: 'carts',
        method: 'get',
        variables: {
          id: cartId,
        },
      })
    ).body
  } else {
    activeCart = await createCart(res, fetch)
  }

  if (!activeCart) {
    removeCartCookie(res)
  } else {
    setCartId(res, activeCart.id)
  }
  return activeCart
}

export default getActiveCart
