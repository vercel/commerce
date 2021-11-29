import type { CartEndpoint } from '.'
import { serialize } from 'cookie'
import { normalizeCart } from '../../../utils/normalizers/normalize-cart'
import Cookies from 'js-cookie'
import { MEDUSA_CART_ID_COOKIE } from '@framework/const'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  res,
  body: { item },
  config: { restFetch, cartCookie },
}) => {
  console.log(item)

  // Return an error if no item is present
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  if (!item.quantity) item.quantity = 1

  let cartId = Cookies.get(MEDUSA_CART_ID_COOKIE)

  // Create a cart if it doesn't exist
  if (!cartId) {
    const createCartResponse = await restFetch('POST', `/store/carts`)

    const { id } = createCartResponse.cart

    if (!id) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'An error occured while creating a cart' }],
      })
    }

    cartId = id

    // Set the cart and token cookie
    res.setHeader(
      'Set-Cookie',
      serialize(cartCookie, cartId!, {
        maxAge: 60 * 60 * 24 * 30,
        expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      })
    )
  }

  // Add the item to the order
  const response = restFetch('POST', `/store/carts/${cartId}/line-items`, {
    variant_id: item.variantId,
    quantity: item.quantity,
  })

  // Format cart
  const normalizedCart = normalizeCart(response.cart)

  // Return cart and errors
  res.status(200).json({ data: normalizedCart, errors: [] })
}

export default addItem
