import type { CartEndpoint } from '.'
import type { RawVariant } from '../../../types/product'
import type { OrdercloudLineItem } from '../../../types/cart'

import { serialize } from 'cookie'

import { formatCart } from '../../utils/cart'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  res,
  body: { cartId, item },
  config: { restBuyerFetch, cartCookie, tokenCookie },
}) => {
  // Return an error if no item is present
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  // Store token
  let token

  // Set the quantity if not present
  if (!item.quantity) item.quantity = 1

  // Create an order if it doesn't exist
  if (!cartId) {
    const { ID, meta } = await restBuyerFetch(
      'POST',
      `/orders/Outgoing`,
      {}
    ).then((response: { ID: string; meta: { token: string } }) => response)

    // Set the cart id and token
    cartId = ID
    token = meta.token

    // Set the cart and token cookie
    res.setHeader('Set-Cookie', [
      serialize(tokenCookie, meta.token, {
        maxAge: 60 * 60 * 24 * 30,
        expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      }),
      serialize(cartCookie, cartId, {
        maxAge: 60 * 60 * 24 * 30,
        expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      }),
    ])
  }

  // Store specs
  let specs: RawVariant['Specs'] = []

  // If a variant is present, fetch its specs
  if (item.variantId) {
    specs = await restBuyerFetch(
      'GET',
      `/me/products/${item.productId}/variants/${item.variantId}`,
      null,
      { token }
    ).then((res: RawVariant) => res.Specs)
  }

  // Add the item to the order
  await restBuyerFetch(
    'POST',
    `/orders/Outgoing/${cartId}/lineitems`,
    {
      ProductID: item.productId,
      Quantity: item.quantity,
      Specs: specs,
    },
    { token }
  )

  // Get cart
  const [cart, lineItems] = await Promise.all([
    restBuyerFetch('GET', `/orders/Outgoing/${cartId}`, null, { token }),
    restBuyerFetch('GET', `/orders/Outgoing/${cartId}/lineitems`, null, {
      token,
    }).then((response: { Items: OrdercloudLineItem[] }) => response.Items),
  ])

  // Format cart
  const formattedCart = formatCart(cart, lineItems)

  // Return cart and errors
  res.status(200).json({ data: formattedCart, errors: [] })
}

export default addItem
