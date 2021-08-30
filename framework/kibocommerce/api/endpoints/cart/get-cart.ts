import { normalizeCart } from '@framework/lib/normalize'
import { Cart } from '@framework/schema'
import type { CartEndpoint } from '.'
import { getCartQuery } from '../../queries/getCartQuery'

const getCart: CartEndpoint['handlers']['getCart'] = async ({
  res,
  body: { cartId },
  config,
}) => {
  let currentCart: Cart = {}
  try {
    let result = await config.fetch(getCartQuery)
    currentCart = result?.data?.currentCart
  } catch (error) {
    throw error
  }
  res.status(200).json({
    data: currentCart ? normalizeCart(currentCart) : null,
  })
}

export default getCart
