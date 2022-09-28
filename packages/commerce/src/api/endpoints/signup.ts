import type { GetAPISchema } from '..'
import type { SignupSchema } from '../../types/signup'

import validateHandlers from '../utils/validate-handlers'

const signupEndpoint: GetAPISchema<any, SignupSchema>['endpoint']['handler'] = (
  ctx
) => {
  const { req, res, handlers, config } = ctx

  validateHandlers(req, res, {
    POST: handlers['signup'],
  })
  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  const body = { ...req.body, cartId }
  return handlers['signup']({ ...ctx, body })
}

export default signupEndpoint
