import type { GetAPISchema } from '..'
import type { CheckoutSchema } from '../../types/checkout'

import {
  checkoutSchema,
  getCheckoutBodySchema,
  submitCheckoutBodySchema,
} from '../../schemas/checkout'

import { parse, getInput } from '../utils'
import validateHandlers from '../utils/validate-handlers'

const checkoutEndpoint: GetAPISchema<
  any,
  CheckoutSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers, config } = ctx

  validateHandlers(req, {
    GET: handlers['getCheckout'],
    POST: handlers['submitCheckout'],
  })

  const { cookies } = req
  const cartId = cookies.get(config.cartCookie)?.value
  const input = await getInput(req)

  // Get checkout
  if (req.method === 'GET') {
    const body = getCheckoutBodySchema.parse({ ...input, cartId })
    const res = await handlers['getCheckout']({ ...ctx, body })
    return parse(res, checkoutSchema.optional())
  }

  // Create checkout
  if (req.method === 'POST' && handlers['submitCheckout']) {
    const body = submitCheckoutBodySchema.parse({ ...input, cartId })
    const res = await handlers['submitCheckout']({ ...ctx, body })
    return parse(res, checkoutSchema.optional())
  }

  return { status: 405 }
}

export default checkoutEndpoint
