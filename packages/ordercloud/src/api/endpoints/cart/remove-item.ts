import type { CartEndpoint } from '.'
import { formatCart } from '../../utils/cart'
import { OrdercloudLineItem } from '../../../types/cart'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  req,
  body: { cartId, itemId },
  config: { restBuyerFetch, tokenCookie },
}) => {
  const token = req.cookies.get(tokenCookie)?.value

  // Remove the item to the order
  await restBuyerFetch(
    'DELETE',
    `/orders/Outgoing/${cartId}/lineitems/${itemId}`,
    null,
    {
      token,
    }
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
  return { data: formattedCart }
}

export default removeItem
