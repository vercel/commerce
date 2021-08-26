import type { OrdercloudLineItem } from '../../../types/cart'
import type { RawVariant } from '../../../types/product'
import type { CartEndpoint } from '.'

import { formatCart } from '../../utils/cart'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  res,
  body: { cartId, itemId, item },
  config: { restFetch },
}) => {
  if (!cartId || !itemId || !item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

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
  await restFetch(
    'PATCH',
    `/orders/Outgoing/${cartId}/lineitems/${itemId}`,
    {
      ProductID: item.productId,
      Quantity: item.quantity,
      Specs: specs,
    }
  )

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

export default updateItem
