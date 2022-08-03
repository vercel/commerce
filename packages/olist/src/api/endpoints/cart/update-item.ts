import type { CartEndpoint, Handler } from '.'

import { mapRawToCommerceResponse } from '../../../utils/cart'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  res: response,
  body: { cartId, itemId, item },
  config: { service },
}: Handler) => {
  if (!cartId || !itemId || !item) {
    return response.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  await service.cart.updateItem(Number(cartId), Number(itemId), {
    quantity: item.quantity,
  })

  const cart = await service.cart.getById(Number(cartId))

  response
    .status(200)
    .json({ data: mapRawToCommerceResponse(cart), errors: [] })
}

export default updateItem
