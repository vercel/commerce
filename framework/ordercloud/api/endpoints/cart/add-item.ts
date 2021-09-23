import type { CartEndpoint } from '.'
import type { RawVariant } from '../../../types/product'
import type { OrdercloudLineItem } from '../../../types/cart'

import { serialize } from 'cookie'

import { formatCart } from '../../utils/cart'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  res,
  body: { cartId, item },
  config: { restFetch, cartCookie },
}) => {
  // Return an error if no item is present
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  // Set the quantity if not present
  if (!item.quantity) item.quantity = 1

  // Create an order if it doesn't exist
  if (!cartId) {
    cartId = await restFetch('POST', `/orders/Outgoing`, {}).then(
      (response: { ID: string }) => response.ID
    )
  }

  // Set the cart cookie
  res.setHeader(
    'Set-Cookie',
    serialize(cartCookie, cartId, {
      maxAge: 60 * 60 * 24 * 30,
      expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })
  )

  // Store specs
  let specs: RawVariant['Specs'] = []

  // If a variant is present, fetch its specs
  if (item.variantId) {
    specs = await restFetch(
      'GET',
      `/me/products/${item.productId}/variants/${item.variantId}`
    ).then((res: RawVariant) => res.Specs)
  }

  // Add the item to the order
  await restFetch('POST', `/orders/Outgoing/${cartId}/lineitems`, {
    ProductID: item.productId,
    Quantity: item.quantity,
    Specs: specs,
  })

  // Get cart
  const [cart, lineItems] = await Promise.all([
    restFetch('GET', `/orders/Outgoing/${cartId}`),
    restFetch('GET', `/orders/Outgoing/${cartId}/lineitems`).then(
      (response: { Items: OrdercloudLineItem[] }) => response.Items
    ),
  ])

  // Format cart
  const formattedCart = formatCart(cart, lineItems)

  // Return cart and errors
  res.status(200).json({ data: formattedCart, errors: [] })
}

export default addItem
