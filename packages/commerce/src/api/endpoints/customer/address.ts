import type { CustomerAddressSchema } from '../../../types/customer/address'
import type { GetAPISchema } from '../..'

import validateHandlers from '../../utils/validate-handlers'

const customerShippingEndpoint: GetAPISchema<
  any,
  CustomerAddressSchema
>['endpoint']['handler'] = (ctx) => {
  const { req, res, handlers, config } = ctx

  validateHandlers(req, res, {
    GET: handlers['getAddresses'],
    POST: handlers['addItem'],
    PUT: handlers['updateItem'],
    DELETE: handlers['removeItem'],
  })
  const { cookies } = req

  // Cart id might be usefull for anonymous shopping
  const cartId = cookies[config.cartCookie]

  // Return customer addresses
  if (req.method === 'GET') {
    const body = { cartId }
    return handlers['getAddresses']({ ...ctx, body })
  }

  // Create or add an item to customer addresses list
  if (req.method === 'POST') {
    const body = { ...req.body, cartId }
    return handlers['addItem']({ ...ctx, body })
  }

  // Update item in customer addresses list
  if (req.method === 'PUT') {
    const body = { ...req.body, cartId }
    return handlers['updateItem']({ ...ctx, body })
  }

  // Remove an item from customer addresses list
  if (req.method === 'DELETE') {
    const body = { ...req.body, cartId }
    return handlers['removeItem']({ ...ctx, body })
  }
}

export default customerShippingEndpoint
