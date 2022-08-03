import type { CartEndpoint, Handler } from '.'

import { mapRawToCommerceResponse } from '../../../utils/cart'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  res: response,
  body: { cartId, itemId },
  config: { service },
}: Handler) => {
  if (!cartId || !itemId) {
    return response.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  await service.cart.removeItem(Number(cartId), Number(itemId))

  const cart = await service.cart.getById(Number(cartId))

  response
    .status(200)
    .json({ data: mapRawToCommerceResponse(cart), errors: [] })
}

export default removeItem
