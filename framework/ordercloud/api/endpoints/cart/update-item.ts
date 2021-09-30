import type { OrdercloudLineItem } from '../../../types/cart'
import type { RawVariant } from '../../../types/product'
import type { CartEndpoint } from '.'

import { formatCart } from '../../utils/cart'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  req,
  res,
  body: { cartId, itemId, item },
  config: { restBuyerFetch, tokenCookie },
}) => {
  if (!cartId || !itemId || !item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Get token from cookies
  const token = req.cookies[tokenCookie]

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
    'PATCH',
    `/orders/Outgoing/${cartId}/lineitems/${itemId}`,
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

export default updateItem
