import type { GetAPISchema } from '..'
import type { CheckoutSchema } from '../../types/checkout'

import {
  checkoutSchema,
  getCheckoutBodySchema,
  submitCheckoutBodySchema,
} from '../../schemas/checkout'

import validateHandlers from '../utils/validate-handlers'
import parse from '../utils/parse-output'
import { z } from 'zod'
import { getInput } from '../utils'

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
  const cartId = cookies.get(config.cartCookie)!
  const input = await getInput(req)

  // Get checkout
  if (req.method === 'GET') {
    const body = getCheckoutBodySchema.parse({ ...input, cartId })
    const res = await handlers['getCheckout']({ ...ctx, body })
    return parse(res, checkoutSchema.optional().or(z.string()))
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
