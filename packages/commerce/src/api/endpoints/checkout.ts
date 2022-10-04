import type { GetAPISchema } from '..'
import type { CheckoutSchema } from '../../types/checkout'

import validateHandlers from '../utils/validate-handlers'

const checkoutEndpoint: GetAPISchema<
  any,
  CheckoutSchema
>['endpoint']['handler'] = (ctx) => {
  const { req, res, handlers, config } = ctx

  validateHandlers(req, res, {
    GET: handlers['getCheckout'],
    POST: handlers['submitCheckout'],
  })

  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  // Get checkout
  if (req.method === 'GET') {
    const body = { ...req.body, cartId }
    return handlers['getCheckout']({ ...ctx, body })
  }

  // Create checkout
  if (req.method === 'POST' && handlers['submitCheckout']) {
    const body = { ...req.body, cartId }
    return handlers['submitCheckout']({ ...ctx, body })
  }
}

export default checkoutEndpoint
