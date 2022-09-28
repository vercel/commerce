import type { CustomerCardSchema } from '../../../types/customer/card'
import type { GetAPISchema } from '../..'

import validateHandlers from '../../utils/validate-handlers'

const customerCardEndpoint: GetAPISchema<
  any,
  CustomerCardSchema
>['endpoint']['handler'] = (ctx) => {
  const { req, res, handlers, config } = ctx

  validateHandlers(req, res, {
    GET: handlers['getCards'],
    POST: handlers['addItem'],
    PUT: handlers['updateItem'],
    DELETE: handlers['removeItem'],
  })
  const { cookies } = req

  // Cart id might be usefull for anonymous shopping
  const cartId = cookies[config.cartCookie]

  // Create or add a card
  if (req.method === 'GET') {
    const body = { ...req.body }
    return handlers['getCards']({ ...ctx, body })
  }

  // Create or add an item to customer cards
  if (req.method === 'POST') {
    const body = { ...req.body, cartId }
    return handlers['addItem']({ ...ctx, body })
  }

  // Update item in customer cards
  if (req.method === 'PUT') {
    const body = { ...req.body, cartId }
    return handlers['updateItem']({ ...ctx, body })
  }

  // Remove an item from customer cards
  if (req.method === 'DELETE') {
    const body = { ...req.body, cartId }
    return handlers['removeItem']({ ...ctx, body })
  }
}

export default customerCardEndpoint
